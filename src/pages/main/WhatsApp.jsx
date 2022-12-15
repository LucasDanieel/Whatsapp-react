import "./WhatsApp.css";

import Desconectar from "../../components/desconectar/Desconectar";
import MeuPerfil from "../../components/meu-perfil/MeuPerfil";
import MeusContatos from "../../components/meus-contatos/MeusContatos";
import ConteinerConversa from "../../components/conteiner-conversa/ConteinerConversar";
import AdicionarContato from "../../components/adicionar-novo-contato/AdicionarContato";
import foto from "../../assets/contact/photo_profile.png";

import Servicos from "../../services/Servicos";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function WhatsApp() {
  const navigate = useNavigate();
  const Servico = new Servicos();

  const [mensagens, setMensagens] = useState([]);

  const [meusContatos, setMeusContatos] = useState({
    contatoAtivo: null,
    contatos: [],
  });

  const [contatoSelecionado, setContatoSelecionado] = useState();

  const [minhaConta, setMinhaConta] = useState();

  useEffect(() => {
    buscarLocalStorage();
  }, []);

  const buscarLocalStorage = async () => {
    var usuarioJson = localStorage.getItem("Usuario");
    var usuario = JSON.parse(usuarioJson);

    if (usuario != null) {
      if (Servico.validaUsuario(usuario) == false) {
        return navigate("/");
      }
    }

    if (usuario == null) {
      return navigate("/");
    }
    setMinhaConta(usuario);
  };

  function onMudarContato(contato) {
    setContatoSelecionado(contato);
    Servico.get(`mensagem/lista-mensagens/${minhaConta.id}/${contato.id}`)
      .then((data) => {
        setMensagens(data);
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="fundo">
      {minhaConta ? (
        <>
          <div className="conteiner-principal">
            <div className="esquerda">
              <MeusContatos
              meusContatos={meusContatos}
              setMeusContatos={setMeusContatos}
                minhaConta={minhaConta}
                onMudarContato={onMudarContato}
                foto={foto}
              />
              <MeuPerfil
                minhaConta={minhaConta}
                setMinhaConta={setMinhaConta}
              />
              <AdicionarContato meuId={minhaConta.id} foto={foto} />
            </div>
            <div className="direita">
              <ConteinerConversa
                minhaConta={minhaConta}
                meusContatos={meusContatos}
                setMeusContatos={setMeusContatos}
                setContatoSelecionado={setContatoSelecionado}
                contatoSelecionado={contatoSelecionado}
                mensagens={mensagens}
                setMensagens={setMensagens}
              />
            </div>
          </div>
          <Desconectar />
        </>
      ) : (
        <div>Carregando</div>
      )}
    </div>
  );
}

export default WhatsApp;
