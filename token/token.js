import jwt from "jsonwebtoken";

const chaveSecreta = "chaveSuperSecreta";

// Criar um token
const token = jwt.sign(
  {
    nome: "felipe",
    sobrenome: "pepe",
  },
  chaveSecreta
);

console.log(token); // Conseguimos observar a string com a separação dos pontos, no formato do JWT

// Decodificar o token
const tokenDecodificado = jwt.verify(token, chaveSecreta);

console.log(tokenDecodificado); // Podemos observar como foi adicionado a propriedade iat (data de instancia), seguindo o padrão do JWT
