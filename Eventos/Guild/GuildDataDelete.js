const event = async (client, guild) => {
    let key = guild.id;
    return client.DataBase.localStorage.Servidores.delete(key);
}

module.exports = {
    name: 'guildDelete', // Utilizado para criar o evento
    plugin: '', // Utilizado para utilizar module externos do discord
    once: false, // Utilizado para dizer ao codigo se é para executar apenas uma vez ou repetir

    Executar: event // Obj que vai ser executado para ser o Evento 
}