const Model = require('../connection')('users');

class User extends Model {}

module.exports = User;