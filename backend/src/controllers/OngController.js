//importar o arquivo "connection", que faz a conexão com o banco de dados
const connection = require('../database/connection');

//pacote que exite no node para criar o id incremental da ong
const crypto = require('crypto');

module.exports = {
    async index (request, response) {
        const ongs = await connection ('ongs').select('*');

        return response.json(ongs);
    },

    async  create (request, response) {
        //desestruturação para pegar cada dado em uma variável separada, e não permitir que o usário
        //insira dados que eu não queria pegar
        const {name, email, whatsapp, city, uf} = request.body;

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
        return response.json({ id });
    }

};