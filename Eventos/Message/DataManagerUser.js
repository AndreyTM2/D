const event = async (client, message) => {
    if(message?.author.bot || !message?.guildId || client.reload) return

    let key = message.author.id,
        DataGuild = client.DataBase.localStorage.Usuarios.get(key);

    if(!DataGuild) await CreateDataUser(client, key, message, DataGuild);

    let DataUnv = client.DataBase.localStorage.Usuarios.get(key)

}

function CreateDataUser(client, key, message, DataGuild) {

    if(!DataGuild) client.DataBase.localStorage.Usuarios.ensure(key, {
        Usuario: {
            Id: message.author.id,
            DataCreateIn: new Date().toLocaleTimeString('pt-br')
        },
        Guilds: {
            [message.guild.id]: {
                    Id: message.author.id,
                    UsurCreateData: new Date().toLocaleTimeString('pt-br')
            }
        }
    });

    return true
}

module.exports = {
    name: 'messageCreate', // Utilizado para criar o evento
    plugin: '', // Utilizado para utilizar module externos do discord
    once: false, // Utilizado para dizer ao codigo se é para executar apenas uma vez ou repetir

    Executar: event, // Obj que vai ser executado para ser o Evento 
}