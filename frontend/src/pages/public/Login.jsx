import "../../styles/login.css";
import logo from "../../assets/Logo.png";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate();

    function handleSubmit(e) {

        e.preventDefault();

        const usuario =
            e.target.usuario.value;

        localStorage.setItem(
            "usuario",
            usuario
        );

        if (usuario === "admin") {
            navigate("/admin/usuarios");
            return;
        }

        if (usuario === "autor") {
            navigate("/autor/album");
            return;
        }

        navigate("/colecionador/album");
    }

    return (
        <div className="container">

            <div className="card">

                <img
                    src={logo}
                    alt="FiguMania"
                    className="logo"
                />

                <h1>Bem-vindo</h1>

                <form
                    id="loginForm"
                    onSubmit={handleSubmit}
                >

                    <div className="campo">
                        <label>Usuário</label>

                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="Digite seu usuário"
                            required
                        />
                    </div>

                    <div className="campo">
                        <label>Senha</label>

                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Digite sua senha"
                            required
                        />
                    </div>

                    <button type="submit">
                        Entrar
                    </button>

                </form>

            </div>

        </div>
    );
}