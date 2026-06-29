const API = "http://localhost:8080/api/album/config";

export async function buscarConfiguracao() {

    const response = await fetch(API);

    if (!response.ok) {
        throw new Error("Erro ao carregar configuração.");
    }

    return await response.json();

}

export async function salvarConfiguracao(config) {

    const response = await fetch(API, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(config)

    });

    if (!response.ok) {
        throw new Error("Erro ao salvar configuração.");
    }

    return await response.json();

}