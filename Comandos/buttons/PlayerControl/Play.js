const { EmbedBuilder } = require("discord.js");

const executar = async (client, interaction) => {
   
   let queue = client.player.queues.map(m => {
      if(m?.guild?.id === interaction.guildId)
      return m
   })

   if(!queue[0]) return interaction.message.edit({components: []});

   if(queue[0].metadata.msgId !== interaction.message.id) return interaction.message.edit({components: []})

   let bot = await interaction.guild.members.fetch(client.user.id)
   if(interaction.member?.voice.channelId !== bot?.voice.channelId) return


   let row = interaction.message.components[0]

   if(queue[0].connection.paused === false){
    row.components[1].data.label = "REPRODUZIR";
    await queue[0].setPaused(true);
   }else {
    row.components[1].data.label = "PAUSA";
    await queue[0].setPaused(false);
   }

   return interaction.message.edit({components: [row]}).then(() => interaction.deferUpdate())
}

module.exports = {
    name: "MusicP",
    run: executar,
 };