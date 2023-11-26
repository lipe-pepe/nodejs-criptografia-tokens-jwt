// Vamos simular um ataque de forca bruta.

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

// Vamos fingir que no sistema, só permitimos digitos numericos na senha
const usuario = new Usuario("Felipe", "9822");

// 2 - Ataque

for (let senhaTeste = 0; senhaTeste < 10000; senhaTeste++) {
  if (usuario.autenticar("Felipe", senhaTeste.toString())) {
    console.log(`A senha é ${senhaTeste}`);
  }
}
