module.exports = async(client, interaction) => {
    
    let role = '950450097123115018'

    const {MessageEmbed, MessageActionRow, MessageButton, PartialWebhookMixin} = require("discord.js")

    const {ChannelIDTicket, MessageIDTicket, TotalTicket, Avaliacoes} = await client.SettingsExtras.get(interaction.guild.id)

    const EmbedFail = new MessageEmbed().setAuthor({name: "Ticket's - Sistema Danificado", iconURL: `${interaction.guild.iconURL({ dynamic: true })}`}).setTitle('Fale com um administrador para realizar a reforma do ticket.\nse acaso você for administrador utilize o comando de ticket e delete essa mensagem')

    if(ChannelIDTicket === undefined && MessageIDTicket === undefined || MessageIDTicket !== interaction.message.id || ChannelIDTicket !== interaction.message.channelId ) return interaction.message.edit({embeds: [EmbedFail], components: []})

    const filtrar = await interaction.guild.channels.cache.map((d) => d);
    let a = filtrar.filter(p => {
        if(p.topic === `${interaction.user.id} ${interaction.customId.toUpperCase()}`) return p
    })

    let c = filtrar.filter(p => p?.topic?.includes(interaction.user.id))

    const comparar_Topic = interaction.guild.channels.cache.map((d) => d.topic);
    if(comparar_Topic.includes(`${interaction.user.id} ${interaction.customId.toUpperCase()}`)) return await interaction.reply({content:`> Você ja tem um ticket aberto! \n\> <#${a[a.length - 1].id}>`, ephemeral: true})
    else if(c.length > 0) return await interaction.reply({content:`> Você ja tem um ticket aberto! \n> <#${c[c.length - 1].id}>\n> Feche antes de abrir um ticket de __**${interaction.customId.toUpperCase()}**__`, ephemeral: true})

    channel = await interaction.guild.channels.create(`${interaction.user.username.toLowerCase()}-${interaction.customId}`, {
    permissionOverwrites: [{id: interaction.guild.id , deny: ['SEND_MESSAGES', 'VIEW_CHANNEL']}]})

    await channel.setParent('966871021460275240')
    await channel.setTopic(`${interaction.user.id} ${interaction.customId.toUpperCase()}`)
    await channel.permissionOverwrites.edit(interaction.guild.id , { VIEW_CHANNEL: false, SEND_MESSAGES: false, });
    await channel.permissionOverwrites.edit(interaction.user.id, { VIEW_CHANNEL: true, SEND_MESSAGES: true, });
    await channel.permissionOverwrites.edit(role, { VIEW_CHANNEL: true, SEND_MESSAGES: true, });
    
    await interaction.reply({content:`Seu ticket foi aberto em <#${channel.id}>`, ephemeral: true})

    let embed = new MessageEmbed()
    .setDescription(`Aqui será seu canal para atendimento <@${interaction.user.id}>, a partir daqui é só aguardar que alguém da nossa equipe já vai entrar em contato. Pode se sentir a vontade para nos dar mais detalhes ou fechar o ticket.`)
    .setAuthor({name: `Ticket's - Sistema de chamados`, iconURL : `${interaction.guild.iconURL({ dynamic: true })}`})
    .setFooter({text : `${client.user.username}#${client.user.discriminator}`, iconURL : `${client.user.displayAvatarURL({ dynamic: true })}`})
    .setTimestamp();
    
    
    const button = new MessageButton()
    .setCustomId('fechar')
    .setLabel('Fechar')
    .setEmoji('❌')
    .setStyle('PRIMARY')
    
    const chamar = new MessageButton()
    .setCustomId('ChamarDm')
    .setLabel('Chamar Funcionario')
    .setEmoji('📢')
    .setStyle('PRIMARY')
    
    let row = new MessageActionRow()
    .addComponents(button, chamar)

    let numbers = TotalTicket + 1
    client.SettingsExtras.set(interaction.guild.id, numbers , 'TotalTicket');

    const filtrard = await interaction.guild.channels.cache.map((d) => d);

    async function Media(numbers) {
        var soma = 0;
    
    for (let i = 0; i < numbers.length; i++) {
        soma = soma + Number(numbers[i])
    }
    
    let media = soma / numbers.length    
    let mediaa = `${media}`
    if(!media) return '0'
    return mediaa.slice(0, 3)
    
    }

    let GAMEPASS = filtrard.filter(p => p?.topic?.includes('GAMEPASS') && p.name.includes('-gamepass')).length
    let ROBUX = filtrard.filter(p => p?.topic?.includes('ROBUX') && p?.name.includes('-robux')).length
    let SUPORTE = filtrard.filter(p => p?.topic?.includes('SUPORTE') && p?.name.includes('-suporte')).length

    let Abertos = GAMEPASS + ROBUX + SUPORTE
    interaction.message.embeds[0].fields[1].value = `Total de avaliações: ${Avaliacoes.length} 🏅\nNota média: ${await Media(Avaliacoes)} ⭐`
    interaction.message.embeds[0].fields[0].value = `📨 Abertos: ${Abertos}\n📫 Totais: ${client.SettingsExtras.get(interaction.guild.id).TotalTicket}`
    interaction.message.edit({embeds: [interaction.message.embeds[0]]})
    
    channel.send({embeds: [embed], components : [row]})
}