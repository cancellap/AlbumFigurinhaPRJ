import { useEffect, useState } from "react";

import {
    listarFigurinhas
} from "../../services/sticker.service";

export default function Dashboard() {

    const [figurinhas, setFigurinhas] = useState(0);

    useEffect(() => {

        carregarDashboard();

    }, []);

    async function carregarDashboard() {

        try {

            const lista =
                await listarFigurinhas();

            setFigurinhas(lista.length);

        } catch (e) {

            console.error(e);

        }

    }

    return (

        <div className="page">

            <h1>

                Dashboard do Autor

            </h1>

            <div className="cards">

                <div className="card-figurinha">

                    <h2>

                        1

                    </h2>

                    <p>

                        Meu Álbum

                    </p>

                </div>

                <div className="card-figurinha">

                    <h2>

                        {figurinhas}

                    </h2>

                    <p>

                        Minhas Figurinhas

                    </p>

                </div>

            </div>

        </div>

    );

}