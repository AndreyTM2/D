const executar = async(client, message, args ) => {
    
    let channel = message.member.voice.channel,
        limite = 151,
        channelMe = message.guild.me?.voice.channelId,
        YtSearch = args.join(" "),
        guildQueue = client.player.getQueue(message.guild),
        YtResultado;

    switch (channel) {
        case undefined: return message.channel.send("Você precisa entrar em uma call primeiro!");
        case 'full': return message.channel.send("A call está lotada, então não posso entrar."); 
    }

    if(guildQueue) {
        if (channel.id !== channelMe && channelMe) return message.channel.send("Já estou sendo utilizado!");
    }

    switch (YtSearch) {
        case '': return message.channel.send("Insira algo para ser pesquisa")
        default: YtResultado = await client.player.search(YtSearch, { requestedBy: message.member, searchEngine: require('discord-player').QueryType.AUTO});
    }

    switch (YtResultado) { 
        case undefined: return message.channel.send(`Não Encontrei nenhum resultado para ${YtSearch}`);
        default: Player(client.player, YtResultado, guildQueue, message, channel, limite)
    }

}


async function Player(Player, Resultado, guildQueue, message, channel, limite) {

    let queue;

    message.channel.voiceId = channel.id
    
    switch (guildQueue) {
        case undefined: queue = Player.createQueue(message.guild, {metadata: message.channel})   
            break; 
        default: queue = guildQueue, queue.metadata = message.channel;
    }
    
    if(Resultado.playlist && ( Resultado.tracks.length + queue.tracks.length ) >= limite) return message.channel.send(`Limite de Musicas atingido ${limite - 1}`)
    
    if(!Resultado.playlist && ( 1 + queue.tracks.length) >= limite) return message.channel.send(`Limite de Musicas na fila atingido ${limite - 1}`)
    
    Resultado.playlist ? queue.addTracks(Resultado.tracks) : queue.addTrack(Resultado.tracks[0]);

    if (!queue.connection) {
        try {
            await queue.connect(channel);   
        } catch (error) {
            await Player.deleteQueue(message.guild);
            return message.channel.send(`Ocorreu um erro inesperado`);
        }
    }

     if (!queue.playing) queue.play();
}


module.exports = {
name: 'vplay',
description: "Escutar uma musica boa",
run: executar
}