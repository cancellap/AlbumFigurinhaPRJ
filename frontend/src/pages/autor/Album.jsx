import "../../styles/album.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    listarFigurinhas,
    pesquisarFigurinhas,
    excluirFigurinha,
    fotoFigurinha
} from "../../services/sticker.service";

export default function Album() {

    const navigate = useNavigate();

    const [figurinhas, setFigurinhas] = useState([]);
    const [filtro, setFiltro] = useState("");
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        carregarFigurinhas();
    }, []);

    async function carregarFigurinhas() {

        try {

            const dados = await listarFigurinhas();

            setFigurinhas(dados);

        } catch {

            setErro("Erro ao carregar figurinhas.");

        } finally {

            setCarregando(false);

        }

    }

    async function filtrar() {

        if (!filtro.trim()) {
            carregarFigurinhas();
            return;
        }

        try {

            const dados =
                await pesquisarFigurinhas(filtro);

            setFigurinhas(dados);

        } catch {

            setErro("Erro ao pesquisar.");

        }

    }

    async function remover(id) {

        if (!window.confirm("Deseja excluir esta figurinha?")) {
            return;
        }

        try {

            await excluirFigurinha(id);

            carregarFigurinhas();

        } catch {

            alert("Erro ao excluir.");

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

                <h1>Figurinhas</h1>

                <button
                    onClick={() =>
                        navigate("/autor/figurinha-form")
                    }
                >
                    Nova Figurinha
                </button>

            </div>

            <div className="toolbar">

                <input
                    type="text"
                    placeholder="Pesquisar..."
                    value={filtro}
                    onChange={(e) =>
                        setFiltro(e.target.value)
                    }
                />

                <button
                    onClick={filtrar}
                >
                    Pesquisar
                </button>

            </div>

            {erro && (

                <p>{erro}</p>

            )}

            <div className="cards">

                {figurinhas.map(figurinha => (

                    <div
                        className="card-figurinha"
                        key={figurinha.id}
                    >

                        <img
                            src={fotoFigurinha(figurinha.id)}
                            alt={figurinha.nome}
                        />

                        <h3>

                            #{figurinha.numero}

                        </h3>

                        <p>

                            {figurinha.nome}

                        </p>

                        <small>

                            Página {figurinha.pagina}

                        </small>

                        <div className="acoes">

                            <button
                                onClick={() =>
                                    navigate(
                                        "/autor/figurinha-form",
                                        {
                                            state: {
                                                id: figurinha.id
                                            }
                                        }
                                    )
                                }
                            >
                                Editar
                            </button>

                            <button
                                onClick={() =>
                                    remover(figurinha.id)
                                }
                            >
                                Excluir
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}