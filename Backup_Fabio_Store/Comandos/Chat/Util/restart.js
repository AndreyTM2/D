module.exports = {
    name : 'restart',
    usage: 'restart',
    run: async (client, message, args) => {

        if (!message.member.permissions.has('ADMINISTRATOR') || !client.owner.includes(message.author.id) ) return message.reply ('Você não tem autoridade para isso kkkkkk.')

        await client.SettingsExtras.delete(message.guild.id)        
        client.SettingsExtras.ensure(`${message.guild.id}`, {
            Name: 'Andrey Gostoso',
            TotalTicket: 0,
            Avaliacoes: [],
            ChannelIDTicket: undefined,
            MessageIDTicket: undefined,
            Prefix : '!',
            Produtos : {index : [{"title":"Title Lindão","tamanho":"0","description":`use o cmd produtosset`,}]}
          });

        message.channel.send('DataBase Resetada para as configurações de fabrica').then(async() => {
            await console.clear()
        })
    }
}