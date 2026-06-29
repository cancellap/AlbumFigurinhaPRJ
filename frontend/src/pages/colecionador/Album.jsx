import "../../styles/album-colecionador.css";
import figurinhaPadrao from "../../assets/figurinhapadrao.png";
import { buscarConfiguracao } from "../../services/album.service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { carregarFotoFigurinha } from "../../services/sticker.service";

import {
    listarMinhaColecao,
    removerFigurinha
} from "../../services/collection.service";

/**
 * Calcula a luminância relativa de uma cor hex (#RRGGBB ou #RGB)
 * e retorna a cor de texto com melhor contraste: branco ou preto.
 * Baseado na fórmula de luminância relativa do WCAG.
 */
function calcularCorContraste(hex, claro = "#ffffff", escuro = "#1a1a1a") {

    if (!hex || typeof hex !== "string") {
        return escuro;
    }

    let valor = hex.replace("#", "");

    if (valor.length === 3) {
        valor = valor.split("").map(c => c + c).join("");
    }

    if (valor.length !== 6) {
        return escuro;
    }

    const r = parseInt(valor.substring(0, 2), 16) / 255;
    const g = parseInt(valor.substring(2, 4), 16) / 255;
    const b = parseInt(valor.substring(4, 6), 16) / 255;

    const ajustar = (c) =>
        c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

    const luminancia =
        0.2126 * ajustar(r) + 0.7152 * ajustar(g) + 0.0722 * ajustar(b);

    // Acima de ~0.4 o fundo é considerado "claro" -> usa texto escuro
    return luminancia > 0.4 ? escuro : claro;
}

/**
 * Mistura duas cores hex (média simples por canal), usada para
 * estimar a luminância do gradiente mesclado entre as duas cores.
 */
function mesclarCores(hexA, hexB) {

    const normalizar = (hex) => {
        let v = (hex || "").replace("#", "");
        if (v.length === 3) v = v.split("").map(c => c + c).join("");
        if (v.length !== 6) v = "888888";
        return v;
    };

    const a = normalizar(hexA);
    const b = normalizar(hexB);

    const canal = (i) => {
        const va = parseInt(a.substring(i, i + 2), 16);
        const vb = parseInt(b.substring(i, i + 2), 16);
        return Math.round((va + vb) / 2)
            .toString(16)
            .padStart(2, "0");
    };

    return `#${canal(0)}${canal(2)}${canal(4)}`;
}

export default function Album() {

    const navigate = useNavigate();

    const [colecao, setColecao] = useState([]);
    const [fotos, setFotos] = useState({});
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    const [paginaAtual, setPaginaAtual] = useState(-1);
    const [virando, setVirando] = useState(false);

    const paginas = [];

    for (let i = 0; i < colecao.length; i += 12) {
        paginas.push(colecao.slice(i, i + 12));
    };

    const [config, setConfig] = useState({
    nomeAlbum: "",
    descricao: "",
    corPrimaria: "#1565C0",
    corSecundaria: "#FFD600",
    fonte: "Oswald",
    mostrarNumero: true,
    mostrarDescricao: false,
    capa: "",
    contraCapa: ""


});

    useEffect(() => {
        carregarConfiguracao();
        carregarColecao();
    }, []);

        async function carregarConfiguracao() {
        try {
            const dados = await buscarConfiguracao();
            setConfig(dados);
        } catch (e) {
            console.error(e);
        }
    }
    async function carregarColecao() {

        try {

            const dados =
                await listarMinhaColecao();

            await carregarFotos(dados);

            setColecao(dados);

        } catch {

            setErro("Erro ao carregar coleção.");

        } finally {

            setCarregando(false);

        }

    }

    async function carregarFotos(lista) {

        const imagens = {};

        for (const item of lista) {

            try {

                imagens[item.stickerId] =
                    await carregarFotoFigurinha(item.stickerId);

            } catch {

                imagens[item.stickerId] = "";

            }

        }

        setFotos(imagens);

    }

    async function remover(stickerId) {

        if (!window.confirm("Remover figurinha da coleção?")) {
            return;
        }

        try {

            await removerFigurinha(stickerId);

            carregarColecao();

        } catch (e) {

            alert(e.message);

        }

    }

    if (carregando) {

        return (

            <div className="page">

                <h2>Carregando...</h2>

            </div>

        );

    }

    function trocarPagina(destino) {

    if (virando) return;

    setVirando(true);

    setTimeout(() => {

        setPaginaAtual(destino);

    }, 320);

    setTimeout(() => {

        setVirando(false);

    }, 650);

}

    const corMesclada = mesclarCores(config.corPrimaria, config.corSecundaria);
    const corTexto = calcularCorContraste(corMesclada);

    function abrirFigurinha(item) {

        navigate(
            `/colecionador/figurinha/${item.stickerId}`,
            {
                state: item
            }
        );

    }

    return (

    <div
        className="album-view"
        style={{
            "--album-bg": config.corPrimaria,
            "--album-bg-2": config.corSecundaria,
            "--album-page": "#ffffff",
            "--album-text": corTexto,
            "--album-accent": config.corSecundaria,
            "--album-font": config.fonte
        }}
    >

        <div className="album-book">

            <div className="album-header">

                <h1 className="album-title">
                    Meu Álbum
                </h1>

            </div>

{
    paginaAtual === -1 ? (

    <div className={`album-pages ${virando ? "turning" : ""}`}>

         <div className="album-page album-cover-page">

            {
                config.capa
                    ? (
                        <img
                            src={config.capa}
                            alt={config.nomeAlbum}
                            className="album-cover-image"
                        />
                    )
                    : (
                        <div className="album-cover-placeholder">
                            <h1>{config.nomeAlbum}</h1>
                            <p>{config.descricao}</p>
                        </div>
                    )
            }

        </div>
    </div>

    ) : paginaAtual >= paginas.length ? (

        <div className={`album-pages ${virando ? "turning" : ""}`}>

         <div className="album-page album-cover-page">

            {
                config.contraCapa
                    ? (
                        <img
                            src={config.contraCapa}
                            alt="Contra capa"
                            className="album-cover-image"
                        />
                    )
                    : (
                        <div className="album-cover-placeholder">
                            <p>{config.descricao}</p>
                        </div>
                    )
            }

        </div>
    </div>

    ) : (

        <div className={`album-pages ${virando ? "turning" : ""}`}>

            <div className="album-page">

                <div className="album-grid">

                    {Array.from({ length: 6 }, (_, i) => {
                const item = paginas[paginaAtual]?.[i];

                return (
                    <div
                        className="sticker-slot"
                        key={`left-${i}`}
                        onClick={() => item && abrirFigurinha(item)}
                    >
                        <img
                            src={
                                item
                                    ? (fotos[item.stickerId] || figurinhaPadrao)
                                    : figurinhaPadrao
                            }
                            alt={item?.nome || "Figurinha"}
                            loading="lazy"
                        />
                    </div>
                );
            })}
                </div>

            </div>

            <div className="album-page">

                <div className="album-grid">

                 {Array.from({ length: 6 }, (_, i) => {
    const item = paginas[paginaAtual]?.[i + 6];

    return (
        <div
            className="sticker-slot"
            key={`right-${i}`}
            onClick={() => item && abrirFigurinha(item)}
        >
            <img
                src={
                    item
                        ? (item.possui
                            ? fotos[item.stickerId]
                            : figurinhaPadrao)
                        : figurinhaPadrao
                }
                alt={item?.nome || "Figurinha"}
            />
        </div>
    );
})}   
                  

                </div>

            </div>

        </div>

    )
}

            <div className="album-footer">

                <button
                    className="page-button"
                    disabled={paginaAtual === -1}
                    onClick={() =>
                                        trocarPagina(
                        Math.max(-1, paginaAtual - 1)
                    )
                                    }
                >
                    ◀ Anterior
                </button>

                <button
                    className="page-button"
                    onClick={()=>
                        navigate("/colecionador/nova-figurinha")
                    }
                >
                    Adicionar Figurinha
                </button>

                <button
                    className="page-button"
                    disabled={paginaAtual >= paginas.length}
                    onClick={() =>
                        trocarPagina(
                            Math.min(paginas.length, paginaAtual + 1)
                        )
                    }
                                                            >
                    Próxima ▶
                </button>

            </div>

        </div>

    </div>

    );

}