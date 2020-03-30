const express = require('express');

//cors é um modulo de segurança
const cors = require('cors');

//importando o routes na mesma pasta
//usar ../ para voltar uma pasta
// user o "./" para indicar que está importando um arquivo, não um pacote como o express 
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);

