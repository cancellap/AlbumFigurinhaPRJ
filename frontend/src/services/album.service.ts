import axios from "axios";

const API = "http://localhost:8080/api/album/config";

export interface AlbumConfig {

    nomeAlbum: string;

    descricao: string;

    corPrimaria: string;

    corSecundaria: string;

    fonte: string;

    mostrarNumero: boolean;

    mostrarDescricao: boolean;

}

export async function buscarConfiguracao(): Promise<AlbumConfig> {

    const response = await axios.get(API);

    return response.data;

}

export async function salvarConfiguracao(
    config: AlbumConfig
): Promise<AlbumConfig> {

    const response = await axios.put(API, config);

    return response.data;

}