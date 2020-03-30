//importando o express
const express = require('express');

//importando o OngController e Incident Controller
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

//desacoplando o módulo de rotas do express
const routes = express.Router();

routes.post('/sessions', SessionController.create);

//Rotas de ongs
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

//Rotas de Casos
routes.post('/incidents', IncidentController.create);
routes.get('/incidents', IncidentController.index);
routes.delete('/incidents/:id', IncidentController.delete);


//exportando uma variável de dentro de um arquivo modulo
module.exports = routes;