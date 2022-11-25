const {MessageEmbed} =
require('discord.js')
module.exports = {
    name: 'fuck',
    description: "view me ping",
    usage: 'fuck',
    run: async(client, message, args ) => {
        let count = 1

        function d(params) {
            message.channel.send(`Numero - ${count}`)
            setTimeout(() => {
                count++     
                d()           
            }, 350);
        }

        d()

    }
}