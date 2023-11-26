import { createHash } from "crypto";

// Supomos que essas hashes vazaram do sistema
const hashesVazadas = [
  "21232f297a57a5a743894a0e4a801fc3",
  "cedf5ab7b5c5852b3ed35d7dbe3c3835",
  "81dc9bdb52d04dc20036dbd8313ed055",
];

// --- ATAQUE ---

function criarHash(dado, estrategia) {
  return createHash(estrategia).update(dado).digest("hex");
}

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

// O atacante varre senhas comuns e cria hashes delas
// Estamos chutando que é MD5 pela cara das hashes vazadas
const rainbowTable = senhasComuns.map((senha) => {
  return [senha, criarHash(senha, "MD5")];
});

console.log(rainbowTable);

hashesVazadas.map((hashVazada) => {
  rainbowTable.map((parGerado) => {
    if (hashVazada === parGerado[1]) {
      console.log(`A senha é ${parGerado[0]}`);
    }
  });
});
