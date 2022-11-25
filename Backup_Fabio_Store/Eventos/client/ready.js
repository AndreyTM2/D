module.exports = async(client) => {
    client.on('ready', async () => {

        console.log(client)
        let guildId = client.guilds.cache.map(m => m.id)
        let guildAllInfo = client.guilds.cache.map(m => m)

        for (let Pag = 0; Pag < guildId.length; Pag++) {
            const Guilds = guildId[Pag];

            let data = await client.SettingsExtras.get(Guilds);
            if(!data){
                client.SettingsExtras.ensure(`${Guilds}`, {
                    Name: 'Andrey Gostoso',
                    TotalTicket: 0,
                    Avaliacoes: [],
                    ChannelIDTicket: undefined,
                    MessageIDTicket: undefined,
                    Prefix : '!',
                    Produtos : {index : [{"title":"Title Lindão","tamanho":"0","description":`use o cmd produtosset`,}]}
                  });
                console.log('DataBase Sendo recriada...')
            }else return console.log('DataBase Carregada...')
        }
    })
}

