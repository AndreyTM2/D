const event = async (client, PlayerEvent) => {
    const { EmbedBuilder } = require('discord.js');

    if(!PlayerEvent.playing) return 

    const EmbedData = {
        description: undefined,
        author: {
            name: "・Adicionado a Fila🎶",
            iconURL: undefined
        },
        color: "7419530"
      }

      PlayerEvent.tracks.map((t) => `${EmbedData.description = `${t.title} Foi adicionada foi adicionado a fila de musicas!\n\nMúsica solicitada por : ${t.requestedBy.username}`, EmbedData.author.iconURL = `${t.requestedBy.displayAvatarURL()}`}`)  

        PlayerEvent.metadata.send({embeds: [new EmbedBuilder(EmbedData)]})
    }
    
    module.exports = {
        name: 'trackAdd', // Utilizado para criar o evento
        plugin: 'player', // Utilizado para utilizar module externos do discord
        once: false, // Utilizado para dizer ao codigo se é para executar apenas uma vez ou repetir
    
        Executar: event // Obj que vai ser executado para ser o Evento 
    }