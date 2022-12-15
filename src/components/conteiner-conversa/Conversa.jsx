import { useState, useEffect } from "react";
import validator from "validator";
import Servicos from "../../services/Servicos";

function Conversa({
  meusContatos,
  setMeusContatos,
  contatoSelecionado,
  minhaConta,
  mensagens,
  setMensagens,
  escrevendo,
  conexao,
  digitando,
  online,
}) {
  const [texto, setTexto] = useState("");

  const Servico = new Servicos();

  useEffect(() => {
    scrollAuto();
  }, [mensagens]);

  function formatarData(data) {
    var novaData = dataCompletaFormatada(data, false);
    return `${novaData.hora}:${novaData.minuto}`;
  }

  function dataCompletaFormatada(data = null, tudo = true) {
    var dataCompleta;

    if (data) {
      dataCompleta = new Date(data);
    } else {
      dataCompleta = new Date();
    }

    var hora = dataCompleta.getHours().toString();
    hora = hora.length == 1 ? "0" + hora : hora;

    var minuto = dataCompleta.getMinutes().toString();
    minuto = minuto.length == 1 ? "0" + minuto : minuto;

    if (!tudo) return { hora, minuto };

    var ano = dataCompleta.getFullYear().toString();

    var mes = (dataCompleta.getMonth() + 1).toString();
    mes = mes.length == 1 ? "0" + mes : mes;

    var dia = dataCompleta.getDate().toString();
    dia = dia.length == 1 ? "0" + dia : dia;

    var segundos = dataCompleta.getSeconds().toString();
    segundos = segundos.length == 1 ? "0" + segundos : segundos;

    var milissegundos = dataCompleta.getMilliseconds();

    return { ano, mes, dia, hora, minuto, segundos, milissegundos };
  }

  function transformarData() {
    var dataCompleta = dataCompletaFormatada();

    return `${dataCompleta.ano}-${dataCompleta.mes}-${dataCompleta.dia}T${dataCompleta.hora}:${dataCompleta.minuto}:${dataCompleta.segundos}.${dataCompleta.milissegundos}`;
  }

  function enviarMensagem() {
    var data = transformarData();

    var novoTexto = validator.trim(texto);

    var mensagem = {
      data_Hora: data,
      id_Usuario_Enviou: minhaConta.id,
      id_Usuario_Recebeu: contatoSelecionado.id,
      texto: novoTexto,
    };

    mensagens.push(mensagem);
    setTexto("");

    conexao.invoke("EnviarMensagem", contatoSelecionado.email, mensagem);
    Servico.post("mensagem/enviar", mensagem)
      .then((data) => {
        scrollAuto();
      })
      .catch((err) => console.error(err));
  }

  function scrollAuto() {
    var intervalo = setTimeout(() => {
      var scroll = document.querySelector(".conversa-mensagem");
      scroll.scrollTop = scroll.scrollHeight;
      clearTimeout(intervalo);
    }, 50);
  }

  function escrevendoText(e) {
    setTexto(e.target.value);

    escrevendo();
  }

  function mandar(e) {
    if (["Enter", "NumpadEnter"].indexOf(e.code.toString()) > -1) {
      enviarMensagem();
    }
  }

  return (
    <div className="conversa-conteiner">
      <div className="topo linha">
        <div className="foto-perfil-topo">
          <img src={contatoSelecionado.imagem} alt="" />
        </div>
        <div className="info-contato-topo">
          <div className="nome-contato-topo">
            <span>{contatoSelecionado.nome}</span>
          </div>
          <div className="hora-ultima-mensagem">
            {digitando ? (
              <span>Digitando...</span>
            ) : (
              <span>
                {online
                  ? "Online"
                  : `visto pela última vez às ${contatoSelecionado.ultimo_Acesso}`}
              </span>
            )}
          </div>
        </div>
        <div className="icones-topo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search search-icon-right"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-three-dots-vertical three-point"
            viewBox="0 0 16 16"
          >
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
          </svg>
        </div>
      </div>
      <div className="caixa-conversa">
        <div className="conversa-mensagem scroll">
          {mensagens.map((msg, idx) => (
            <div
              className={`caixa-mensagem ${
                msg.id_Usuario_Enviou == minhaConta.id ? "minha" : "amigo"
              }`}
              key={idx}
            >
              <div className="mensagem">
                <div className="texto-mensagem">
                  <span>{msg.texto}</span>
                </div>
                <div className="hora-mensagem">
                  <span>{formatarData(msg.data_Hora)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="input-mensagem">
        <div className="icones">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-emoji-laughing"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M12.331 9.5a1 1 0 0 1 0 1A4.998 4.998 0 0 1 8 13a4.998 4.998 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5zM7 6.5c0 .828-.448 0-1 0s-1 .828-1 0S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 0-1 0s-1 .828-1 0S9.448 5 10 5s1 .672 1 1.5z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-paperclip"
            viewBox="0 0 16 16"
          >
            <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
          </svg>
        </div>
        <div className="input">
          <input
            id="input-mensagem"
            type="text"
            placeholder="Mensagem"
            autoComplete="off"
            value={texto}
            onChange={(e) => escrevendoText(e)}
            onKeyDown={mandar}
          />
        </div>
        {texto.length == 0 || texto == "" ? (
          <div className="icone-microfone">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-mic"
              viewBox="0 0 16 16"
            >
              <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
              <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z" />
            </svg>
          </div>
        ) : (
          <div className="icone-microfone" onClick={enviarMensagem}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-send"
              viewBox="0 0 16 16"
            >
              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
export default Conversa;
