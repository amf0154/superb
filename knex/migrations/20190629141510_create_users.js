
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(t) {
        t.increments('id').unsigned().primary();
        t.string('name');
        t.string('email').unique().notNull();
        t.integer('role_id').references('roles.id').defaultTo(1);
        t.dateTime('createdAt').defaultTo(knex.fn.now());
        t.text('note').nullable();
        t.string('salt').notNull();
        t.string('hash').notNull();
    })
}

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};


