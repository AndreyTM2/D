async function UpdateEmbed(interaction) {
    const filtrard = await interaction.guild.channels.cache.map((d) => d);

    let GAMEPASS = filtrard.filter(p => p?.topic?.includes('GAMEPASS') && p.name.includes('-gamepass')).length
    let ROBUX = filtrard.filter(p => p?.topic?.includes('ROBUX') && p?.name.includes('-robux')).length
    let SUPORTE = filtrard.filter(p => p?.topic?.includes('SUPORTE') && p?.name.includes('-suporte')).length
            
                return Abertos = GAMEPASS + ROBUX + SUPORTE
}

async function Media(numbers) {
    var soma = 0;

for (let i = 0; i < numbers.length; i++) {
    soma = soma + Number(numbers[i])
}

var media = soma / numbers.length
let mediaa = `${media}`
if(!media) return '0'
return mediaa.slice(0, 3)
}

module.exports = async(interaction, client) => {
    const channel = client.channels.cache.get(interaction.channelId)
    let filtrar = [{topic : channel.topic}]
    if(filtrar.filter(p => p.topic.includes(interaction.user.id + ' '))){
        interaction.reply({ content: "Antes de fechar o ticket poderia avaliar nossa equipe de atendimento com uma nota entre 1 a 10, baseado com o atendimento.", ephemeral: true}).then(async(msg) => {
            interaction.message.components[0].components[0].setDisabled(true)
            interaction.message.components[0].components[1].setDisabled(true)
            await interaction.message.edit({components: [interaction.message.components[0]]})
            const filter = m => m.author.id === interaction.member.user.id
            const collector = interaction.channel.createMessageCollector({filter, time: (32000)});

            collector.on('collect', async (i) => {
                if(isNaN(i.content)) return i.channel.send('Favor enviei apenas numero na sua avaliacao');
                const number = new Number(i.content);
                if(number > 10) return i.channel.send('Enviei uma nota até 10');
                else if(number < 1) return i.channel.send('Enviei uma nota superior a 1 ou igual a 1');
                const settings = await client.SettingsExtras.get(i.guild.id)    
                const numbers = settings.Avaliacoes.map(numbs => numbs)
                numbers[numbers.length] = i.content
                client.SettingsExtras.set(i.guild.id, numbers , 'Avaliacoes');
                return i.channel.send('Obrigado pela sua avaliação, nossa equipe agradece muito').then(() => {
                    collector?.stop()
                })
            })

            collector.on('end', async (collected, reason) => {
                const settings = await client.SettingsExtras.get(interaction.guild.id)    
                let channel = await interaction.guild.channels.cache.get(settings.ChannelIDTicket)
                let message = await channel.messages.fetch(settings.MessageIDTicket)
                                
                if(reason === 'user') return setTimeout(() => {interaction.channel.delete().then(async() => {
                    message.embeds[0].fields[0].value = `📨 Abertos: ${await UpdateEmbed(interaction)}\n📫 Totais: ${settings.TotalTicket}`
                    message.embeds[0].fields[1].value = `Total de avaliações: ${settings.Avaliacoes.length} 🏅\nNota média: ${await Media(settings.Avaliacoes)} ⭐`
                    return message?.edit({embeds: [message.embeds[0]]})
                })}, 2500);
                if(reason === 'time') return interaction.channel.send('Seu tempo de avaliar nosso atendimento acabou, fechando o ticket').then(() => {setTimeout(() => {interaction.channel.delete().then(async() => {
                    message.embeds[0].fields[0].value = `📨 Abertos: ${await UpdateEmbed(interaction)}\n📫 Totais: ${settings.TotalTicket}`
                    message.embeds[0].fields[1].value = `Total de avaliações: ${settings.Avaliacoes.length} 🏅\nNota média: ${await Media(settings.Avaliacoes)} ⭐`
                    return message.edit({embeds: [message.embeds[0]]})
                })}, 3500); })
            });
        })
    }else {
        if (!interaction.member.permissions.has('MANAGE_MESSAGES', 'MANAGE_CHANNELS')) {
            return interaction.channel.send("Você não tem autoridade para isso.")
        }
        interaction.deferUpdate()
        interaction.channel.send(`Deletando ticket...`).then(async () => {
            const settings = await client.SettingsExtras.get(interaction.guild.id)    
                let channel = await interaction.guild.channels.cache.get(settings.ChannelIDTicket)
                let message = await channel.messages.fetch(settings.MessageIDTicket)

            setTimeout(() => {channel.delete().then(async() => {
                    message.embeds[0].fields[0].value = `📨 Abertos: ${await UpdateEmbed(interaction)}\n📫 Totais: ${settings.TotalTicket}`
                    message.embeds[0].fields[1].value = `Total de avaliações: ${settings.Avaliacoes.length} 🏅\nNota média: ${await Media(settings.Avaliacoes)} ⭐`
                    return message.edit({embeds: [message.embeds[0]]})
            })}, 5000);
        })
    }
}