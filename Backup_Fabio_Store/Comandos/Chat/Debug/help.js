const {MessageEmbed} =
require('discord.js')
module.exports = {
    name: 'help',
    description: "view me ping",
    usage: 'help',
    run: async(client, message, args ) => {
        message.channel.send('Reformando o cmd')
    }
}