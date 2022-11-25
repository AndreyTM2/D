const { Encontrar } = require('../../Estrutura-Base/BestResult');
const { GuildCreate } = require('../Guild/GuildDataCreate');

const event = async (client, message) => {

    if(!message?.guildId || message?.author.bot) return

    let key = message.guild.id;

    if(!client.DataBase.localStorage.Servidores.get(key)) await GuildCreate(client, message.guild);

    if(message.content === `<@${client.user.id}>`) return message.channel.send({content: 'Estou online, porem não estou em funcionamento no momento'})

    let { Guilds } = (infos) = client.DataBase.localStorage.Usuarios.get(message.author.id);

    if(!Guilds[key] && Guilds) {
        infos.Guilds[key] = {
            Id: message.author.id,
            UsurCreateData: new Date().toLocaleTimeString('pt-br')
        };

        client.DataBase.localStorage.Usuarios.set(message.author.id, infos);
    }

    let { Prefix } = client.DataBase.localStorage.Servidores.get(key);
    
    if (!message.content.toLowerCase().startsWith(Prefix) || client.reload) return;

    const [cmd, ...args] = message.content.slice(Prefix.length).trim().split(" ");

    const command = client.Command.chat.get(cmd.toLowerCase()) || client.Command.chat.find((m) => { if(m.usage === cmd.toLowerCase()) return m });

    if(cmd.length === 0) return

   let { Chave } = Encontrar(cmd, client.Command.chat.map(m => m.name));

   if(Chave && !command && Chave !== "eval") return message.channel.send(`<@${message.author.id}> | Comando *\`${cmd}\`* NÃO EXISTE!\nMas eu acho que você queria escrever *\`${Prefix}${Chave}\`*`);
   else if(!command) return 

   let cooldown = client.cooldown.get(`${command.name}-${message.member.user.id}`)

   if (cooldown) if (Date.now() < cooldown) return message.reply(`Você deve esperar ${Math.floor(Math.abs(Date.now() - cooldown) / 1000)} segundo(s) para usar este comando novamente.`)
    
   await client.cooldown.set(`${command.name}-${message.member.user.id}`, Date.now() + 8 * 1000)

   return command.run(client, message, args).then(() => {
    setTimeout(() => { client.cooldown.delete(`${command?.name}-${message.member?.user.id}`)}, 8 * 1000)
   });
}

module.exports = {
    name: 'messageCreate', // Utilizado para criar o evento
    plugin: '', // Utilizado para utilizar module externos do discord
    once: false, // Utilizado para dizer ao codigo se é para executar apenas uma vez ou repetir

    Executar: event // Obj que vai ser executado para ser o Evento 
}