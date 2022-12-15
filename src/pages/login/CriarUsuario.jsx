import "./FormularioLogin.css";

import Servicos from "../../services/Servicos";
import Botoes from "../utility/Botoes";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { AiOutlineEye } from "react-icons/ai";

const CriarUsuario = () => {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const Servico = new Servicos();

  const entrar = () => {
    navigate("/");
  };

  function criar() {
    if (nome.length == 0 || email.length == 0 || senha.length == 0) {
      return;
    }
    let user = { Nome: nome, Email: email, Senha: senha }
    Servico.post("usuario/criar", user)
      .then((json) => {
        if (json == true) {
          navigate("/");
        }
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="conteiner">
      <form className="formulario criar">
        <h4>Criar conta</h4>
        <div>
          <input
            type="text"
            placeholder="Nome"
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        <Botoes criar={criar} nomeBotao="Criar" entrar={entrar} />
      </form>
    </div>
  );
};

export default CriarUsuario;
