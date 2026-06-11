import { fastify } from 'fastify'
import { DatabaseMYSQL } from './database-mysql.js'
import 'dotenv/config';
const { PORT } = process.env;

console.log('Variáveis de ambiente carregadas:', { PORT });

const server = fastify();

server.get('/', async (request, reply) => {
  return { message: 'API server - Gestor de cosmedica' };
});



// Criando uma instância da classe DatabaseMYSQL para
// interagir com o banco de dados
const database = new DatabaseMYSQL();


// Rota para criar um novo vídeo, recebendo os dados no corpo
// da requisição e usando o método create do database
server.post("/cosmedica", async (request, reply) => {
  const { nome, description, price } = request.body;
  await database.create({
    nome,
    description,
    price
  });
  console.log(await database.list());
  return reply.status(201).send();
})

// Rota para listar os vídeos, com opção de busca por título
// usando query string e o método list do database
server.get("/cosmedica", async (request) => {
  const search = request.query.search;
  console.log(search);
  const cosmedica = await database.list(search);
  return cosmedica
})

// Rota para atualizar um vídeo específico, recebendo o ID
// na URL e os dados no corpo da requisição
server.put("/cosmedica/:id", async (request, reply) => {

  const cosmedicaId = request.params.id;
  const { nome, description, price } = request.body;

  const video = await database.update(cosmedicaId, {
    nome,
    description,
    price,
  });
  return reply.status(204).send();
});
// Rota para excluir um vídeo específico, recebendo o ID na
// URL e usando o método delete do database
server.delete('/cosmedica/:id', async (request, reply) => {
  const cosmedicaId = request.params.id;
  await database.delete(cosmedicaId);
  return reply.status(204).send();
})

server.listen({port: PORT}, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Servidor rodando em ${address}`);
});