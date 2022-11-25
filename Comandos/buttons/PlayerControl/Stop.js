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
   
   await interaction.message.edit({components: []});

   return queue[0].stop();
}

module.exports = {
    name: "MusicS",
    run: executar,
 };