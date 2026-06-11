import { sql } from "./db.js"; //Importa a conexao com o banco de dados MySQL

const createTableQuery = `
CREATE TABLE IF NOT EXISTS cosmedica (
id VARCHAR(255) PRIMARY KEY,
Nome VARCHAR(255),
description TEXT,
price INT
);
`;// Define a consulta SQL para criar a tabela "cosmedica" se ela nao existir

// O mysql2 usa o método .query() que retorna uma Promise
sql.query(createTableQuery)
.then(() => {
console. log("Tabela 'Cosmedica' criada ou ja existente com sucesso no MySQL");
})
.catch((err) => {
console.error("Erro ao criar a tabela no MySQL:");
console.error(err.message);
});