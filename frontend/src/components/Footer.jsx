import { Link } from "react-router-dom";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span>© 2026 FiguMania</span>

        <span>|</span>

        <Link to="/about">
          Sobre
        </Link>

        <span>|</span>

        <span>Versão 1.0</span>
      </div>
    </footer>
  );
}