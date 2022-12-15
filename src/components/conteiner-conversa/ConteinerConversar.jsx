import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Conversa from "./Conversa";

function ConteinerConversar({
  contatoSelecionado,
  minhaConta,
  mensagens,
  setMensagens,
  meusContatos,
  setMeusContatos,
}) {
  const [conexao, setConexao] = useState({});

  const [digitando, setDigitando] = useState(false);
  const [online, setOnline] = useState(false);

  let id;

  useEffect(() => {
    initSignalR();
  }, []);

  const navigate = useNavigate();
  const initSignalR = async () => {
    const _conexao = new HubConnectionBuilder()
      .withUrl("https://localhost:7277/chat")
      .withAutomaticReconnect({
        nextRetryDelayInMilliseconds: (retryContext) => {
          if (retryContext.elapsedMilliseconds < 60000) {
            return Math.random() * 10000;
          } else {
            return null;
          }
        },
      })
      .configureLogging(LogLevel.Information)
      .build();

    await _conexao.start();
    _conexao.invoke("OnConnected", minhaConta.email);

    setConexao(_conexao);

    _conexao.on("Msg", (msg) => {
      setMensagens((mensagens) => [...mensagens, msg]);
    });

    _conexao.on("ContatoEscrevendo", () => {
      if (!digitando) setDigitando(true);

      clearTimeout(id);
      id = setTimeout(() => {
        setDigitando(false);
      }, 3000);
    });

    _conexao.on("Online", (on) => {
      setOnline(on);
    });

    _conexao.on("Desconectou", (email) => {
      console.log("Desconectou", email);
    });

    _conexao.on("Conectou", (email) => {
      console.log("Conectou", email);
      if (contatoSelecionado) {
        console.log(contatoSelecionado);
      }
    });
  };

  function escrevendo() {
    conexao.invoke("Escrevendo", contatoSelecionado.email);
  }

  return (
    <>
      {contatoSelecionado ? (
        <Conversa
          meusContatos={meusContatos}
          setMeusContatos={setMeusContatos}
          contatoSelecionado={contatoSelecionado}
          minhaConta={minhaConta}
          mensagens={mensagens}
          setMensagens={setMensagens}
          conexao={conexao}
          escrevendo={escrevendo}
          digitando={digitando}
          online={online}
        />
      ) : (
        <div className="esperando-conversa">
          <span>WhatsApp Clone</span>
        </div>
      )}
    </>
  );
}

export default ConteinerConversar;
