const {MessageEmbed, MessageActionRow, MessageButton} =
require('discord.js')
const Axios =
require('../../../Archives-Extras/Axios')
const {Options , GetImage, Delete, GetCopyAndPaste} =
require('./Extras/Gen')
const link = 'https://th.bing.com/th/id/OIP.PmoZx5WxvkmN9AC4S3jGjQHaHa?pid=ImgDet&rs=1'
const format = new Intl.NumberFormat('pt-br', {style: 'currency',currency: 'BRL', currencyDisplay: 'code'})
module.exports = {
    name: 'pix',
    description: "view me ping",
    usage: 'pix',
    run: async(client, message, args ) => {
        const dataBase = await client.SettingsExtras.get(`${message.guild.id}-${message.author.id}`);
        if(dataBase.PixURL === undefined) return message.channel.send('Acess_Token Mercado Pago não setado')
        if(args[0] > 1000000) return message.channel.send('Valor muito alto...')
        if(args[0] < 0.01) return message.channel.send('Valor muito baixo...')
        let Chein = 'checkOff'
        const servidor = await Axios(dataBase.PixURL)
        const user = message.mentions.members.first();
        const EmbedH = new MessageEmbed().setAuthor({name: 'Pix Invalid' ,iconURL: link}).setDescription(`Caso queira tentar resolver eu recomendo tu tentar escreve o comando novamente mas seguindo esses exemplo.\n\n__**Exemplo**__ __**1**__: !pix valor user\n__**Exemplo**__ __**2**__: !pix 10.5 <@${client.user.id}>`).setTitle('Ocorreu um erro...').setFooter({text: 'Se acaso não conseguir utilizar, chame um moderador do bot', iconURL: 'https://media.tenor.com/images/d2110c50a22020900743aaad39091499/tenor.gif'})
        EmbedH.setColor('WHITE')
        const Button = new MessageActionRow().addComponents(new MessageButton().setCustomId('pix').setLabel('QR CODE').setStyle('SUCCESS'), new MessageButton().setCustomId('copiarc').setLabel('COPIAR E COLAR').setStyle('SUCCESS'), new MessageButton().setCustomId('calpix').setLabel('CANCELAR').setStyle('SUCCESS'))
        if(isNaN(args[0]) || !args[0] || !user) return message.channel.send({embeds: [EmbedH]})
        let Pagament;
        try {
            Pagament = await servidor.post('/v1/payments', await Options(client, message, args, user))
        } catch (error) {
            return message.channel.send('Ocorreu um erro, talvez sua acess_token expirou ou é invalida')
        }
        const EmbedP = new MessageEmbed().setAuthor({name: 'Pix gerado!',iconURL: link}).setDescription(`Para facilitar a sua vida a equipe da **${message.guild.name}** gerou um card de pagamento.\nPague com o pix para receber seu produto, se acaso não queira essa forma de pagamento ou não quer o produto favor cancelar.`).setFields({name: 'Comprador/Vendedor', value : `> **Comprador:** __**${user}**__\n> **Vendedor:** __**<@${message.author.id}>**__`, inline: true}, {name: 'Valor', value: `**Valor:** __**${format.format(args[0])}**__`, inline: true}, {name: 'Status do pagamento', value: '> **Status:** __**Pendente**__', inline: true})
        if(message.content) message.delete()
        EmbedP.setColor('WHITE')
        message.channel.send({embeds: [EmbedP]}).then( async (msg) => {
            msg.edit({embeds: [EmbedP], components: [Button]}).then(() => {

                const collector = msg.channel.createMessageComponentCollector({ componentType: "BUTTON"});

                collector.on('collect', async (i) => {
                    if(i.user.id === user.id || i.member.permissions.has('ADMINISTRATOR')){
                        if(i.customId === 'calpix'){
                            await servidor.put(`/v1/payments/${Pagament.data.id}`, await Delete(client, message, args))
                            i.message.embeds[0].author.name = 'Pix Cancelado!'
                            i.message.embeds[0].author.iconURL = 'https://media.discordapp.net/attachments/976662780780380181/992263016533991434/920679492438089740.gif'
                            i.message.embeds[0].fields[2].value = '> **Status:** __**Cancelado**__';
                            Chein = 'checkOff'
                            collector.stop()
                            return i.message.edit({embeds: [i.message.embeds[0]], components: []}).then((m) => {setTimeout(() => {m.delete()}, 15000);})
                        }else if(i.customId === 'pix' || i.customId === 'copiarc'){
                            if(i.customId === 'pix'){
                                i.reply({files: [await GetImage(Pagament)], ephemeral: true});
                                if(Chein == 'checkOff') return Check(Pagament.data.id);
                                else return 
                            }else {
                                i.reply({content: `${await GetCopyAndPaste(Pagament)}`, ephemeral: true});
                                if(Chein == 'checkOff') return Check(Pagament.data.id);
                                else return 
                            }

                            async function Check(id) {
                                Chein = 'checkOn'
                                let status = await servidor.get(`/v1/payments/${id}`)
                                setTimeout(() => {
                                    if(status.data.status === 'pending') return Check(id)
                                    else if(status.data.status === 'approved'){
                                        collector.stop();
                                        i.message.embeds[0].author.name = 'Pix Aprovado!'
                                        i.message.embeds[0].author.iconURL = 'https://cdn.discordapp.com/attachments/976662780780380181/992272234808885319/955067267270443018.gif'
                                        i.message.embeds[0].fields[2].value = '> **Status:** __**Aprovado**__';
                                        return i.message.edit({embeds: [i.message.embeds[0]], components: []})
                                    }}, 500)}}}})})})}}