var crypto = require('crypto');
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      const salt = crypto.randomBytes(16).toString('hex');
      const password = 'Argentum_951';
      return knex('users').insert([
        {
          name: "admin",
          email: "admin@gmail.com",
          role: "admin",
          note: "test note",
          salt: salt,
          hash: crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
      }
      ]);
    });
};
