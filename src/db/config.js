const sqlite3 = require('sqlite3')
const { open } = require('sqlite')


//abrir o banco de dados
module.exports = () =>
open({
    filename: './database.sqlite',
    driver: sqlite3.Database
});