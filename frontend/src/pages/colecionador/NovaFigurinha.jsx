import "../../styles/album.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    listarFigurinhas,
    carregarFotoFigurinha
} from "../../services/sticker.service";

import {
    adicionarFigurinha,
    possuiFigurinha
} from "../../services/collection.service";

export default function NovaFigurinha() {

    const navigate = useNavigate();

    const [figurinhas, setFigurinhas] = useState([]);
    const [fotos, setFotos] = useState({});
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {
        carregarFigurinhas();
    }, []);

    async function carregarFigurinhas() {

        try {

            const dados = await listarFigurinhas();

            const lista = await Promise.all(

                dados.map(async (figurinha) => {

                    let possui = false;

                    try {

                        possui = await possuiFigurinha(figurinha.id);

                    } catch {

                        possui = false;

                    }

                    return {
                        ...figurinha,
                        possui
                    };

                })

            );

            await carregarFotos(lista);

            setFigurinhas(lista);

        } catch {

            setErro("Erro ao carregar figurinhas.");

        } finally {

            setCarregando(false);

        }

    }

    async function carregarFotos(lista) {

    const imagens = {};

    for (const figurinha of lista) {

        try {

            imagens[figurinha.id] =
                await carregarFotoFigurinha(figurinha.id);

        } catch {

            imagens[figurinha.id] = "";

        }

    }

    setFotos(imagens);

}

    async function adicionar(id) {

        try {

            await adicionarFigurinha(id);

            carregarFigurinhas();

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

                    <h1>Adicionar Figurinha</h1>

                    <div className="page-sub">

                        Escolha uma figurinha para adicionar ao seu álbum.

                    </div>

                </div>

                <button
                    onClick={() =>
                        navigate("/colecionador/album")
                    }
                >
                    Voltar
                </button>

            </div>

            {erro && (

                <p>{erro}</p>

            )}

            <div className="cards">

                {figurinhas.map(figurinha => (

                    <div
                        key={figurinha.id}
                        className="card-figurinha"
                    >

                    <img
                        src={fotos[figurinha.id]}
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

                        {

                            figurinha.possui

                                ? (

                                    <button
                                        disabled
                                    >

                                        Já possui

                                    </button>

                                )

                                : (

                                    <button
                                        onClick={() =>
                                            adicionar(figurinha.id)
                                        }
                                    >

                                        Adicionar

                                    </button>

                                )

                        }

                    </div>

                ))}

            </div>

        </div>

    );

}