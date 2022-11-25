const { MessageButton, MessageActionRow, Message } = 
require('discord.js')

module.exports = {
    name: "ping",
    description: "returns websocket ping",
    type: "CHAT_INPUT",
    run: async (client, interaction, args) => {
       interaction.reply({content : `${client.ws.ping}`});
    },
 };
