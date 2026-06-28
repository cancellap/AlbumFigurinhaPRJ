import "../../styles/admin.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    listarUsuarios,
    excluirUsuario
} from "../../services/user.service";

export default function Usuarios() {

    const navigate = useNavigate();

    const [usuarios, setUsuarios] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    async function carregarUsuarios() {

        try {

            const dados =
                await listarUsuarios();

            setUsuarios(dados);

        } catch (e) {

            setErro("Erro ao carregar usuários.");

        } finally {

            setCarregando(false);

        }

    }

    useEffect(() => {

        carregarUsuarios();

    }, []);

    async function remover(id) {

        if (!confirm("Deseja realmente excluir este usuário?")) {
            return;
        }

        try {

            await excluirUsuario(id);

            carregarUsuarios();

        } catch {

            alert("Erro ao excluir usuário.");

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

                <h1>Usuários</h1>

                <button
                    onClick={() => navigate("/admin/usuario-form")}
                >
                    Novo Usuário
                </button>

            </div>

            {erro &&

                <p>
                    {erro}
                </p>

            }

            <table className="tabela">

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Nome</th>

                        <th>Perfil</th>

                        <th>Ações</th>

                    </tr>

                </thead>

                <tbody>

                    {usuarios.map(usuario => (

                        <tr key={usuario.id}>

                            <td>{usuario.id}</td>

                            <td>{usuario.nome}</td>

                            <td>{usuario.perfil}</td>

                            <td>

                                <button
                                    onClick={() =>
                                        navigate("/admin/usuario-form", {
                                            state: {
                                                id: usuario.id
                                            }
                                        })
                                    }
                                >
                                    Editar
                                </button>

                                <button
                                    onClick={() =>
                                        remover(usuario.id)
                                    }
                                >
                                    Excluir
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}