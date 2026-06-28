const API_URL = "/api/auth";

export async function login(nome, senha) {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome,
            senha
        })
    });

    if (!response.ok) {
        const mensagem = await response.text();
        throw new Error(mensagem || "Usuário ou senha inválidos.");
    }

    return await response.json();
}

export function salvarSessao(usuario) {
    localStorage.setItem("token", usuario.token);
    localStorage.setItem("id", usuario.id);
    localStorage.setItem("nome", usuario.nome);
    localStorage.setItem("perfil", usuario.perfil);
}

export function logout() {
    localStorage.clear();
}

export function getToken() {
    return localStorage.getItem("token");
}

export function getPerfil() {
    return localStorage.getItem("perfil");
}

export function getUsuario() {
    return {
        id: localStorage.getItem("id"),
        nome: localStorage.getItem("nome"),
        perfil: localStorage.getItem("perfil"),
        token: localStorage.getItem("token")
    };
}