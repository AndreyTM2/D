const event = async (client, guild) => {
    CreateData(client, guild);    
}

const CreateData = async (client, guild) => {
    let key = guild.id;
    
    client.DataBase.localStorage.Servidores.ensure(key, {
        Prefix : "!",
        id: guild.id
    });


    return true 
}

module.exports = {
    name: 'guildCreate', // Utilizado para criar o evento
    plugin: '', // Utilizado para utilizar module externos do discord
    once: false, // Utilizado para dizer ao codigo se é para executar apenas uma vez ou repetir

    Executar: event, // Obj que vai ser executado para ser o Evento 

    GuildCreate: CreateData
}