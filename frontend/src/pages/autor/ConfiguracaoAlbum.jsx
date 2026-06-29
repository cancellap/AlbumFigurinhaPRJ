import { useEffect, useState } from "react";

import "../../styles/album.css";

import {
    buscarConfiguracao,
    salvarConfiguracao
} from "../../services/album.service";

export default function ConfiguracaoAlbum() {

    const FONTES = [

        "Oswald",

        "Bebas Neue",

        "Montserrat",

        "Roboto",

        "Lato",

        "Poppins",

        "Playfair Display"

    ];

    const [album, setAlbum] = useState({

        nomeAlbum: "",

        descricao: "",

        corPrimaria: "#1565C0",

        corSecundaria: "#FFD600",

        fonte: "Oswald",

        mostrarNumero: true,

        mostrarDescricao: false

    });

    useEffect(() => {

        carregar();

    }, []);

    async function carregar() {

        const dados =
            await buscarConfiguracao();

        setAlbum(dados);

    }

    function alterarCampo(e) {

        const {

            name,

            value,

            type,

            checked

        } = e.target;

        setAlbum({

            ...album,

            [name]:
                type === "checkbox"
                    ? checked
                    : value

        });

    }

    async function salvar(e) {

        e.preventDefault();

        await salvarConfiguracao(album);

        alert("Configuração salva.");

    }
    return (

        <div className="page">

            <div className="page-header">

                <div>

                    <h1 className="page-title">
                        Configurações do Álbum
                    </h1>

                    <div className="page-sub">
                        Personalize o álbum principal
                    </div>

                </div>

            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 400px",
                    gap: "30px"
                }}
            >

                <form
                    className="form"
                    onSubmit={salvar}
                >

                    <div>

                        <label className="form-label">
                            Nome
                        </label>

                        <input
                            type="text"
                            name="nomeAlbum"
                            value={album.nomeAlbum}
                            onChange={alterarCampo}
                        />

                    </div>

                    <div>

                        <label className="form-label">
                            Descrição
                        </label>

                        <textarea
                            rows="4"
                            name="descricao"
                            value={album.descricao}
                            onChange={alterarCampo}
                        />

                    </div>


                    <div>

                        <label className="form-label">
                            Cor Primária
                        </label>

                        <input
                            type="color"
                            name="corPrimaria"
                            value={album.corPrimaria}
                            onChange={alterarCampo}
                        />

                    </div>

                    <div>

                        <label className="form-label">
                            Cor Secundária
                        </label>

                        <input
                            type="color"
                            name="corSecundaria"
                            value={album.corSecundaria}
                            onChange={alterarCampo}
                        />

                    </div>

                    <div>

                        <label className="form-label">
                            Fonte
                        </label>

                        <select
                            name="fonte"
                            value={album.fonte}
                            onChange={alterarCampo}
                        >

                            {FONTES.map(fonte => (

                                <option
                                    key={fonte}
                                    value={fonte}
                                >
                                    {fonte}
                                </option>

                            ))}

                        </select>

                    </div>

                    <div
                        style={{
                            marginTop:20,
                            padding:20,
                            border:"1px solid #DDD",
                            borderRadius:8,
                            fontFamily:album.fonte
                        }}
                    >

                        <h2>
                            FIGUMANIA
                        </h2>

                        <p>
                            Álbum Oficial
                        </p>

                    </div>

                    <label>

                        <input
                            type="checkbox"
                            name="mostrarNumero"
                            checked={album.mostrarNumero}
                            onChange={alterarCampo}
                        />

                        Mostrar número

                    </label>

                    <label>

                        <input
                            type="checkbox"
                            name="mostrarDescricao"
                            checked={album.mostrarDescricao}
                            onChange={alterarCampo}
                        />

                        Mostrar descrição

                    </label>

                    <button
                        className="btn-primary"
                        type="submit"
                    >

                        Salvar

                    </button>

                </form>

                <div
                    className="card-detalhe"
                    style={{
                        borderColor:
                            album.corPrimaria
                    }}
                >

                <div
                    style={{
                        height: 250,
                        background: "#F2F2F2",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderBottom: "1px solid #DDD",
                        fontSize: 24,
                        color: "#666"
                    }}
                >
                    CAPA DO ÁLBUM
                </div>

                    <div className="card-detalhe-body">

                        <div
                            className="card-detalhe-nome"
                            style={{
                                color:
                                    album.corPrimaria
                            }}
                        >
                            {album.nomeAlbum}
                        </div>

                        <div className="card-detalhe-sub">
                            {album.descricao}
                        </div>

                        <div
                            className="detalhes"
                        >
                            <div className="item">

                                Fonte:
                                {album.fonte}

                            </div>

                            <div className="item">

                                Cor Primária:
                                {album.corPrimaria}

                            </div>

                            <div className="item">

                                Cor Secundária:
                                {album.corSecundaria}

                            </div>
                            
                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}