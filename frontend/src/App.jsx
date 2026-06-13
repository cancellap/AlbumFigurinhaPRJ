import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Splash from "./pages/public/Splash";
import Login from "./pages/public/Login";
import About from "./pages/public/About";

import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>

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

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;