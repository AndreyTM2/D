module.exports = async(client) => {
    client.on("guildCreate", async (guild) => {
        client.SettingsExtras.ensure(`${guild.id}`, {
            Name: 'Andrey Gostoso',
            TotalTicket: 0,
            Avaliacoes: [],
            ChannelIDTicket: undefined,
            MessageIDTicket: undefined,
            Prefix : '!',
            Produtos : {index : [{"title":"Title Lindão","tamanho":"0","description":`use o cmd produtosset`,}]}
        });
        console.log(`Database criada...\nServidor: ${guild.name} / ${guild.id}, Dono: ${guild.ownerId}`)
    })

    client.on('guildDelete', async (guild) => {
        client.SettingsExtras.delete(guild.id);
        console.log(`Database Deletada...\nServidor: ${guild.name} / ${guild.id}, Dono: ${guild.ownerId}`)
    })
}