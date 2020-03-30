const connection = require('../database/connection');

module.exports = {

    async index (request, response){
        //buscar dentro do request.query param: que são os parametros  que vem na url separados por "?"
        //se não houver page na url, por default será 1
        const { page = 1} = request.query;

        //contar qtos casos existem no banco
        const [count] = await connection('incidents').count();


        const casos = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        //limitando a 5 casos no select
        .limit(5)
        //pulando de 5 em 5, conforme a página
        //qdo página =1 então 1 -1= 0; 0 * 5 = 0, ou seja, não pula nenhum caso na página 1
        //qdo página =2 então 2 -1= 1, 1 * 5 = 5, ou seja, pula 5 casos e mostra a partir do caso 6
        .offset((page -1) * 5)
        .select(['incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
    ]);

        //devolvendo no header o total de casos contados
        response.header('X-Total-Count', count['count(*)']);

        return response.json(casos);

    },
    async create (request, response){
        const {title, description, value} = request.body;
        //pega o id da ong logada
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },

    async delete (request, response){
        //pegar o id do parâmetro de rotas
        const { id } = request.params;

        //pegar o id da ong logada, para verificar se o incidente pertence a ong que está tentando deletar
        const ong_id = request.headers.authorization;

            //buscar o incidente dentro tab incidents
        const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        //pq eu sei que vai retornar apenas 1 resutlado, pois só pode existir 1 caso com por id
        .first();

        
        if(incident.ong_id != ong_id){
            //http status codes: 401 é "Não autorizado"
            return response.status(401).json({error: 'Operation not permitted. '});
        }

        await connection('incidents').where('id', id).delete();
        //204: devolve uma resposta de sucesso, porém sem conteúdo
        return response.status(204).send();

    },
};