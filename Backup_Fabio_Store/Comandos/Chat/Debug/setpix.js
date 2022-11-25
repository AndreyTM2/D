module.exports = {
    name : 'setpix',
    cooldown : 10000,
    usage: 'prefix [new prefix]',
    run: async (client, message, args) => {

        if(message.member.permissions.has('ADMINISTRATOR'));

        const prefix = args.join("");
        let a

        const {PixURL} = await client.SettingsExtras.get(`${message.guild.id}-${message.author.id}`)

        if (!prefix) return message.channel.send(`${message.author} favor informe qual é seu acess token do mercado pago`);        

        if(!prefix.startsWith('APP_USR')) return message.channel.send('Mande um acess token valida')

        if(message.content) message.delete()

        return message.channel.send(`<a:load:972546655100485692> | Verificando`).then(async (msg) => {
            client.SettingsExtras.set(`${message.guild.id}-${message.author.id}`, prefix, 'PixURL')
            setTimeout(() => {
                if(PixURL === PixURL) return msg.edit(`${message.author} o seu acesso token foi setado com sucesso!`)
                else return msg.edit(`Ocorreu Algum erro não esperado favor tente novamente mais tarde`)
            }, 1500);
        })

    }
}