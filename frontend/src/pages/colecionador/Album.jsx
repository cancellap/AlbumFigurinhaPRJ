import "../../styles/album.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    listarFigurinhas,
    fotoFigurinha
} from "../../services/sticker.service";

export default function Album() {

    const navigate = useNavigate();

    const [figurinhas, setFigurinhas] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {
        carregarFigurinhas();
    }, []);

    async function carregarFigurinhas() {

        try {

            const dados = await listarFigurinhas();

            setFigurinhas(dados);

        } catch {

            setErro("Erro ao carregar álbum.");

        } finally {

            setCarregando(false);

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

                    <h1>Meu Álbum de Figurinhas</h1>

                    <div className="page-sub">
                        Clique em uma figurinha para visualizar os detalhes.
                    </div>

                </div>

                <button
                    onClick={() =>
                        navigate("/colecionador/nova-figurinha")
                    }
                >
                    Nova Figurinha
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
                        onDoubleClick={() =>
                            navigate(
                                "/colecionador/figurinha",
                                {
                                    state: {
                                        id: figurinha.id
                                    }
                                }
                            )
                        }
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

                    </div>

                ))}

            </div>

        </div>

    );

}