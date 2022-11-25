const { Schema, model } = require('mongoose')

const BackupData = new Schema({
    _id: String,
    Usuarios: Array,
    Guilds: Array
})

module.exports = { 
    DataBase: model('Backup', BackupData) 
}

