import Servicos from "../../services/Servicos";

import "./AdicionarContato.css";
import { useState, memo } from "react";

function AdicionarContato({ meuId, foto }) {
  const [contatos, setContatos] = useState([]);
  const Servico = new Servicos();

  const buscarContatos = (e) => {
    if (e.target.value[0] === " " || e.target.value == "") {
      document.querySelector("#input-procurar-contato").value = "";
      setContatos([]);
      return;
    }
    Servico.get(`usuario/contato/${e.target.value}/${meuId}`)
      .then((data) => {
        setContatos(data);
      })
      .catch((err) => console.error(err));
  };

  const adicionarContato = (contatoId) => {
    if (meuId == contatoId) {
      return;
    }
    var novoContato = {
      Id_Usuario_Enviou: meuId,
      Id_Usuario_Recebeu: contatoId,
    };

    Servico.post("usuario/contato/adicionar", novoContato)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  function escolherImagem(imagem) {
    if (imagem != null) {
      return "data:image/png;base64," + imagem;
    }
    return foto;
  }

  const voltarParaContatos = () => {
    document.querySelector(".meus-contatos").style.display = "block";
    document.querySelector(".adicionar-contato").style.display = "none";
  };

  return (
    <div className="adicionar-contato">
      <div className="adicionar-contato-topo">
        <div className="voltar-contatos">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-left"
            viewBox="0 0 6 14"
            onClick={voltarParaContatos}
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>
          <h5>Nova conversa</h5>
        </div>
      </div>
      <div className="procurar-novo-contato">
        <div className="input-icone-adicionar-contato">
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
            id="input-procurar-contato"
            type="text"
            placeholder="Pesquisar novo contato / contato@gmail.com"
            required
            onChange={(e) => buscarContatos(e)}
          />
        </div>
      </div>
      <div className="conteiner-adicionar-contato scroll">
        {contatos.map((contato, idx) => (
          <div
            className="caixa-adicionar-contato"
            key={idx}
            onClick={(e) => adicionarContato(contato.id)}
          >
            <div className="foto-novo-contato">
              <img src={escolherImagem(contato.imagem)} alt="" />
            </div>
            <div className="info-novo-contato">
              <div className="nome">
                <div className="nome-novo-contato">
                  <span>{contato.nome}</span>
                </div>
              </div>
              <div className="recado-novo-contato">
                <span>{contato.recado}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(AdicionarContato);
