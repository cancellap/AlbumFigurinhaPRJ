import "../../styles/album.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { carregarFotoFigurinha } from "../../services/sticker.service";

import {
    listarMinhaColecao,
    removerFigurinha
} from "../../services/collection.service";

export default function Album() {

    const navigate = useNavigate();

    const [colecao, setColecao] = useState([]);
    const [fotos, setFotos] = useState({});
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {

        carregarColecao();

    }, []);

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

    return (

        <div className="page">

            <div className="page-header">

                <div>

                    <h1>Meu Álbum</h1>

                    <div className="page-sub">

                        Minha coleção de figurinhas.

                    </div>

                </div>

                <button
                    onClick={() =>
                        navigate("/colecionador/nova-figurinha")
                    }
                >
                    Adicionar Figurinha
                </button>

            </div>

            {erro && (

                <p>{erro}</p>

            )}

            <div className="cards">

                {colecao.map(item => (

                    <div
                        key={item.stickerId}
                        className="card-figurinha"
                    >

                        <img
                            src={fotos[item.stickerId]}
                            alt={item.nome}
                        />

                        <h3>

                            #{item.numero}

                        </h3>

                        <p>

                            {item.nome}

                        </p>

                        <small>

                            Página {item.pagina}

                        </small>

                        <div className="acoes">

                            <button
                                onClick={() =>
                                    navigate(`/colecionador/figurinha/${item.stickerId}`)
                                }
                            >
                                Detalhes
                            </button>

                            <button
                                onClick={() =>
                                    remover(item.stickerId)
                                }
                            >
                                Remover
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}