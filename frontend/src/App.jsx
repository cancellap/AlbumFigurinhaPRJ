import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import Splash from "./pages/public/Splash";
import Login from "./pages/public/Login";
import About from "./pages/public/About";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Usuarios from "./pages/admin/Usuarios";
import UsuarioForm from "./pages/admin/UsuarioForm";

import AlbumAutor from "./pages/autor/Album";
import FigurinhaForm from "./pages/autor/FigurinhaForm";

import AlbumColecionador from "./pages/colecionador/Album";
import NovaFigurinha from "./pages/colecionador/NovaFigurinha";
import FigurinhaDetalhe from "./pages/colecionador/FigurinhaDetalhe";



function Layout() {

  const location = useLocation();

  const mostrarHeader =
    !["/", "/login", "/about"].includes(
      location.pathname
    );

  return (
    <>
      {mostrarHeader && (
        <Header />
      )}

      <Routes>

        <Route
          path="/"
          element={<Splash />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
            path="/admin/usuarios"
            element={<Usuarios />}
        />

        <Route
            path="/admin/usuario-form"
            element={<UsuarioForm />}
        />

        <Route
            path="/autor/album"
            element={<AlbumAutor />}
        />

        <Route
            path="/autor/figurinha-form"
            element={<FigurinhaForm />}
        />

        <Route
            path="/colecionador/album"
            element={<AlbumColecionador />}
        />

        <Route
            path="/colecionador/nova-figurinha"
            element={<NovaFigurinha />}
        />

        <Route
            path="/colecionador/figurinha/:id"
            element={<FigurinhaDetalhe />}
        />


      </Routes>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}