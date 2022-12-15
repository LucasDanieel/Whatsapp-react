const headers = {
  "Content-Type": "application/json",
};

function unirURL(dominioURL, url) {
  return `${dominioURL}/${url}`;
}

class Servicos {
  constructor() {
    this.dominio = "https://localhost:7277";
  }

  request(url, method, data = null) {
    url = unirURL(this.dominio, url);
    const option = {
      method,
      headers,
    };
    if (data) {
      option.body = JSON.stringify(data);
    }
    return fetch(url, option);
  }

  requestImagem(url, method, data = null) {
    url = unirURL(this.dominio, url);
    const option = {
      method,
    };
    if (data) {
      option.body = data;
    }
    return fetch(url, option);
  }

  async get(url) {
    const method = "GET";
    var req = this.request(url, method);
    return await req.then((resp) => resp.json());
  }

  async post(url, data) {
    var method = "POST";
    var req = this.request(url, method, data);
    return await req.then((resp) => resp.json());
  }

  postImagem(url, data) {
    var method = "POST";
    return this.requestImagem(url, method, data).then((resp) => resp.json());
  }

  validaUsuario(usuario) {
    var method = "GET";
    return this.request(
      `usuario/validar-usuario/${usuario.email}/${usuario.senha}`,
      method
    ).then((resp) => resp.json());
  }
}

export default Servicos;
