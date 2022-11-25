const { MessageButton, MessageEmbed, MessageActionRow } = require("discord.js")

module.exports = {
    name: 'ticket',
    cooldown : 10000,
    usage: 'ticket',
    description: "returns websocket ping",
    run: async(client, message, args ) => {
        
        let array = []

		const index = new MessageEmbed()
        .setAuthor({name: "Ticket's - Sistema de chamadas", iconURL: `${message.guild.iconURL({ dynamic: true })}`})
        .setFooter({text: `${client.user.username}#${client.user.discriminator}`, iconURL: `${client.user.displayAvatarURL({ dynamic: true })}`})
        .addFields(
            { name: 'Tickets:', value: `📨 Abertos: 0\n📫 Totais: 0`, inline: true},
            { name: 'Atendimento:', value: `Total de avaliações: 0 🏅\nNota média: 0 ⭐`, inline: true },
            { name: 'Horário de atendimento:', value: "`⏲ 08:00 as 22:30 (UTC-3)`", inline: true}
        )

                
        const Suporte = new MessageButton()
        .setCustomId('suportef') 
        .setEmoji(`<:balao:972546201037705246>`)
        .setLabel('Suporte')
        .setStyle('SECONDARY')

        const Compras = new MessageButton()
        .setCustomId('compras') 
        .setEmoji(`<:compras:972546162966011934>`)
        .setLabel('Compras')
        .setStyle('SECONDARY')

        const Duvidas = new MessageButton()
        .setCustomId('duvidas') 
        .setEmoji(`<:info:972546220637704302>`)
        .setLabel('Duvidas')
        .setStyle('SECONDARY')
        
        const Robux = new MessageButton()
        .setCustomId('robux')
		.setEmoji(`<:robux:950453053931274311>`)
        .setLabel('Robux')
        .setStyle('SECONDARY')
        
        const Gamepass = new MessageButton()
        .setCustomId('gamepass')
        .setEmoji(`🛄`)
        .setLabel('Gamepass')
        .setStyle('SECONDARY')

        array = [Suporte]

        const row = new MessageActionRow()

        for (let index = 0; index < array.length; index++) {
            const element = array[index];        
            row.addComponents(element)
        }

        let channelid = '950450115540287568'
        let channel = `https://discord.com/channels/${message.guild.id}/${channelid}`
        
        index.setDescription(`Olá, seja bem-vindo a central de atendimento da [__**${message.guild.name}**__](${channel}).\nPara iniciar seu atendimento selecione o tipo de atendimento desejado. Seu atendimento será realizado por meio de um canal privado.`)
	    index.setColor('WHITE')

        if(message.member.permissions.has('ADMINISTRATOR') || client.owner.includes(message.author.id))
        message.channel.send({embeds: [index], components: [row]}).then(async(msg) => {
            client.SettingsExtras.set(message.guild.id, msg.channelId, 'ChannelIDTicket')
            client.SettingsExtras.set(message.guild.id, msg.id, 'MessageIDTicket')
        })
    }
}