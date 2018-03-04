const knex = require('knex');
const config = require('./knexfile');

const _knex = knex(config.development).on('query', data => console.log(data.sql));

module.exports = tableName => {
  return class Model {
    static get all() {
      return _knex(tableName);
    }

    static async find(id) {
      return (await Model.all.where('id', id))[0];
    }

    static async findBy(condition) {
      return (await Model.all.where(condition))[0];
    }
  }
}
