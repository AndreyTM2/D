const {MessageEmbed} =
require('discord.js')
module.exports = {
    name: 'ping',
    description: "view me ping",
    usage: 'ping',
    run: async(client, message, args ) => {
        const res = await client.shard
        
        const embed = new MessageEmbed()
        .setDescription('🖥️  ・・・・・・・・・・・・・・・ 🖥️')
        .setFields({
            name: 'Ping (ms)', value: `**${client.ws.ping}**`, inline: true
        },{
            name: 'Shard (id)', value: `**${res.ids[0] + 1}**`, inline: true
        },{
            name: 'Total Shard', value: `**${res.count}**`, inline: true
        })

        embed.setColor('WHITE')

        message.channel.send({embeds: [embed]})
    }
}