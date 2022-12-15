import "./FormularioLogin.css";
import Botoes from "../utility/Botoes";
import foto from "../../assets/contact/photo_profile.png";

import Servicos from "../../services/Servicos";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const FormularioLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const Servico = new Servicos();

  useEffect(() => {
    validar();
  }, []);

  function validar() {
    var usuarioJson = localStorage.getItem("Usuario");
    var usuario = JSON.parse(usuarioJson);

    if (usuario != null) {
      Servico.validaUsuario(usuario)
        .then((data) => {
          if(data == false || data == undefined){
            return false
          }
          return navigate('/Whatsapp')
        })
        .catch((err) => console.error(err));
    }
  }

  const criar = () => {
    navigate("/criar-usuario");
  };

  const entrar = () => {
    Servico.get(`usuario/buscar-usuario/${email}/${senha}`)
      .then((data) => {
        if (data == false) {
          return alert("usuario invalido");
        }
        if (data.imagem == null || data.imagem == "data:image/png;base64,") {
          data.imagem = foto;
        } else {
          var base64imagem = "data:image/png;base64," + data.imagem;
          data.imagem = base64imagem;
        }
        var usuario = JSON.stringify(data);
        localStorage.setItem("Usuario", usuario);
        navigate("/Whatsapp");
      })
      .catch((err) => console.error(err));
  };

  const keyDownEnter = (e) => {
    if (e.key == "Enter") {
      entrar();
    }
  };
  return (
    <div className="conteiner">
      <form
        className="formulario"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h4>Fazer login</h4>
        <div>
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            onChange={(e) => setSenha(e.target.value)}
            onKeyDown={keyDownEnter}
          />
        </div>
        <Botoes criar={criar} nomeBotao="Criar conta" entrar={entrar} />
      </form>
    </div>
  );
};

export default FormularioLogin;
