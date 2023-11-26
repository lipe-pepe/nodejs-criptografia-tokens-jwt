// Vamos simular um ataque de dicionario.

// 1 - Trazemos o código que implementa o hash, pra tentarmos atacá-lo.
import { createHash } from "crypto";

class Usuario {
  constructor(nome, senha) {
    this.nome = nome;
    // Nao guardamos a senha do usuário NUNCA! Sempre o que é guardado é a hash da senha. Como a hash não tem caminho inverso, é seguro guardar somente ela.
    this.hash = this.criarHash(senha);
  }

  criarHash(senha) {
    return createHash("sha256").update(senha).digest("hex");
  }

  autenticar(nome, senha) {
    if (nome === this.nome && this.hash === this.criarHash(senha)) {
      return true;
    }
    return false;
  }
}

const usuario = new Usuario("Felipe", "senha123");

// 2 - Ataque

// Lista de senhas comuns ou previsíveis
const senhasComuns = [
  "senha",
  "123456",
  "senha123",
  "admin",
  "blink182",
  "meuAniversario",
  "senha123456",
  "brasil",
  "102030",
];

senhasComuns.map((senha) => {
  if (usuario.autenticar("Felipe", senha)) {
    console.log(`A senha é ${senha}`);
  }
});
