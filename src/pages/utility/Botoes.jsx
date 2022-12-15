import './Botoes.css'

const Botoes = ({criar, nomeBotao , entrar}) => {
  return (
    <div className="btn">
      <a className="criar" onClick={criar}>
        {nomeBotao}
      </a>
      <a className="entrar" onClick={entrar}>
        Entrar
      </a>
    </div>
  );
};

export default Botoes;
