import "../../styles/admin.css";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
    buscarUsuario,
    salvarUsuario,
    editarUsuario
} from "../../services/user.service";

export default function UsuarioForm() {

    const navigate = useNavigate();
    const location = useLocation();

    const id = location.state?.id;

    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");
    const [perfil, setPerfil] = useState("ADMIN");

    const [erro, setErro] = useState("");
    const [salvando, setSalvando] = useState(false);

    useEffect(() => {

        if (!id) {
            return;
        }

        carregarUsuario();

    }, []);

    async function carregarUsuario() {

        try {

            const usuario = await buscarUsuario(id);

            setNome(usuario.nome);
            setSenha(usuario.senha ?? "");
            setPerfil(usuario.perfil);

        } catch {

            setErro("Erro ao carregar usuário.");

        }

    }

    async function handleSubmit(e) {

        e.preventDefault();

        setErro("");
        setSalvando(true);

        const usuario = {
            nome,
            senha,
            perfil
        };

        try {

            if (id) {

                await editarUsuario(id, usuario);

            } else {

                await salvarUsuario(usuario);

            }

            navigate("/admin/usuarios");

        } catch (e) {

            setErro("Erro ao salvar usuário.");

        } finally {

            setSalvando(false);

        }

    }

    return (

        <div className="page">

            <h1>

                {id
                    ? "Editar Usuário"
                    : "Novo Usuário"}

            </h1>

            {erro && (

                <p className="erro">

                    {erro}

                </p>

            )}

            <form
                className="form"
                onSubmit={handleSubmit}
            >

                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) =>
                        setNome(e.target.value)
                    }
                    required
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) =>
                        setSenha(e.target.value)
                    }
                    required={!id}
                />

                <select
                    value={perfil}
                    onChange={(e) =>
                        setPerfil(e.target.value)
                    }
                >

                    <option value="ADMIN">
                        Administrador
                    </option>

                    <option value="AUTOR">
                        Autor
                    </option>

                    <option value="COLECIONADOR">
                        Colecionador
                    </option>

                </select>

                <div className="form-buttons">

                    <button
                        type="submit"
                        disabled={salvando}
                    >

                        {salvando
                            ? "Salvando..."
                            : "Salvar"}

                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/admin/usuarios")
                        }
                    >

                        Cancelar

                    </button>

                </div>

            </form>

        </div>

    );

}