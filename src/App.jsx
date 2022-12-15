import "./App.css";
import WhatsApp from "./pages/main/WhatsApp";
import CriarUsuario from "./pages/login/CriarUsuario";
import FormularioLogin from "./pages/login/FormularioLogin";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="main">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FormularioLogin />} />
          <Route path="/criar-usuario" element={<CriarUsuario />} />
          <Route path="/Whatsapp" element={<WhatsApp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
