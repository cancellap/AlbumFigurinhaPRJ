import "../../styles/album.css";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
    buscarFigurinha,
    salvarFigurinha,
    editarFigurinha
} from "../../services/sticker.service";

export default function FigurinhaForm() {

    const navigate = useNavigate();
    const location = useLocation();

    const id = location.state?.id;

    const [numero, setNumero] = useState("");
    const [nome, setNome] = useState("");
    const [pagina, setPagina] = useState("");
    const [descricao, setDescricao] = useState("");
    const [tag, setTag] = useState("");
    const [foto, setFoto] = useState(null);

    const [erro, setErro] = useState("");
    const [salvando, setSalvando] = useState(false);

    useEffect(() => {

        if (id) {
            carregarFigurinha();
        }

    }, []);

    async function carregarFigurinha() {

        try {

            const figurinha =
                await buscarFigurinha(id);

            setNumero(figurinha.numero);
            setNome(figurinha.nome);
            setPagina(figurinha.pagina);
            setDescricao(figurinha.descricao ?? "");
            setTag(figurinha.tag ?? "");

        } catch {

            setErro("Erro ao carregar figurinha.");

        }

    }

    async function handleSubmit(e) {

        e.preventDefault();

        setErro("");
        setSalvando(true);

        const dados = {

            numero,
            nome,
            pagina,
            descricao,
            foto

        };

        try {

            if (id) {

                await editarFigurinha(id, dados);

            } else {

                await salvarFigurinha(dados);

            }

            navigate("/autor/album");

        } catch {

            setErro("Erro ao salvar figurinha.");

        } finally {

            setSalvando(false);

        }

    }

    return (

        <div className="page">

            <div className="page-header">

                <div>

                    <h1 className="page-title">

                        {id
                            ? "Editar Figurinha"
                            : "Nova Figurinha"}

                    </h1>

                    <div className="page-sub">

                        Cadastro de figurinhas

                    </div>

                </div>

            </div>

            {erro && (

                <p className="erro">

                    {erro}

                </p>

            )}

            <form
                className="form"
                onSubmit={handleSubmit}
            >

                <div>

                    <label className="form-label">

                        Nome

                    </label>

                    <input
                        type="text"
                        value={nome}
                        onChange={(e) =>
                            setNome(e.target.value)
                        }
                        required
                    />

                </div>

                <div>

                    <label className="form-label">

                        Número

                    </label>

                    <input
                        type="number"
                        value={numero}
                        onChange={(e) =>
                            setNumero(e.target.value)
                        }
                        required
                    />

                </div>

                <div>

                    <label className="form-label">

                        Página

                    </label>

                    <input
                        type="number"
                        value={pagina}
                        onChange={(e) =>
                            setPagina(e.target.value)
                        }
                        required
                    />

                </div>

                <div>

                    <label className="form-label">

                        Descrição

                    </label>

                    <textarea
                        rows="5"
                        value={descricao}
                        onChange={(e) =>
                            setDescricao(e.target.value)
                        }
                    />

                </div>

                <div>

                    <label className="form-label">

                        Foto

                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setFoto(e.target.files[0])
                        }
                    />

                </div>

                <div>

                    <label className="form-label">

                        Tag MD5

                    </label>

                    <input
                        type="text"
                        value={tag}
                        disabled
                    />

                </div>

                <button
                    className="login-btn"
                    type="submit"
                    disabled={salvando}
                >

                    {

                        salvando
                            ? "Salvando..."
                            : "Salvar Figurinha"

                    }

                </button>

            </form>

        </div>

    );

}