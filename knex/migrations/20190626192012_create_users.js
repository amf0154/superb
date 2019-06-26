
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(t) {
        t.increments('id').unsigned().primary();
        t.string('name').notNull();
        t.string('email').notNull();
        t.string('role').notNull();
        t.dateTime('createdAt').defaultTo(knex.fn.now());
        t.text('note').nullable();
    //    t.enum('category', ['apparel', 'electronics', 'furniture']).notNull();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};

