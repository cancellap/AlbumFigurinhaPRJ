import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
    children,
    perfil
}) {

    const token =
        localStorage.getItem("token");

    const perfilUsuario =
        localStorage.getItem("perfil");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (
        perfil &&
        perfilUsuario !== perfil
    ) {
        return <Navigate to="/login" replace />;
    }

    return children;

}