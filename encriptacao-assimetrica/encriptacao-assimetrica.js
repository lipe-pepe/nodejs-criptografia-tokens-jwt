import { generateKeyPairSync } from "crypto";

// 'rsa' -> algoritmo de encriptacao utilizado para gerar par de chaves
// O segundo parametro é um objeto usado para configurar. Não precisa saber dele, ele está na documentação do método.
const { privateKey, publicKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,

  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
  },
});

// console.log(publicKey);
// console.log(privateKey);

// ---------------------------------

import { publicEncrypt, privateDecrypt } from "crypto";

const dadosCriptografados = publicEncrypt(
  publicKey,
  Buffer.from("Mensagem ultra secreta")
);

console.log(dadosCriptografados.toString("hex"));

// TRANSMISSAO -------------

const dadosDecifrados = privateDecrypt(privateKey, dadosCriptografados);

console.log(`Dados decifrados: ${dadosDecifrados.toString("utf-8")}`);
