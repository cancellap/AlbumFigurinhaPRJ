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

        mostrarDescricao: false,

        capa: "",

        contraCapa: ""

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

    function carregarImagem(e, campo) {

        const arquivo = e.target.files[0];

        if (!arquivo) return;

        const reader = new FileReader();

        reader.onload = () => {

            setAlbum({

                ...album,

                [campo]: reader.result

            });

        };

        reader.readAsDataURL(arquivo);

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
                    <hr style={{ margin: "25px 0" }} />

                        <div>

                            <label className="form-label">

                                Imagem da Capa

                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    carregarImagem(e, "capa")
                                }
                            />

                        </div>

                        <br />

                        <div>

                            <label className="form-label">

                                Imagem da Contracapa

                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    carregarImagem(e, "contraCapa")
                                }
                            />

                        </div>




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
                        overflow: "hidden",
                        borderBottom: "1px solid #DDD"
                    }}
                >

                    {album.capa ? (

                        <img

                            src={album.capa}

                            alt="Capa"

                            style={{

                                width: "100%",

                                height: "100%",

                                objectFit: "cover"

                            }}

                        />

                    ) : (

                        <div
                            style={{
                                height: "100%",
                                background: "#F2F2F2",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "#777",
                                fontSize: 24
                            }}
                        >

                            CAPA DO ÁLBUM

                        </div>

                    )}

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