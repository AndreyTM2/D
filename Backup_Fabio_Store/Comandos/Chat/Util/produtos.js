const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: 'produtos',
    cooldown : 1,
    usage: 'produtos',
    run: async(client, message, args ) => {
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply ('Você não tem autoridade para isso kkkkkk.')
        try {
        const settings = await client.SettingsExtras.get(message.guild.id)
        let length = settings.Produtos.index.length
        let embeds = []
        let buttons = []
        let buttons2 = []
        let buttons3 = []
        let buttons4 = []
        let buttons5 = []
        let buttons6 = []

        let p = settings.Produtos.index
        
        for (let index = 0; index < length; index++) {
            if(index >= 0){
                embeds.push(new MessageEmbed().setColor('WHITE').setTitle(settings.Produtos.index[index].title).setDescription(settings.Produtos.index[index].description))}}
        for (let index = 1; index < length; index++) {
            if(index <= 4){
                if(p[index].emojiId !== undefined && p[index].emojiId !== null ){if (p[index].EmojiLabel === "1") {buttons.push(new MessageButton().setEmoji(`<:${p[index].emojiName}:${p[index].emojiId}`).setCustomId(p[index].tamanho).setStyle('SECONDARY').setLabel(`${p[index].title}`))}else{buttons.push(new MessageButton().setEmoji(`<:${p[index].emojiName}:${p[index].emojiId}>`).setCustomId(p[index].tamanho).setStyle('SECONDARY'))}} 
                else if(p[index].emojiName !== undefined && p[index].emojiName !== null){if (p[index].EmojiLabel === "1") {buttons.push(new MessageButton().setEmoji(`${p[index].emojiName}`).setCustomId(p[index].tamanho).setStyle('SECONDARY').setLabel(`${p[index].title}`))}else{buttons.push(new MessageButton().setEmoji(`${p[index].emojiName}`).setCustomId(p[index].tamanho).setStyle('SECONDARY'))}} 
                else buttons.push(new MessageButton().setLabel(`${p[index].title}`).setCustomId(p[index].tamanho).setStyle('SECONDARY'))     
            }else if(index <= 8){
                if(p[index].emojiId !== undefined && p[index].emojiId !== null ){if (p[index].EmojiLabel === "1") {buttons2.push(new MessageButton().setEmoji(`<:${p[index].emojiName}:${p[index].emojiId}`).setCustomId(p[index].tamanho).setStyle('SECONDARY').setLabel(`${p[index].title}`))}else{buttons2.push(new MessageButton().setEmoji(`<:${p[index].emojiName}:${p[index].emojiId}>`).setCustomId(p[index].tamanho).setStyle('SECONDARY'))}} 
                else if(p[index].emojiName !== undefined && p[index].emojiName !== null){if (p[index].EmojiLabel === "1") {buttons2.push(new MessageButton().setEmoji(`${p[index].emojiName}`).setCustomId(p[index].tamanho).setStyle('SECONDARY').setLabel(`${p[index].title}`))}else{buttons2.push(new MessageButton().setEmoji(`${p[index].emojiName}`).setCustomId(p[index].tamanho).setStyle('SECONDARY'))}} 
                else buttons2.push(new MessageButton().setLabel(`${p[index].title}`).setCustomId(p[index].tamanho).setStyle('SECONDARY'))                         
            }else if(index <= 12){
                if(p[index].emojiId !== undefined && p[index].emojiId !== null ){if (p[index].EmojiLabel === "1") {buttons3.push(new MessageButton().setEmoji(`<:${p[index].emojiName}:${p[index].emojiId}`).setCustomId(p[index].tamanho).setStyle('SECONDARY').setLabel(`${p[index].title}`))}else{buttons3.push(new MessageButton().setEmoji(`<:${p[index].emojiName}:${p[index].emojiId}>`).setCustomId(p[index].tamanho).setStyle('SECONDARY'))}} 
                else if(p[index].emojiName !== undefined && p[index].emojiName !== null){if (p[index].EmojiLabel === "1") {buttons3.push(new MessageButton().setEmoji(`${p[index].emojiName}`).setCustomId(p[index].tamanho).setStyle('SECONDARY').setLabel(`${p[index].title}`))}else{buttons3.push(new MessageButton().setEmoji(`${p[index].emojiName}`).setCustomId(p[index].tamanho).setStyle('SECONDARY'))}} 
                else buttons3.push(new MessageButton().setLabel(`${p[index].title}`).setCustomId(p[index].tamanho).setStyle('SECONDARY'))    
            }else if(index <= 16){
                if(p[index].emojiId !== undefined && p[index].emojiId !== null ){if (p[index].EmojiLabel === "1") {buttons4.push(new MessageButton().setEmoji(`<:${p[index].emojiName}:${p[index].emojiId}`).setCustomId(p[index].tamanho).setStyle('SECONDARY').setLabel(`${p[index].title}`))}else{buttons4.push(new MessageButton().setEmoji(`<:${p[index].emojiName}:${p[index].emojiId}>`).setCustomId(p[index].tamanho).setStyle('SECONDARY'))}} 
                else if(p[index].emojiName !== undefined && p[index].emojiName !== null){if (p[index].EmojiLabel === "1") {buttons4.push(new MessageButton().setEmoji(`${p[index].emojiName}`).setCustomId(p[index].tamanho).setStyle('SECONDARY').setLabel(`${p[index].title}`))}else{buttons4.push(new MessageButton().setEmoji(`${p[index].emojiName}`).setCustomId(p[index].tamanho).setStyle('SECONDARY'))}} 
                else buttons4.push(new MessageButton().setLabel(`${p[index].title}`).setCustomId(p[index].tamanho).setStyle('SECONDARY'))    
            }else if(index <= 20){
                if(p[index].emojiId !== undefined && p[index].emojiId !== null ){if (p[index].EmojiLabel === "1") {buttons5.push(new MessageButton().setEmoji(`<:${p[index].emojiName}:${p[index].emojiId}`).setCustomId(p[index].tamanho).setStyle('SECONDARY').setLabel(`${p[index].title}`))}else{buttons5.push(new MessageButton().setEmoji(`<:${p[index].emojiName}:${p[index].emojiId}>`).setCustomId(p[index].tamanho).setStyle('SECONDARY'))}} 
                else if(p[index].emojiName !== undefined && p[index].emojiName !== null){if (p[index].EmojiLabel === "1") {buttons5.push(new MessageButton().setEmoji(`${p[index].emojiName}`).setCustomId(p[index].tamanho).setStyle('SECONDARY').setLabel(`${p[index].title}`))}else{buttons5.push(new MessageButton().setEmoji(`${p[index].emojiName}`).setCustomId(p[index].tamanho).setStyle('SECONDARY'))}} 
                else buttons5.push(new MessageButton().setLabel(`${p[index].title}`).setCustomId(p[index].tamanho).setStyle('SECONDARY'))                  
            }else if(index <= 24){
                if(p[index].emojiId !== undefined && p[index].emojiId !== null ){if (p[index].EmojiLabel === "1") {buttons6.push(new MessageButton().setEmoji(`<:${p[index].emojiName}:${p[index].emojiId}`).setCustomId(p[index].tamanho).setStyle('SECONDARY').setLabel(`${p[index].title}`))}else{buttons6.push(new MessageButton().setEmoji(`<:${p[index].emojiName}:${p[index].emojiId}>`).setCustomId(p[index].tamanho).setStyle('SECONDARY'))}} 
                else if(p[index].emojiName !== undefined && p[index].emojiName !== null){if (p[index].EmojiLabel === "1") {buttons6.push(new MessageButton().setEmoji(`${p[index].emojiName}`).setCustomId(p[index].tamanho).setStyle('SECONDARY').setLabel(`${p[index].title}`))}else{buttons6.push(new MessageButton().setEmoji(`${p[index].emojiName}`).setCustomId(p[index].tamanho).setStyle('SECONDARY'))}} 
                else buttons6.push(new MessageButton().setLabel(`${p[index].title}`).setCustomId(p[index].tamanho).setStyle('SECONDARY'))              
             }
        }

        const row = new MessageActionRow().addComponents(buttons);
        const row2 = new MessageActionRow().addComponents(buttons2);
        const row3 = new MessageActionRow().addComponents(buttons3);
        const row4 = new MessageActionRow().addComponents(buttons4);
        const row5 = new MessageActionRow().addComponents(buttons5);
        const row6 = new MessageActionRow().addComponents(buttons6);

        if(row6.components.length > 0 ) return message.channel.send({embeds: [embeds[0]], components: [row, row2, row3, row4 , row5 , row6]})    
        else if(row5.components.length > 0) return message.channel.send({embeds: [embeds[0]], components: [row, row2, row3, row4 , row5 ]})
        else if(row4.components.length > 0) return message.channel.send({embeds: [embeds[0]], components: [row, row2, row3, row4]})
        else if(row3.components.length > 0) return message.channel.send({embeds: [embeds[0]], components: [row, row2, row3]})
        else if(row2.components.length > 0) return message.channel.send({embeds: [embeds[0]], components: [row, row2]})
        else if(row.components.length > 0) return message.channel.send({embeds: [embeds[0]], components: [row]})
        else return message.channel.send({embeds: [embeds[0]]})        
        } catch (error) {
            message.channel.send(`ERROR 404 : ${error.name.slice(11)}`).then((d) => {
                    setTimeout(async () => {
        await d.edit('Caso não conseguir identificar o error utilize o cmd produtoslist e se algum estiver em null modifique')
    }, 10000);
            })   
        }
    }
}