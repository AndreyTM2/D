const { MessageEmbed } = require("discord.js")

const embed = new MessageEmbed().setTitle('Limpeza do chat concluida');
module.exports = {
    name: 'clear',
    description: "view me ping",
    usage: 'ping',
    run: async(client, message, args ) => {

        const amount = args[0]
        ? args.join(" ")
        : 100

        const Int = Math.round(amount)

        if (!message.member.permissions.has('MANAGE_MESSAGES', 'MANAGE_CHANNELS')) {
            return message.channel.send("Você não tem autoridade para isso.")
        }
        if(isNaN(Int)) return message.channel.send(`Enviei um numero valido!!`)
        if(Int > 1000 || Int < 2) return message.channel.send(`❕ | <@${message.author.id}> Eu só consigo limpar entre 2 até 1000 mensagens passadas!`)
        if(message.content) message.delete()
        let Limpad
        message.channel.permissionOverwrites.edit(message.guild.id, {VIEW_CHANNEL: true,SEND_MESSAGES: false,READ_MESSAGE_HISTORY: true}).then(async()=> {
            function Limpar(Limpada, check, complete) {

                if(check === 1){
                    const limpo = new MessageEmbed().setTitle('CHAT LIMPO')
                     return message.channel.send({embeds: [limpo]}).then(() => {
                        message.channel.permissionOverwrites.edit(message.guild.id, {VIEW_CHANNEL: true,SEND_MESSAGES: true,READ_MESSAGE_HISTORY: true})
                     })
                } 
                message.channel.bulkDelete(Limpada, true).then(async (msg) => {
                    Limpad = complete
                    if(Limpad > 100){
                        if(msg.size <= 1) return Limpar(0, 1 ,0)
                        Limpad = Limpad - 100
                        return await Limpar(100, 0 , Limpad)
                    } else if(Limpad < 100){
                        return await Limpar(Limpad, 1)
                    } else return await Limpar(0, 1 ,0)
                })
            }
            if(Int > 100) return await Limpar(100, 0 , Int)
            else if(Int <= 100) {
                message.channel.bulkDelete(Int, true).then(async() => {
                    const limpo = new MessageEmbed().setTitle('CHAT LIMPO')
                     return message.channel.send({embeds: [limpo]}).then(() => {
                        message.channel.permissionOverwrites.edit(message.guild.id, {VIEW_CHANNEL: true,SEND_MESSAGES: true,READ_MESSAGE_HISTORY: true})
                     })
                })
            }
        })

    }
}