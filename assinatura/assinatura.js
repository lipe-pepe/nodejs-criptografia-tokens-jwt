import { generateKeyPairSync, createSign, createVerify } from "crypto";

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

let dados = "Essa string vai ser assinada.";

// ---- Assinatura ----

const assinador = createSign("rsa-sha256");
assinador.update(dados);

// passamos pro assinador a chave privada e ele nos retorna a assinatura
const assinatura = assinador.sign(privateKey, "hex");
console.log(`Assinatura: ${assinatura}`);

// Teste do Intermediário - alguém pegou o dado e mudou a informação do documento. Vamos fazer esse teste pra ver o que acontece nesse cenário.
// A validação não vai ocorrer. Descomentar para testar.
// dados += "alteracao";

// ---- Envio do documento para um terceiro ----
//  (ele receberá o documento, assinatura e chave pública) que vai verificar os dados

const verificador = createVerify("rsa-sha256");
verificador.update(dados);

// Verifica se o documento corresponde aos dados
const verificado = verificador.verify(publicKey, assinatura, "hex");
console.log(`Verificado: ${verificado}`);
