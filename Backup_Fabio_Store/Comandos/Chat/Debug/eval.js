const { MessageEmbed } = require("discord.js");
const { inspect } = require('util')
module.exports = {
   name: "eval",
   aliases: ["e"],
   description: "Evaluate a given code!",
   usage: 'eval [code]',
   CommandForOwner: true,
   run: async (client, message, args) => {
      try {
         const code = args.join(" ");
         if (!code) {
            return message.channel.send("Forneça um código para executar");
         }

         const result = await eval(code)
         let output = result
         
         if (typeof result !== "string")
            output = inspect(result);

         message.channel.send(`\`\`\`js\n${output}\n\`\`\``);
      } catch (err) {
         message.channel.send(`\`ERROR\` \`\`\`js\n${err}\n\`\`\``);
      }
   },
};