import "./MeusContatos.css";
import React, { useEffect, useRef, useState } from "react";
import Servicos from "../../services/Servicos";

function MeusContatos({
  meusContatos,
  setMeusContatos,
  minhaConta,
  onMudarContato,
  foto,
}) {
  const Dropbox = useRef();
  const Servico = new Servicos();

  const dropbox = () => {
    Dropbox.current.style.display = "block";
  };

  useEffect(() => {
    const bodyClick = (e) => {
      if (Dropbox.current.contains(e.target)) {
        return;
      } else {
        Dropbox.current.style.display = "none";
      }
    };

    document.addEventListener("mousedown", bodyClick, true);

    buscasMeusContatos();

    return () => {
      document.removeEventListener("mousedown", bodyClick, true);
    };
  }, []);

  function buscasMeusContatos() {
    Servico.get(`usuario/contato/meus-contatos/${minhaConta.id}`)
      .then((data) => {
        data.forEach((contato) => {
          if (contato.imagem == null) {
            contato.imagem = foto;
          } else {
            contato.imagem = "data:image/png;base64," + contato.imagem;
          }
          contato.hora = formatarData(contato.hora);
          contato.ultimo_Acesso = formatarData(contato.ultimo_Acesso);
        });
        setMeusContatos({ ...meusContatos, contatos: data });
      })
      .catch((err) => console.error(err));
  }

  function definirContato(contato) {
    onMudarContato(contato);
    setMeusContatos({ ...meusContatos, contatoAtivo: contato.id });
  }

  function estiloHover(id) {
    if (id === meusContatos.contatoAtivo) {
      return "hover";
    } else {
      return "";
    }
  }

  function formatarData(data) {
    var dataHora = new Date(data);

    var hora = dataHora.getHours().toString();
    hora = hora.length == 1 ? "0" + hora : hora;

    var minuto = dataHora.getMinutes().toString();
    minuto = minuto.length == 1 ? "0" + minuto : minuto;

    return `${hora}:${minuto}`;
  }

  const desconectar = () => {
    console.log(meusContatos);
    document.querySelector(".desconectar").style.display = "block";
    Dropbox.current.style.display = "none";
  };

  const irParaPerfil = () => {
    document.querySelector(".meus-contatos").style.display = "none";
    document.querySelector(".meu-perfil").style.display = "block";
  };

  const irParaAdicionarContato = () => {
    document.querySelector(".meus-contatos").style.display = "none";
    document.querySelector(".adicionar-contato").style.display = "block";
  };

  return (
    <div className="meus-contatos">
      <div className="topo">
        <div className="foto-perfil-topo">
          <img
            id="minhaFoto"
            src={minhaConta.imagem}
            alt=""
            onClick={irParaPerfil}
          />
        </div>
        <div className="svg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            fill="currentColor"
            className="bi bi-chat-left-text-fill"
            viewBox="0 0 16 16"
            onClick={irParaAdicionarContato}
          >
            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="20"
            fill="currentColor"
            className="bi bi-three-dots-vertical"
            viewBox="0 0 16 16"
            onClick={dropbox}
          >
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
          </svg>
          <div ref={Dropbox} className="caixa-opcoes">
            <div className="opcoes">
              <ul>
                <li>Novo grupo</li>
                <li>Mensagens favoritas</li>
                <li>Configurações</li>
                <li onClick={desconectar}>Desconectar</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="procurar">
        <div className="input-icones">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search search-icon"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
          <input
            type="text"
            placeholder="Pesquisar ou começar uma nova conversa"
            required
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="24"
            fill="currentColor"
            className="bi bi-filter filter"
            viewBox="0 0 16 16"
          >
            <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
          </svg>
        </div>
      </div>
      <div className="conteiner-contatos scroll">
        {meusContatos.contatos.map((contato, idx) => (
          <div
            className={`caixa-contato ${estiloHover(contato.id)}`}
            onClick={(e) => definirContato(contato)}
            key={idx}
          >
            <div className="foto-contato">
              <img src={contato.imagem} alt="" />
            </div>
            <div className="info-contato">
              <div className="nome-hora">
                <div className="nome-contato">
                  <span>{contato.nome}</span>
                </div>
                <div className="hora-mensagem">
                  <span>{contato.hora == "00:00" ? "" : contato.hora}</span>
                </div>
              </div>
              <div className="mensagem-contato">
                <span>{contato.ultimaMensagem}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MeusContatos;
