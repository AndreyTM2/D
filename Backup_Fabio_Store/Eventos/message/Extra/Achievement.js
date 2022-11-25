let emojis = ['<a:festa_1:955067265294934068>'] 

module.exports = async (msg, prefix) => {
    
    let SelectRandom = Math.floor(Math.random() * (emojis.length - 0) + 0 )

    let MsgGremosa = `${emojis[SelectRandom]} **|** Olá <@${msg.author.id}>! Meu prefixo neste servidor é **${prefix}**, para ver o que eu posso fazer, use **${prefix}help**!`
    msg.channel.send(MsgGremosa)
}