const API_URL = "http://localhost:8080/api/users";

/* ===========================
   LISTAR
=========================== */

export async function listarUsuarios() {

    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Erro ao carregar usuários.");
    }

    return await response.json();

}

/* ===========================
   PESQUISAR
=========================== */

export async function pesquisarUsuarios(nome: string) {

    const response = await fetch(
        `${API_URL}?nome=${encodeURIComponent(nome)}`
    );

    if (!response.ok) {
        throw new Error("Erro ao pesquisar usuários.");
    }

    return await response.json();

}

/* ===========================
   BUSCAR POR ID
=========================== */

export async function buscarUsuario(id: number) {

    const response = await fetch(
        `${API_URL}/${id}`
    );

    if (!response.ok) {
        throw new Error("Erro ao buscar usuário.");
    }

    return await response.json();

}

/* ===========================
   CADASTRAR
=========================== */

export async function salvarUsuario(usuario: any) {

    const response = await fetch(API_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(usuario)

    });

    if (!response.ok) {
        throw new Error("Erro ao salvar usuário.");
    }

    return await response.json();

}

/* ===========================
   EDITAR
=========================== */

export async function editarUsuario(
    id: number,
    usuario: any
) {

    const response = await fetch(
        `${API_URL}/${id}`,
        {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(usuario)

        }
    );

    if (!response.ok) {
        throw new Error("Erro ao atualizar usuário.");
    }

    return await response.json();

}

/* ===========================
   EXCLUIR
=========================== */

export async function excluirUsuario(id: number) {

    const response = await fetch(
        `${API_URL}/${id}`,
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {
        throw new Error("Erro ao excluir usuário.");
    }

}

/* ===========================
   RESETAR SENHA
=========================== */

export async function resetarSenha(id: number) {

    const response = await fetch(
        `${API_URL}/${id}/reset-password`,
        {
            method: "PUT"
        }
    );

    if (!response.ok) {
        throw new Error("Erro ao resetar senha.");
    }

    return await response.json();

}