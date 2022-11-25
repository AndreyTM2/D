const event = async (client, PlayerEvent) => {
    const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
    
        const { title, source, duration, views, url, requestedBy, thumbnail } = PlayerEvent.current,
              { username, discriminator } = requestedBy;
            
              const EmbedData = {
                title: title,
                description: `Música solicitada por : ${username}#${discriminator} | Duração : ${duration}`,
                url: url,
                thumbnail: {
                    url: thumbnail
                },
                author: {
                    name: "・Tocando Agora 🎶",
                    iconURL: requestedBy.displayAvatarURL()
                },
                color: "7419530"
              }
    
            PlayerEvent.metadata.send({embeds: [new EmbedBuilder(EmbedData)]}).then((msg) => {
    
                PlayerEvent.metadata.msgId = msg.id
                PlayerEvent.metadata.PlayerControl = msg
            
                msg.edit({components: [new ActionRowBuilder().addComponents(
                        new ButtonBuilder().setLabel("PARAR").setCustomId("MusicS").setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder().setLabel("PAUSA").setCustomId("MusicP").setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder().setLabel("PULAR").setCustomId("MusicSK").setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder().setLabel("LISTA").setCustomId("MusicLS").setStyle(ButtonStyle.Secondary))]
                    })
            })
    }
    
    module.exports = {
        name: 'trackStart', // Utilizado para criar o evento
        plugin: 'player', // Utilizado para utilizar module externos do discord
        once: false, // Utilizado para dizer ao codigo se é para executar apenas uma vez ou repetir
    
        Executar: event // Obj que vai ser executado para ser o Evento 
    }