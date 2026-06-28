import "../../styles/login.css";
import logo from "../../assets/Logo.png";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { login, salvarSessao } from "../../services/auth.service";

export default function Login() {

    const navigate = useNavigate();

    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function handleSubmit(e) {

        e.preventDefault();

        setErro("");
        setCarregando(true);

        const nome =
            e.target.usuario.value.trim();

        const senha =
            e.target.senha.value;

        try {

            const usuario =
                await login(nome, senha);

            salvarSessao(usuario);

            switch (usuario.perfil) {

                case "ADMIN":
                    navigate("/admin/dashboard");
                    break;

                case "AUTOR":
                    navigate("/autor/dashboard");
                    break;

                case "COLECIONADOR":
                    navigate("/colecionador/dashboard");
                    break;

                default:
                    setErro("Perfil inválido.");
                    break;
            }

        } catch (error) {

            setErro(
                error.message || "Erro ao realizar login."
            );

        } finally {

            setCarregando(false);

        }

    }

    return (

        <div className="login-page">

            <div className="login-card">

                <img
                    src={logo}
                    alt="FiguMania"
                    className="login-logo"
                />

                <h1 className="login-title">
                    Bem-vindo
                </h1>

                <p className="login-sub">
                    Entre para acessar seu álbum
                </p>

                {erro && (

                    <div className="login-error">
                        {erro}
                    </div>

                )}

                <form
                    onSubmit={handleSubmit}
                >

                    <div className="campo">

                        <label>
                            Usuário
                        </label>

                        <input
                            type="text"
                            name="usuario"
                            placeholder="Digite seu usuário"
                            required
                        />

                    </div>

                    <div className="campo">

                        <label>
                            Senha
                        </label>

                        <input
                            type="password"
                            name="senha"
                            placeholder="Digite sua senha"
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="login-btn"
                        disabled={carregando}
                    >

                        {
                            carregando
                                ? "Entrando..."
                                : "Entrar"
                        }

                    </button>

                </form>

            </div>

        </div>

    );

}