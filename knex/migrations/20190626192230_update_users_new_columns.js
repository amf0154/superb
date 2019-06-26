
exports.up = function(knex, Promise) {
    return knex.schema.table('users', function(t) {
        t.string('salt').notNull();
        t.string('hash').notNull();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('users', function(t) {
        t.dropColumn('salt');
        t.dropColumn('hash');
    });
};
