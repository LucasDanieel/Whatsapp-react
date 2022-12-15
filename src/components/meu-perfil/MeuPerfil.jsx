import { useEffect } from "react";
import Servicos from "../../services/Servicos";
import "./MeuPerfil.css";

function MeuPerfil({ minhaConta, setMinhaConta }) {
  var nomeTemporario = { nome: minhaConta.nome, alterado: false };
  var recadoTemporario = { recado: minhaConta.recado, alterado: false };

  const Servico = new Servicos();

  var nomeInput;
  var recadoInput;

  useEffect(() => {
    nomeInput = document.querySelector("#nome");
    recadoInput = document.querySelector("#recado");
  });

  function atualizarFoto() {
    const formData = new FormData();
    var inputFoto = document.querySelector('input[type="file"]');

    formData.append(minhaConta.id, inputFoto.files[0]);

    var antigoLocalStorage = JSON.parse(localStorage.getItem("Usuario"));

    Servico.postImagem("imagem/atualizar-foto", formData)
      .then((data) => {
        var novaImagem = `data:image/png;base64,${data.imagem}`;
        setMinhaConta({
          ...minhaConta,
          imagem: novaImagem,
        });

        antigoLocalStorage.imagem = novaImagem;
        var novoLocalStorage = JSON.stringify(antigoLocalStorage);
        localStorage.setItem("Usuario", novoLocalStorage);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function escolherFoto() {
    document.querySelector("#arquivo").click();
  }

  function mudarNome(e) {
    if (e.target.id == "nome") {
      nomeInput.disabled = false;

      nomeInput.focus();
    } else {
      recadoInput.disabled = false;

      recadoInput.focus();
    }
  }

  function editarNome(e) {
    nomeTemporario.nome = e.target.value;
  }

  function editarRecado(e) {
    recadoTemporario.recado = e.target.value;
  }

  function voltarParaContatos() {
    if (
      nomeTemporario.nome != minhaConta.nome &&
      nomeTemporario.alterado == false
    ) {
      nomeTemporario.nome = minhaConta.nome;
      nomeInput.value = minhaConta.nome;
    }

    if (
      recadoTemporario.recado != minhaConta.recado &&
      recadoTemporario.alterado == false
    ) {
      recadoTemporario.recado = minhaConta.recado;
      recadoInput.value = minhaConta.recado;
    }
    document.querySelector(".meus-contatos").style.display = "block";
    document.querySelector(".meu-perfil").style.display = "none";

    nomeInput.disabled = true;
    recadoInput.disabled = true;
  }

  return (
    <div className="meu-perfil">
      <div className="meu-perfil-topo">
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
          <h5>Perfil</h5>
        </div>
      </div>
      <div className="info-meu-perfil">
        <div className="conteiner-foto">
          <div className="foto-perfil">
            <div className="foto" onClick={escolherFoto}>
              <img id="minhaFoto" src={minhaConta.imagem} alt="" />
              <input
                id="arquivo"
                type="file"
                accept="image/*"
                onChange={(e) => atualizarFoto(e)}
              />
              <div className="adicionar-foto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-camera-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                  <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
                </svg>
                <span>
                  ADICIONAR <br />
                  FOTO DO PERFIL
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="nome-recado">
          <div className="nome-input">
            <p>Seu nome</p>
            <div className="input-icone">
              <input
                id="nome"
                type="text"
                defaultValue={nomeTemporario.nome}
                onChange={editarNome}
                disabled
                autoComplete="off"
              />
              <svg
                id="nome"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pencil-fill"
                viewBox="0 0 16 16"
                onClick={mudarNome}
              >
                <path
                  id="nome"
                  onClick={mudarNome}
                  d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="recado-whatsapp">
          <p>
            Esse não é seu nome de usuário e nem seu PIN. Esse nome será visível
            para seus contatos do WhatsApp.
          </p>
        </div>
        <div className="nome-recado">
          <div className="nome-input">
            <p>Recado</p>
            <div className="input-icone">
              <input
                id="recado"
                type="text"
                defaultValue={recadoTemporario.recado}
                onChange={editarRecado}
                disabled
                autoComplete="off"
              />
              <svg
                id="recado"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pencil-fill"
                viewBox="0 0 16 16"
                onClick={mudarNome}
              >
                <path
                  id="recado"
                  onClick={mudarNome}
                  d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MeuPerfil;
