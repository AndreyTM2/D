const { Util, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const fs = require('fs');
let pag;
let des;
let til;

let emojiName1 = null
let emojiId1 = null

async function Collector(message, pag, settings, client, id) {
    let newFilter = m => m.user.id === id
    let collector = message.channel.createMessageComponentCollector({filter: newFilter});

    collector.on('collect', async (i) => {
        if(i.customId === 'remove') return await Remove(collector, pag, settings, client, message, i, id);
        else if(i.customId === 'emoji') return await Emoji(client, message, collector, pag, settings, i,id)
        else if(i.customId === 'titulo') return await Titulo(client, message, collector, pag, settings, i, id);
        else if(i.customId === 'descricao') return await Descrição(client, message, collector, pag, settings, i, id)
        else if(i.customId === 'salvar') {
            if(til !== i.message.embeds[0].title || des !== i.message.embeds[0].description){
                await Save(client, message, collector, pag, settings, i, id)
            }else {
                i.deferUpdate()
                if(pag > 0) i.message.edit({embeds: [], content: `Pagina **${pag} (${i.message.embeds[0].title})** foi Salva, porem nenhuma alteração foi realizada`, components: []})
                else i.message.edit({embeds: [], content: `**INDEX** foi Salva, porem nenhuma alteração foi realizada`, components: []})
                return collector.stop()
            }
        }
    })
}

async function Titulo(client, sms, Externo, pag, settingse, i, id) {
    i.deferUpdate()
    Externo.stop()
    let newFilter = m => m.author.id === id
    let collector = sms.channel.createMessageCollector({filter: newFilter});
    let otherMsg = await sms.channel.send('___favor envie uma mensagem com o Titulo a ser setado...___')

    collector.on('collect', async (msg) => {

        const settings = await client.SettingsExtras.get(msg.guild.id)
        await otherMsg.delete()
        await msg.delete()
        sms.embeds[0].title = msg.content;
        if(pag > 0){
            sms.edit({embeds: [sms.embeds[0]], components: [sms.components[0], sms?.components[1]]}).then(async()=> {
                collector.stop()
                Collector(sms, pag, settingse, client, id);
            })
        }else {
            sms.edit({embeds: [sms.embeds[0]], components: [sms.components[0]]}).then(async()=> {
                collector.stop()
                Collector(sms, pag, settingse, client, id);
            })
        }
    })
}

async function Descrição(client, sms, Externo, pag, settingse, i, id) {
    i.deferUpdate()
    Externo.stop()
    let newFilter = m => m.author.id === id
    let collector = sms.channel.createMessageCollector({filter: newFilter});
    let otherMsg = await sms.channel.send('___favor envie uma mensagem com a descrição a ser setado...___')

    collector.on('collect', async (msg) => {

        const settings = await client.SettingsExtras.get(msg.guild.id)
        await otherMsg.delete()
        await msg.delete()
        sms.embeds[0].description = msg.content;
        if(pag > 0){
            sms.edit({embeds: [sms.embeds[0]], components: [sms.components[0], sms?.components[1]]}).then(async()=> {
                collector.stop()
                Collector(sms, pag, settingse, client, id);
            })
        }else {
            sms.edit({embeds: [sms.embeds[0]], components: [sms.components[0]]}).then(async()=> {
                collector.stop()
                Collector(sms, pag, settingse, client, id);
            })
        }
    })
}

async function Emoji(client, sms, Externo, pag, settingse, i, id) {
    i.deferUpdate()
    Externo.stop()
    let newFilter = m => m.author.id === id
    let collector = sms.channel.createMessageCollector({filter: newFilter});
    let otherMsg = await sms.channel.send('___favor envie o emoji a ser setado...___')

    collector.on('collect', async (msg) => {

        const settings = await client.SettingsExtras.get(msg.guild.id)
        await otherMsg.delete()
        await msg.delete()
        let emoji = Util.parseEmoji(msg.content)
        if(emoji.id === null){
            emojiName1 = null
            emojiId1 = null
            sms.components[0].components[2].style = 'SECONDARY'
            return sms.edit({embeds: [sms.embeds[0]], components: [sms.components[0], sms.components[1]]}).then(async()=> {
                collector.stop()
                return Collector(sms, pag, settingse, client, id);
            })
        }else if(emoji.id !== null){
            emojiId1 = `${emoji.id}`
            emojiName1 = `${emoji.name}`
            sms.components[0].components[2].style = 'SUCCESS'
            return sms.edit({embeds: [sms.embeds[0]], components: [sms.components[0], sms.components[1]]}).then(async()=> {
                collector.stop()
                return Collector(sms, pag, settingse, client, id);
            })
        }else {
            collector.stop()
            return Collector(sms, pag, settingse, client, id)
        }
    })
}

async function Save(client, sms, Externo, pag, settingse, i, id) {
    let conteudo;
    if(emojiName1 === null && emojiId1 === null) conteudo = {title: sms.embeds[0].title , description: sms.embeds[0].description , tamanho: pag};
    else conteudo = {title: sms.embeds[0].title , description: sms.embeds[0].description , tamanho: pag, emojiName: emojiName1, emojiId: emojiId1 };
    let Salvado = {...settingse.Produtos.index[pag],...conteudo};
    settingse.Produtos.index[pag] = Salvado;
    emojiName1 = null
    emojiId1 = null
    Externo.stop()
    if(pag > 0) await i.message.edit({embeds: [], components: [], content: `Pagina **${pag} (${i.message.embeds[0].title})** foi salvo`});
    else await i.message.edit({embeds: [], components: [], content: `**INDEX** foi salvo`});
    return await client.SettingsExtras.set(sms.guild.id, settingse.Produtos, 'Produtos');
}

async function Remove(collector, number, settings, client, message, interaction, id) {
    collector.stop()
    let array = settings.Produtos.index;
    delete array[number];
    let newArray = [];
    for (let index = 0; index < array.length; index++) {if(array[index] !== undefined){newArray.push(array[index])}}
    let conteudo = {index: newArray};
    let Salvado = {...settings.Produtos,...conteudo};
    settings.Produtos = Salvado;
    await client.SettingsExtras.set(message.guild.id, settings.Produtos, 'Produtos');
    await interaction.deferUpdate();
    return await interaction.message.edit({embeds: [], components: [], content: `Pagina ${number} foi removida`});
}

async function CreatePagina(pag, settings, client, message) {
    let conteudo = {title: 'Titulo', description: 'Descrição', tamanho: pag};
    let Salvado = {...settings.Produtos.index[pag],...conteudo};

    settings.Produtos.index[pag] = Salvado;

    await client.SettingsExtras.set(message.guild.id, settings.Produtos, 'Produtos');
    return await message.channel.send('Pagina criada, execute o comando novamente');
}

module.exports = {
    name: 'produtosset',
    description: "setar preços dos produtos!",
    category: "Ext",
    CommandForBuy: true,
    run: async(client, message, args ) => {
        const Titulo = new MessageButton().setLabel('Titulo').setStyle('PRIMARY').setCustomId('titulo')
        const Descrição = new MessageButton().setLabel('Descrição').setStyle('PRIMARY').setCustomId('descricao')
        const Salvar = new MessageButton().setLabel('Salvar').setStyle('SUCCESS').setCustomId('salvar')
        const Remove = new MessageButton().setLabel('Remove').setStyle('DANGER').setCustomId('remove')
        const Emoji = new MessageButton().setLabel('Emoji').setStyle('SECONDARY').setCustomId('emoji')

        const rowP = new MessageActionRow().addComponents(Titulo, Descrição, Salvar)
        const rowS = new MessageActionRow().addComponents(Titulo, Descrição, Emoji ,Salvar)
        const deleted = new MessageActionRow().addComponents(Remove)

        if(args[1] === undefined) pag = '0';
        else pag = args[1];

        const settings = await client.SettingsExtras.get(message.guild.id)
        let conteudo = settings.Produtos.index[pag];

        if(args[0]==="config"){

            if(pag > settings.Produtos.index.length) return message.channel.send('Configure as paginas em ordem')

            if(conteudo){

                let {description, title} = conteudo
                if(description === undefined && null) description = 'SEM CONTEUDO'
                if(title === undefined && null) title = 'SEM CONTEUDO'
                
                let embedP = new MessageEmbed().setTitle(title).setDescription(description)

                if(pag > 0) message.channel.send({embeds: [embedP], components: [rowS, deleted]}).then(async(msg) => {
                    til = msg.embeds[0].title;
                    des = msg.embeds[0].description;
                    Collector(msg, pag, settings, client, message.author.id);
                }); else message.channel.send({embeds: [embedP], components: [rowP]}).then(async(msg) => {
                    til = msg.embeds[0].title;
                    des = msg.embeds[0].description;
                    Collector(msg, pag, settings, client, message.author.id);
                })

            }else return await CreatePagina(pag, settings, client, message)


        }else if(args[0]==="pag"){
            let produtoTamanho = settings.Produtos.index.length + 1
            if(args[1] > produtoTamanho) return message.channel.send('Configure cada pagina em ordem')
            if(args[1] > 21) return message.channel.send('Meu limite está setado para 21 buttons :D, foi mals')
            if(args[2] === "--description"){
                let dec = message.content.split("--")
                let dec2 = dec[1].slice(12)
                let dec7 = {description: dec2}
                let dec8 = {...settings.Produtos.index[args[1]-1],...dec7}
                settings.Produtos.index[args[1]-1] = dec8;
                let dec65 = {tamanho: `${args[1]-1}`}
                let dec55 = {...settings.Produtos.index[args[1]-1],...dec65}
                settings.Produtos.index[args[1]-1] = dec55;
                let de55c = {id: `${message.guild.id}`}
                let de53m = {...settings.Produtos.index[args[1]-1],...de55c}
                settings.Produtos.index[args[1]-1] = de53m
                message.channel.send('Saved')
                return await client.SettingsExtras.set(message.guild.id, settings.Produtos, 'Produtos');
            }else if(args[2] === "--title"){
                let dec3 = message.content.split("--")
                let dec4 = dec3[1].slice(6)
                let dec6 = {title: dec4}
                let dec5 = {...settings.Produtos.index[args[1]-1],...dec6}
                settings.Produtos.index[args[1]-1] = dec5;
                let dec65 = {tamanho: `${args[1]-1}`}
                let dec55 = {...settings.Produtos.index[args[1]-1],...dec65}
                settings.Produtos.index[args[1]-1] = dec55;
                let de55c = {id: `${message.guild.id}`}
                let de53m = {...settings.Produtos.index[args[1]-1],...de55c}
                settings.Produtos.index[args[1]-1] = de53m
                message.channel.send('Saved')
                return await client.SettingsExtras.set(message.guild.id, settings.Produtos, 'Produtos');
            }else if(args[2] === "--emoji"){
                let dec3 = message.content.split("--")
                let dec4 = dec3[1].slice(6)
                let emoj = Util.parseEmoji(dec4)
                if(!emoj) return message.channel.send('Tente Novamente :D')
                let dec6 = {emojiName: emoj.name, emojiId: emoj.id}
                let dec5 = {...settings.Produtos.index[args[1]-1],...dec6}
                settings.Produtos.index[args[1]-1] = dec5;
                let dec65 = {tamanho: `${args[1]-1}`}
                let dec55 = {...settings.Produtos.index[args[1]-1],...dec65}
                settings.Produtos.index[args[1]-1] = dec55;
                let de55c = {id: `${message.guild.id}`}
                let de53m = {...settings.Produtos.index[args[1]-1],...de55c}
                settings.Produtos.index[args[1]-1] = de53m
                message.channel.send('Saved')
                return await client.SettingsExtras.set(message.guild.id, settings.Produtos, 'Produtos');
            }else if(args[2] === "--image"){
                let dec3 = message.content.split("--")
                let dec4 = dec3[1].slice(5)
                let dec6 = {image: dec4}
                let dec5 = {...settings.Produtos.index[args[1]-1],...dec6}
                settings.Produtos.index[args[1]-1] = dec5;
                let dec65 = {tamanho: `${args[1]-1}`}
                let de55c = {id: `${message.guild.id}`}
                let de53m = {...settings.Produtos.index[args[1]-1],...de55c}
                settings.Produtos.index[args[1]-1] = de53m
                let dec55 = {...settings.Produtos.index[args[1]-1],...dec65}
                settings.Produtos.index[args[1]-1] = dec55;
                message.channel.send('Saved')
                return await client.SettingsExtras.set(message.guild.id, settings.Produtos, 'Produtos');
            }else if(args[2] === "--emojilabel"){
                let dec3 = message.content.split("--")
                let dec4 = dec3[1].slice(11)
                let dec6 = {EmojiLabel: dec4}
                let dec5 = {...settings.Produtos.index[args[1]-1],...dec6}
                settings.Produtos.index[args[1]-1] = dec5;
                let dec65 = {tamanho: `${args[1]-1}`}
                let de55c = {id: `${message.guild.id}`}
                let de53m = {...settings.Produtos.index[args[1]-1],...de55c}
                settings.Produtos.index[args[1]-1] = de53m
                let dec55 = {...settings.Produtos.index[args[1]-1],...dec65}
                settings.Produtos.index[args[1]-1] = dec55;
                if(dec4 === '1') message.channel.send('Emoji + Label Ativado')
                else message.channel.send('Saved')
                return await client.SettingsExtras.set(message.guild.id, settings.Produtos, 'Produtos');
            }else if(args[2] === "--removetitle"){
                let dec3 = message.content.split("--")
                let dec4 = dec3[1].slice(12)
                let dec6 = {TitleType: dec4}
                let dec5 = {...settings.Produtos.index[args[1]-1],...dec6}
                settings.Produtos.index[args[1]-1] = dec5;
                let dec65 = {tamanho: `${args[1]-1}`}
                let de55c = {id: `${message.guild.id}`}
                let de53m = {...settings.Produtos.index[args[1]-1],...de55c}
                settings.Produtos.index[args[1]-1] = de53m
                let dec55 = {...settings.Produtos.index[args[1]-1],...dec65}
                settings.Produtos.index[args[1]-1] = dec55;
                if(dec4 === '1') message.channel.send('Titulo Removido')
                else message.channel.send('Saved')
                return await client.SettingsExtras.set(message.guild.id, settings.Produtos, 'Produtos');
            }
            else if(args[2] === "--del"){
                let array = settings.Produtos.index;
                delete array[args[1]-1];
                let newArray = [];
                for (let index = 0; index < array.length; index++) {if(array[index] !== undefined){newArray.push(array[index])}}
                let conteudo = {index: newArray};
                let Salvado = {...settings.Produtos,...conteudo};
                settings.Produtos = Salvado;
                message.channel.send('Saved, cuidado fazer merda k')
                return await client.SettingsExtras.set(message.guild.id, settings.Produtos, 'Produtos');
            }}else{
            message.channel.send({embeds: [new MessageEmbed().addFields({
                    name: `Utilização => {`, value: `produtosset pag 2 --emojilabel 1\n$produtosset pag (1 - 10) --title\nprodutosset pag (1 - 10) --description \nprodutosset pag (1 - 10) --emoji \n**}**`, inline: true
                },{name: `Exemplos => {`, value: `produtosset pag 2 --emojilabel 1\nprodutosset pag 2 --title Roblox\nprodutosset pag 2 --description Gamepass \nprodutosset pag 2 --emoji 👑 \n**}**`, inline: true})]})
        }

    }
}