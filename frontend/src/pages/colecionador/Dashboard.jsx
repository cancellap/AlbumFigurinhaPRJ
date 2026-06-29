import { useEffect, useState } from "react";

import {
    listarMinhaColecao
} from "../../services/collection.service";

import {
    listarFigurinhas
} from "../../services/sticker.service";

export default function Dashboard() {

    const [obtidas, setObtidas] = useState(0);
    const [faltando, setFaltando] = useState(0);

    useEffect(() => {

        carregarDashboard();

    }, []);

    async function carregarDashboard() {

        try {

            const colecao =
                await listarMinhaColecao();

            const figurinhas =
                await listarFigurinhas();

            setObtidas(colecao.length);

            setFaltando(
                figurinhas.length - colecao.length
            );

        } catch (e) {

            console.error(e);

        }

    }

    return (

        <div className="page">

            <h1>

                Meu Álbum

            </h1>

            <div className="cards">

                <div className="card-figurinha">

                    <h2>

                        {obtidas}

                    </h2>

                    <p>

                        Obtidas

                    </p>

                </div>

                <div className="card-figurinha">

                    <h2>

                        {faltando}

                    </h2>

                    <p>

                        Faltando

                    </p>

                </div>

            </div>

        </div>

    );

}