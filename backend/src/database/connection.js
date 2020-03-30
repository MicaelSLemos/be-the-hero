//importando o knex
const knex = require('knex');
//importando as configurações do banco de dados que ficam disponíveis no arquivo knexfile
const configuration = require('../../knexfile');

//criando a conexão com banco, passando como parametro a conexão de desenvolvimento
const connection = knex(configuration.development);

//exportar de dentro deste arquivo a conexão com o banco de dados
module.exports = connection;