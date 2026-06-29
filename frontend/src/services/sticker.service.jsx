const API_URL = "/api/stickers";

function getHeaders() {
    const token = localStorage.getItem("token");

    return {
        Authorization: `Bearer ${token}`
    };
}

export async function listarFigurinhas() {

    const response = await fetch(API_URL, {
        headers: getHeaders()
    });

    if (!response.ok) {
        throw new Error("Erro ao listar figurinhas.");
    }

    return await response.json();

}

export async function pesquisarFigurinhas(nome) {

    const response = await fetch(
        `${API_URL}?nome=${encodeURIComponent(nome)}`,
        {
            headers: getHeaders()
        }
    );

    if (!response.ok) {
        throw new Error("Erro ao pesquisar figurinhas.");
    }

    return await response.json();

}

export async function buscarFigurinha(id) {

    const response = await fetch(
        `${API_URL}/${id}`,
        {
            headers: getHeaders()
        }
    );

    if (!response.ok) {
        throw new Error("Figurinha não encontrada.");
    }

    return await response.json();

}

export async function salvarFigurinha(figurinha) {

    const form = new FormData();

    form.append("numero", figurinha.numero);
    form.append("nome", figurinha.nome);
    form.append("descricao", figurinha.descricao ?? "");
    form.append("pagina", figurinha.pagina);

    if (figurinha.foto) {
        form.append("foto", figurinha.foto);
    }

    const response = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders(),
        body: form
    });

    if (!response.ok) {
        throw new Error("Erro ao salvar figurinha.");
    }

    return await response.json();

}

export async function editarFigurinha(id, figurinha) {

    const form = new FormData();

    form.append("numero", figurinha.numero);
    form.append("nome", figurinha.nome);
    form.append("descricao", figurinha.descricao ?? "");
    form.append("pagina", figurinha.pagina);

    if (figurinha.foto) {
        form.append("foto", figurinha.foto);
    }

    const response = await fetch(
        `${API_URL}/${id}`,
        {
            method: "PUT",
            headers: getHeaders(),
            body: form
        }
    );

    if (!response.ok) {
        throw new Error("Erro ao editar figurinha.");
    }

    return await response.json();

}

export async function excluirFigurinha(id) {

    const response = await fetch(
        `${API_URL}/${id}`,
        {
            method: "DELETE",
            headers: getHeaders()
        }
    );

    if (!response.ok) {
        throw new Error("Erro ao excluir figurinha.");
    }

}

export function fotoFigurinha(id) {

    return `${API_URL}/${id}/foto`;

}

export async function carregarFotoFigurinha(id) {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/${id}/foto`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {
        throw new Error("Erro ao carregar imagem.");
    }

    const blob = await response.blob();

    return URL.createObjectURL(blob);

}

export async function buscarFigurinhaPorTag(tag) {

    const response = await fetch(
        `${API_URL}/tag/${encodeURIComponent(tag)}`,
        {
            headers: getHeaders()
        }
    );

    if (!response.ok) {
        throw new Error("Tag inválida.");
    }

    return await response.json();

}