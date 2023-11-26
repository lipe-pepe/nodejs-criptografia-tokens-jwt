import { createCipheriv, randomBytes, createDecipheriv } from "crypto";

const mensagem = "demonstracao do curso";

// Chave aleatoria usada para encriptar, que será compartilhada com a pessoa que quer decriptar a mensagem
const chave = randomBytes(32);

const vetorInicializacao = randomBytes(16);

// Cria a cifra
const cifra = createCipheriv("aes256", chave, vetorInicializacao);
// Cifra a mensagem
// 'utf-8' -> codificação em que a mensagem está
// 'hex' -> como a cifra deve ser representada depois
// Somamos o cifra.final para incluir o caracter que demonstra o fim da mensagem cifrada
const mensagemCifrada =
  cifra.update(mensagem, "utf-8", "hex") + cifra.final("hex");

console.log(mensagemCifrada);

// TRANSMISSAO ---------------------- chave, vetorInicializacao, mensagem

// Decifrar a mensagem

const decifra = createDecipheriv("aes256", chave, vetorInicializacao);
const mensagemDecifrada =
  decifra.update(mensagemCifrada, "hex", "utf-8") + decifra.final("utf-8");

console.log(mensagemDecifrada);
