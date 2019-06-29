
exports.up = function(knex) {
    return knex.schema.createTable('roles', function(t) {
        t.increments('id').primary();
        t.string('role').notNull();
    }).then(() =>
    {
        return knex('roles').insert([
            {
                role: "user"
            },
            {
                role: "admin"
            },
            {
                role: "moderator"
            },                          
        ])
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('roles');
};
