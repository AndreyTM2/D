let idsSupremo = ['989975870280183869']

const {findBestMatch} = 
require('./Extra/UtilResolver');
const Gremosidade =
require('./Extra/Achievement');

module.exports = async (client) => {
    client.on("messageCreate", async (message) => {
    let prefix = "!"
    if(message.content === `<@${client.user.id}>`) return Gremosidade(message, prefix)
    if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(prefix)) return;
    const [cmd, ...args] = message.content.slice(prefix.length).trim().split(" "); let cmdCompare = client.ChatComandos.map(m => m.name)
    const command = client.ChatComandos.get(cmd.toLowerCase()) || client.ChatComandos.find((c) => c.aliases?.includes(cmd.toLowerCase()));
    if(cmd.length === 0) return
    if (!command){ let a  = findBestMatch(cmd, cmdCompare);
        if(a.bestMatch.target !== '') return message.channel.send(`Comando ${cmd} não existe! Se você quiser ver todos os meus comandos, use ${prefix}help\nMas eu acho que você queria escrever ${prefix}${a.bestMatch.target}`)
        else return message.channel.send(`Comando ${cmd} não existe! Se você quiser ver todos os meus comandos, use ${prefix}help`)}
    if(command.CommandForOwner) {if(!idsSupremo.includes(message.author.id))return message.channel.send('Foi-me dito para não permitir que você use este comando, desculpe').then((msg) => {setTimeout(() => msg.delete(), 10000)})
    else await command.run(client, message, args)}else await command.run(client, message, args);
})}