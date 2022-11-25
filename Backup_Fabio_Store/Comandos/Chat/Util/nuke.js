const {MessageEmbed} =
require('discord.js')
module.exports = {
    name: 'nuke',
    description: "view me ping",
    usage: 'nuke',
    run: async(client, message, args ) => {

        if (!message.member.permissions.has('MANAGE_MESSAGES', 'MANAGE_CHANNELS')) {
            return message.channel.send("Você não tem autoridade para isso.")
        }
        message.channel.clone().then((ch) => {
            message.channel.delete();

            ch.setParent(message.channel.parent?.id);
            ch.setPosition(message.channel?.position);
        })
    }
}