import "../../styles/album.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    buscarFigurinhaPorTag,
    carregarFotoFigurinha
} from "../../services/sticker.service";

import {
    adicionarFigurinha,
    possuiFigurinha
} from "../../services/collection.service";

export default function NovaFigurinha() {

    const navigate = useNavigate();

    const [tag, setTag] = useState("");
    const [figurinha, setFigurinha] = useState(null);
    const [foto, setFoto] = useState("");
    const [erro, setErro] = useState("");
    const [buscando, setBuscando] = useState(false);

    async function pesquisar() {

        if (!tag.trim()) {
            alert("Informe a TAG.");
            return;
        }

        try {

            setBuscando(true);
            setErro("");

            const dados =
                await buscarFigurinhaPorTag(tag.trim());

            const jaPossui =
                await possuiFigurinha(dados.id);

            dados.possui = jaPossui;

            const imagem =
                await carregarFotoFigurinha(dados.id);

            setFoto(imagem);
            setFigurinha(dados);

        } catch (e) {

            setFigurinha(null);
            setFoto("");
            setErro(e.message);

        } finally {

            setBuscando(false);

        }

    }

    async function inserir() {

        if (!figurinha)
            return;

        try {

            await adicionarFigurinha(figurinha.id);

            alert("Figurinha adicionada ao álbum.");

            navigate("/colecionador/album");

        } catch (e) {

            alert(e.message);

        }

    }

return (

    <div className="page">

        <div className="page-header">

            <div>

                <div className="page-title">

                    Adicionar Figurinha

                </div>

                <div className="page-sub">

                    Digite a TAG MD5 para localizar a figurinha.

                </div>

            </div>

            <button
                className="page-button"
                onClick={() => navigate("/colecionador/album")}
            >
                Voltar
            </button>

        </div>

        <div className="nova-figurinha">

            <div className="nova-card">

                <div className="nova-form">

                    <input
                        type="text"
                        value={tag}
                        placeholder="Digite a TAG MD5"
                        onChange={e => setTag(e.target.value)}
                    />

                    <button
                        className="page-button"
                        onClick={pesquisar}
                        disabled={buscando}
                    >
                        Buscar
                    </button>

                </div>

                {erro && (

                    <div className="erro-tag">

                        {erro}

                    </div>

                )}

                {

                    figurinha && (

                        <div className="nova-resultado">

                            <div className="nova-imagem">

                                <img
                                    src={foto}
                                    alt={figurinha.nome}
                                />

                            </div>

                            <div className="nova-info">

                                <h2>

                                    {figurinha.nome}

                                </h2>

                                <p>

                                    <strong>Número:</strong> {figurinha.numero}

                                </p>

                                <p>

                                    <strong>Página:</strong> {figurinha.pagina}

                                </p>

                                <p>

                                    {figurinha.descricao}

                                </p>

                                <div className="nova-acoes">

                                    {

                                        figurinha.possui

                                            ? (

                                                <button
                                                    className="page-button"
                                                    disabled
                                                >

                                                    Já possui

                                                </button>

                                            )

                                            : (

                                                <button
                                                    className="page-button"
                                                    onClick={inserir}
                                                >

                                                    Inserir Figurinha

                                                </button>

                                            )

                                    }

                                </div>

                            </div>

                        </div>

                    )

                }

            </div>

        </div>

    </div>

);

}