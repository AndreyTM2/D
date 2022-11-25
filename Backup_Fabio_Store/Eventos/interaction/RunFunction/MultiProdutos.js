const {MessageEmbed, MessageButton, MessageActionRow, MessageAttachment} = require('discord.js')

module.exports = async(interaction, client) => {

    const settings = await client.SettingsExtras.get(interaction.guild.id)    

   let embed_
   let filterPro = [];
   let embeds = [];
      
   for (let index = 0; index < settings.Produtos.index.length ; index++) {
    if(!filterPro.includes(settings.Produtos.index[index])){ filterPro.push(settings.Produtos.index[index])} 
}
let filterE = filterPro.filter(p => p.tamanho.includes(interaction.customId))
for (let index = 1; index < settings.Produtos.index.length; index++) {
    const checkin = new MessageEmbed().setTitle(settings.Produtos.index[index].title).setDescription(settings.Produtos.index[index].description)
    if(!embeds.includes(checkin)){embeds.push(checkin)}}
    embed_ = embeds.filter(p => p.title.includes(filterE[0]?.title))
    let embed = new MessageEmbed().setColor('WHITE')
    if(filterE[0].TitleType === '1'){embed.setDescription(embed_[0].description)}
    else{embed.setTitle(embed_[0].title).setDescription(embed_[0].description)}
    
    return await interaction.reply({embeds: [embed], ephemeral: true}).then(async(d) => {
       filterPro = null
       embeds = null
       filterE = null
       embed_ = null
       embed = null
   }) 
}