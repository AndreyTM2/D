module.exports = {
    name : 'prefix',
    cooldown : 10000,
    usage: 'prefix [new prefix]',
    run: async (client, message, args) => {

        if(message.member.permissions.has('ADMINISTRATOR'));
            
        let limited = 2;

        const prefix = args.join("");
        let a

        const {Prefix} = await client.SettingsExtras.get(message.guild.id)

        if(Prefix === undefined) a = "!"
        else a = Prefix

        if (!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send(`${message.author} Você não possui permissão.`);

        if (!prefix) return message.channel.send(`${message.author} favor informe qual será o novo prefixo | ex : ( ${a}prefix .s )`);        

        if (args[0].length > limited) return message.channel.send(`ei bro tu escreveu ${args[0].length - limited} caracteres a mais do que permitido para setar o prefix!`)
        
        return message.channel.send(`<a:load:972546655100485692> | Verificando`).then(async (msg) => {
            client.SettingsExtras.set(message.guild.id, prefix, 'Prefix')
            setTimeout(() => {
                if(Prefix === Prefix) return msg.edit(`${message.author} O meu prefixo foi definido para \`${prefix}\` com sucesso!`)
                else return msg.edit(`Ocorreu Algum erro nao esperado favor tente novamente mais tarde`)
            }, 1500);
        })

    }
}