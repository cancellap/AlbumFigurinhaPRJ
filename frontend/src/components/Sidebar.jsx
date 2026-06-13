import { Link } from "react-router-dom";
import "../styles/sidebar.css";

export default function Sidebar({ perfil }) {

    const menus = {
        admin: [
            {
                nome: "Usuários",
                rota: "/admin/usuarios"
            },
            {
                nome: "Novo Usuário",
                rota: "/admin/usuario-form"
            }
        ],

        autor: [
            {
                nome: "Álbuns",
                rota: "/autor/album"
            },
            {
                nome: "Nova Figurinha",
                rota: "/autor/figurinha-form"
            }
        ],

        colecionador: [
            {
                nome: "Meu Álbum",
                rota: "/colecionador/album"
            },
            {
                nome: "Adicionar Figurinha",
                rota: "/colecionador/nova-figurinha"
            }
        ]
    };

    return (
        <aside className="sidebar">

            <h2>
                FiguMania
            </h2>

            {menus[perfil]?.map(item => (

                <Link
                    key={item.rota}
                    to={item.rota}
                    className="menu-item"
                >
                    {item.nome}
                </Link>

            ))}

        </aside>
    );
}