const { ApplicationCommandType } = require('discord.js')

module.exports = {
    name: "ping",
    description: "returns websocket ping",
    type: ApplicationCommandType.ChatInput,
    run: async (client, interaction, args) => {
       interaction.reply({content : `${client.ws.ping}`});
    },
 };
