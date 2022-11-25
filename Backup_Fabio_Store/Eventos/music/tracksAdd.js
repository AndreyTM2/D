const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = async(client) => {
client.player.on('tracksAdd', async (queue) => {

    const embed_1 = new MessageEmbed()
    queue.tracks.map((t) => `${embed_1.setTitle('Em espera').setDescription(`${t.playlist.title} foi adicionado com ${t.playlist.tracks.length} musicas!\n\nMúsica solicitada por : ${t.requestedBy.username}`)}`)

    return client.channels.cache.get(client.channelId).send({embeds: [embed_1]})
})
}