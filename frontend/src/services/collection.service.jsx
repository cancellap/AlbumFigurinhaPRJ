const API_URL = "http://localhost:8080/api/collection";

function getHeaders() {

    const token = localStorage.getItem("token");

    return {
        Authorization: `Bearer ${token}`
    };

}

function getUserId() {

    return localStorage.getItem("id");

}

export async function listarMinhaColecao() {

    const response = await fetch(
        `${API_URL}/user/${getUserId()}`,
        {
            headers: getHeaders()
        }
    );

    if (!response.ok) {
        throw new Error("Erro ao carregar coleção.");
    }

    return await response.json();

}

export async function listarPagina(pagina) {

    const response = await fetch(
        `${API_URL}/user/${getUserId()}/pagina/${pagina}`,
        {
            headers: getHeaders()
        }
    );

    if (!response.ok) {
        throw new Error("Erro ao carregar página.");
    }

    return await response.json();

}

export async function adicionarFigurinha(stickerId) {

    const response = await fetch(
        `${API_URL}/user/${getUserId()}/sticker/${stickerId}`,
        {
            method: "POST",
            headers: getHeaders()
        }
    );

    if (!response.ok) {

        throw new Error(
            await response.text()
        );

    }

    return await response.json();

}

export async function removerFigurinha(stickerId) {

    const response = await fetch(
        `${API_URL}/user/${getUserId()}/sticker/${stickerId}`,
        {
            method: "DELETE",
            headers: getHeaders()
        }
    );

    if (!response.ok) {

        throw new Error(
            await response.text()
        );

    }

}

export async function possuiFigurinha(stickerId) {

    const response = await fetch(
        `${API_URL}/user/${getUserId()}/sticker/${stickerId}/possui`,
        {
            headers: getHeaders()
        }
    );

    if (!response.ok) {
        throw new Error("Erro.");
    }

    return await response.json();

}