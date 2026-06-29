import { useEffect, useState } from "react";

import {
    listarUsuarios
} from "../../services/user.service";

import {
    listarFigurinhas
} from "../../services/sticker.service";

export default function Dashboard() {

    const [usuarios, setUsuarios] = useState(0);
    const [figurinhas, setFigurinhas] = useState(0);

    useEffect(() => {

        carregarDashboard();

    }, []);

    async function carregarDashboard() {

        try {

            const listaUsuarios =
                await listarUsuarios();

            const listaFigurinhas =
                await listarFigurinhas();

            setUsuarios(listaUsuarios.length);

            setFigurinhas(listaFigurinhas.length);

        } catch (e) {

            console.error(e);

        }

    }

    return (

        <div className="page">

            <h1>

                Dashboard Administrativo

            </h1>

            <div className="cards">

                <div className="card-figurinha">

                    <h2>

                        {usuarios}

                    </h2>

                    <p>

                        Usuários

                    </p>

                </div>

                <div className="card-figurinha">

                    <h2>

                        1

                    </h2>

                    <p>

                        Álbum

                    </p>

                </div>

                <div className="card-figurinha">

                    <h2>

                        {figurinhas}

                    </h2>

                    <p>

                        Figurinhas

                    </p>

                </div>

            </div>

        </div>

    );

}