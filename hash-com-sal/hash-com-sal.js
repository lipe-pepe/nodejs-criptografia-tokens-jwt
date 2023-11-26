import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

function criarHashComSal(senha) {
  // Formatamos os bytes aleatorios do sal para string hexadecimal
  const sal = randomBytes(16).toString("hex");

  // 64 é o tamanho da senha que será criado.
  const senhaHasheada = scryptSync(senha, sal, 64).toString("hex");
  return `${sal}:${senhaHasheada}`;
}

class Usuario {
  constructor(nome, senha) {
    this.nome = nome;
    // Nao guardamos a senha do usuário NUNCA! Sempre o que é guardado é a hash da senha. Como a hash não tem caminho inverso, é seguro guardar somente ela.
    [this.sal, this.hash] = criarHashComSal(senha).split(":");
  }

  autenticar(nome, senha) {
    if (nome === this.nome) {
      // Cria uma nova hash com
      const testeHash = scryptSync(senha, this.sal, 64);
      // Pega o hash real do buffer
      const hashReal = Buffer.from(this.hash, "hex");

      // Checa se correspondem
      // timingSafeEqual ->
      const hashesCorrespondem = timingSafeEqual(testeHash, hashReal);

      if (hashesCorrespondem) {
        console.log("Autenticado!");
        return true;
      }
    }
    console.log("Usuário ou senha incorretos.");
    return false;
  }
}

const usuario = new Usuario("Felipe", "senha123");

console.log(usuario);

// Teste de falha:
usuario.autenticar("Felipe", "alo");
// Teste de sucesso:
usuario.autenticar("Felipe", "senha123");
