import "../../styles/album.css";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import {
    buscarFigurinha,
    fotoFigurinha
} from "../../services/sticker.service";

export default function FigurinhaDetalhe() {

    const location = useLocation();

    const id = location.state?.id;

    const [figurinha, setFigurinha] = useState(null);
    const [erro, setErro] = useState("");

    useEffect(() => {

        if (!id) {
            return;
        }

        carregarFigurinha();

    }, []);

    async function carregarFigurinha() {

        try {

            const dados = await buscarFigurinha(id);

            setFigurinha(dados);

        } catch {

            setErro("Erro ao carregar figurinha.");

        }

    }

    if (erro) {

        return (
            <div className="page">
                <h2>{erro}</h2>
            </div>
        );

    }

    if (!figurinha) {

        return (
            <div className="page">
                <h2>Carregando...</h2>
            </div>
        );

    }

    return (

        <div className="page">

            <h1>Detalhes da Figurinha</h1>

            <div className="card-detalhe">

                <img
                    src={fotoFigurinha(figurinha.id)}
                    alt={figurinha.nome}
                />

                <h2>

                    #{figurinha.numero} - {figurinha.nome}

                </h2>

                <p>

                    <strong>Página:</strong> {figurinha.pagina}

                </p>

                <p>

                    <strong>Descrição:</strong>

                </p>

                <p>

                    {figurinha.descricao || "Sem descrição."}

                </p>

                <p>

                    <strong>Tag MD5:</strong>

                </p>

                <p>

                    {figurinha.tag}

                </p>

            </div>

        </div>

    );

}