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
   
   const tracks = queue[0].tracks.map((track, i) => `**\`\`${i + 1}・${track.title}\`\`**`),
         songs = queue[0].tracks.length,
         embed = new EmbedBuilder();

   if(songs > 0) {
      
      embed.setDescription(`Tocando Agora **\`\`${queue[0].current.title}\`\`**\n\n${tracks.slice(0, 5).join('\n')}`);

      if(songs > 5) embed.data.description += `\n\n + **\`\`${songs - 5} outras musicas\`\`**`

      return await interaction.reply({ embeds: [embed], ephemeral: true});   
   }

   embed.setDescription(`Tocando Agora **\`\`${queue[0].current.title}\`\`**  `);

   return await interaction.reply({ embeds: [embed], ephemeral: true});
}

module.exports = {
    name: "MusicLS",
    run: executar,
 };