import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Splash from "./pages/public/Splash";
import Login from "./pages/public/Login";
import About from "./pages/public/About";

import Footer from "./components/Footer";
import AdminLayout from "./components/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Usuarios from "./pages/admin/Usuarios";
import UsuarioForm from "./pages/admin/UsuarioForm";
import AdminDashboard from "./pages/admin/Dashboard";

import AlbumAutor from "./pages/autor/Album";
import FigurinhaForm from "./pages/autor/FigurinhaForm";
import AutorDashboard from "./pages/autor/Dashboard";
import ConfiguracaoAlbum from "./pages/autor/ConfiguracaoAlbum";

import AlbumColecionador from "./pages/colecionador/Album";
import NovaFigurinha from "./pages/colecionador/NovaFigurinha";
import FigurinhaDetalhe from "./pages/colecionador/FigurinhaDetalhe";
import ColecionadorDashboard from "./pages/colecionador/Dashboard";

function Layout() {

  return (
    <>
      <Routes>

        {/* Públicas */}

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

        {/* ================= ADMIN ================= */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute perfil="ADMIN">
              <AdminLayout perfil="admin">
                <AdminDashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/usuarios"
          element={
            <ProtectedRoute perfil="ADMIN">
              <AdminLayout perfil="admin">
                <Usuarios />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/usuario-form"
          element={
            <ProtectedRoute perfil="ADMIN">
              <AdminLayout perfil="admin">
                <UsuarioForm />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* ================= AUTOR ================= */}

        <Route
          path="/autor/dashboard"
          element={
            <ProtectedRoute perfil="AUTOR">
              <AdminLayout perfil="autor">
                <AutorDashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/autor/album"
          element={
            <ProtectedRoute perfil="AUTOR">
              <AdminLayout perfil="autor">
                <AlbumAutor />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/autor/figurinha-form"
          element={
            <ProtectedRoute perfil="AUTOR">
              <AdminLayout perfil="autor">
                <FigurinhaForm />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/autor/configuracao-album"
          element={
            <ProtectedRoute perfil="AUTOR">
              <AdminLayout perfil="autor">
                <ConfiguracaoAlbum />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* ================= COLECIONADOR ================= */}

        <Route
          path="/colecionador/dashboard"
          element={
            <ProtectedRoute perfil="COLECIONADOR">
              <AdminLayout perfil="colecionador">
                <ColecionadorDashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/colecionador/album"
          element={
            <ProtectedRoute perfil="COLECIONADOR">
              <AdminLayout perfil="colecionador">
                <AlbumColecionador />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/colecionador/nova-figurinha"
          element={
            <ProtectedRoute perfil="COLECIONADOR">
              <AdminLayout perfil="colecionador">
                <NovaFigurinha />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/colecionador/figurinha/:id"
          element={
            <ProtectedRoute perfil="COLECIONADOR">
              <AdminLayout perfil="colecionador">
                <FigurinhaDetalhe />
              </AdminLayout>
            </ProtectedRoute>
          }
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