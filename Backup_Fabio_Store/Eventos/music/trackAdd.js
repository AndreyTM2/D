const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = async(client) => {
    client.player.on('trackAdd', async (queue) => {
        if(!queue.playing) return

        const embed_ = new MessageEmbed()
        queue.tracks.map((t) => `${embed_.setTitle('Na Fila').setDescription(`A Musica ${t.title} foi adicionado a fila de musicas!\n\nMúsica solicitada por : ${t.requestedBy.username}`)}`)

        return client.channels.cache.get(client.channelId).send({embeds: [embed_]})})
}