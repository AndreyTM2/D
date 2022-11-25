const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
let firstMsgB,
    collectorB;

async function Collector(embed_ ,Music_Messagem, queue, row,  COLOR) {
        const filter = m => {
            if(m.customId !== 'list'){ m.deferUpdate()}
            return m.member?.voice?.channel?.id === Music_Messagem.guild.me?.voice?.channelId
        }

        const collector = await Music_Messagem.channel.createMessageComponentCollector({ filter, componentType: "BUTTON"});
        
        firstMsgB = Music_Messagem
        collectorB = collector

        collector.on('collect', async (i) => {
            if(i.message.id !== Music_Messagem.id) return i.message.edit({components : []})
            if(!queue.playing) return 

            if(i.customId === 'stop') {
                await i.message.edit({components: []})
                return queue.destroy();
            }else if(i.customId === 'pause') {
                if(queue.connection.paused === false){
                    row.components[1].setLabel("REPRODUZIR")
                    await queue.setPaused(true);
                    await i.message.edit({embeds: [embed_], components: [row]})
                }else{
                    row.components[1].setLabel("PAUSA");
                    await queue.setPaused(false);
                    await i.message.edit({embeds: [embed_], components: [row]})
                }
            }else if(i.customId === 'skip') {
                await i.message.edit({components: []})
                if(queue.connection.paused === false){
                    return queue.skip();
                }else {
                    await queue.setPaused(false);
                    return queue.skip();
                }
            }else if(i.customId === 'list') {
                const embed = new MessageEmbed();
                const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} `);
                const songs = queue.tracks.length;
                if(songs > 0) {
                    const nextSongs = songs > 5 ? `E **${songs - 5}** outras musicas...` : `Na lista de reprodução **${songs}** Musica...`;
                    embed.setDescription(`Tocando Agora ${queue.current.title}\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`);
                }else embed.setDescription(`Tocando Agora ${queue.current.title}`);
                return await i.reply({ embeds: [embed], ephemeral: true});                    
            }
        });
}

const row = new MessageActionRow().addComponents(
    new MessageButton().setLabel("PARAR").setCustomId("stop").setStyle("DANGER"),
    new MessageButton().setLabel("PAUSA").setCustomId("pause").setStyle("SECONDARY"),
    new MessageButton().setLabel("PULAR").setCustomId("skip").setStyle("SECONDARY"),
    new MessageButton().setLabel("LISTA").setCustomId("list").setStyle("SECONDARY"),)

module.exports = async (client) => {
    let queue;

    client.player.on('trackStart', async () => { 
        queue = client.player.getQueue(client.guildID);
        let UR1L = ({title: queue.current.title,url: queue.current.url,thumbnail: `https://img.youtube.com/vi/${queue.current?.raw?.id}/hqdefault.jpg` ,request : queue.current.requestedBy.username,time : queue.current.duration, })
        const embed = new MessageEmbed()
        .setTitle(`${UR1L.title}`).setDescription(`Música solicitada por : ${UR1L.request} | Duração : ${UR1L.time}`).setURL(`${UR1L.url}`).setThumbnail(`${UR1L.thumbnail}`);
        const channel = client.channels.cache.get(client.channelId)
        let msg = await channel.send({embeds: [embed], components: [row]})
        return Collector(embed , msg, queue, row)
    })

    client.player.on('trackEnd', async () => {
        await firstMsgB.edit({components: []})
        await row.components[1].setLabel("PAUSA");
        return collectorB.stop()
    })  

    }