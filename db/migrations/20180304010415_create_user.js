'use strict';

const TABLE_NAME = 'users';

exports.up = async (knex, Promise) => {
  const result = await knex.schema.hasTable(TABLE_NAME).then(r => r);

  if (result) {
    return new Error("The table already exists");
  }

  return knex.schema.createTable(TABLE_NAME, t => {
    t.increments('id').primary();
    t.string('name', 100);
  });
};

exports.down = async (knex, Promise) => {
  const result = await knex.schema.hasTable(TABLE_NAME).then(r => r);
  if (!result) return;
  return knex.schema.dropTable(TABLE_NAME);
};
