import "../../styles/album.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    buscarFigurinha,
    carregarFotoFigurinha
} from "../../services/sticker.service";

export default function FigurinhaDetalhe() {

    const { id } = useParams();

    const [figurinha, setFigurinha] = useState(null);
    const [foto, setFoto] = useState("");
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

                try {

                    const imagem =
                        await carregarFotoFigurinha(dados.id);

                    setFoto(imagem);

                } catch {

                    setFoto("");

                }

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

        <div className="page-header">

            <div>

                <div className="page-title">

                    Detalhes da Figurinha

                </div>

                <div className="page-sub">

                    Informações completas da figurinha.

                </div>

            </div>

        </div>

        <div className="detalhe-container">

            <div className="detalhe-card">

                <div className="detalhe-imagem">

                    <img
                        src={foto}
                        alt={figurinha.nome}
                    />

                </div>

                <div className="detalhe-info">

                    <h1>

                        {figurinha.nome}

                    </h1>

                    <div className="detalhe-badges">

                        <span>

                            Nº {figurinha.numero}

                        </span>

                        <span>

                            Página {figurinha.pagina}

                        </span>

                    </div>

                    <div className="detalhe-descricao">

                        <h3>Descrição</h3>

                        <p>

                            {figurinha.descricao || "Sem descrição."}

                        </p>

                    </div>

                    <div className="detalhe-tag">

                        <label>TAG MD5</label>

                        <input
                            type="text"
                            value={figurinha.tag}
                            readOnly
                        />

                    </div>

                </div>

            </div>

        </div>

    </div>

);

}