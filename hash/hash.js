import { createHash } from "crypto";

function criarHash(senha) {
  // createHash -> inicia um hash
  // update -> onde passamos a senha
  // digest -> tipo de codificiação de como a informação vai ser apresentada
  return createHash("sha256").update(senha).digest("hex");
}

class Usuario {
  constructor(nome, senha) {
    this.nome = nome;
    // Nao guardamos a senha do usuário NUNCA! Sempre o que é guardado é a hash da senha. Como a hash não tem caminho inverso, é seguro guardar somente ela.
    this.hash = criarHash(senha);
  }

  autenticar(nome, senha) {
    if (nome === this.nome && this.hash === criarHash(senha)) {
      console.log("Autenticado!");
      return true;
    }
    console.log("Usuário ou senha incorretos.");
    return false;
  }
}

const usuario = new Usuario("Felipe", "senha123");

console.log(usuario);

usuario.autenticar("Felipe", "senha123");
usuario.autenticar("F", "senha123");
usuario.autenticar("Felipe", "senha");
