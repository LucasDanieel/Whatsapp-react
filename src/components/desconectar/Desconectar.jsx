import "./Desconectar.css";
import { memo } from "react";

function Desconectar() {
  const cancelar = () => {
    document.querySelector(".desconectar").style.display = "none";
  };

  function deletarLocalStorage() {
    localStorage.removeItem("Usuario");
    window.location.reload(true);
  }

  return (
    <>
      <div className="desconectar">
        <div className="alinhar-item">
          <div className="desconectar-container">
            <div className="texto-botoes">
              <div className="texto">
                <h5>Sair?</h5>
                <span>Tem certeza de que deseja se desconectar?</span>
              </div>
              <div className="botoes">
                <button className="cancelar" onClick={cancelar}>
                  CANCELAR
                </button>
                <button className="sair" onClick={deletarLocalStorage}>
                  DESCONECTAR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(Desconectar);
