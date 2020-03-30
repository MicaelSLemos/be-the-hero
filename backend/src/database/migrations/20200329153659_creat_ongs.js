//o que eu quero que seja feito/criado
exports.up = function(knex) {
    return knex.schema.createTable('ongs', function (table){
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('UF', 2).notNullable();

    });
  
};

//para desfazer o que foi feito pelo métido UP
exports.down = function(knex) {
    return knex.schema.dropTable('ongs');
};
