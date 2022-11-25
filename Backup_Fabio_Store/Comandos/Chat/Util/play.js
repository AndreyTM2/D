const {QueryType} = require('discord-player-now');
module.exports = {
    name: "play",
    description: "returns websocket ping",
    usage: 'play [url / name]',
    aliases: ["play", "p", "tocar"],
    type: "CHAT_INPUT",
    run: async (client, message, args) => {
        let search = args.join(' '),
            queue;

		client.channelId = message.channelId
        client.guildID = message.guildId

        const join = message.member.voice.channel
        const guildQueue = client.player.getQueue(message.guild);
        
        if (!join) return message.channel.send("Você precisa entrar em uma call primeiro!");
        if (guildQueue) { if (join.id !== message.guild.me?.voice?.channelId) return message.channel.send("Já estou sendo utilizado!");}
        else if (join.full) return message.channel.send("A call está lotada, então não posso entrar.");

        if(!search) return message.channel.send(`Insira alguma coisa nome ou link para ser tocado | Youtube `)
        
        const res = await client.player.search(search, 
        { requestedBy: message.member, searchEngine: QueryType.AUTO});

        if (!res || !res.tracks.length) return message.channel.send(`Não Encontrei nenhum resultado para ${search}`);
        
        if(guildQueue){queue = guildQueue;queue.metadata = message.channel;} 
        else queue = client.player.createQueue(message.guild, {metadata: message.channel});

        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);
        try {if (!queue.connection) await queue.connect(join);
        }catch(d){ await client.player.deleteQueue(message.guild);return message.channel.send(`ERROR 404`);}

        if (!queue.playing) queue.play()
    }}