let InteractionVerify = ['fechar', 'ChamarDm']
let Produtos = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"]
let Player = ['stop', 'pause', 'skip', 'list']
let Ignore = ['descricao', 'titulo', 'salvar', 'remove', '0', 'pix', 'copiarc', 'calpix', 'F', 'Avaliar', 'emoji']
let TicketButtons = ['compras', 'suportef', 'duvidas', 'robux', 'gamepass', 'ticket']

module.exports = async (client) => {
    client.on("interactionCreate", async (interaction) => {
        if(Ignore.includes(interaction.customId)) return 

        if(interaction.isButton()){
            if(TicketButtons.includes(interaction.customId)){
                return require('./RunFunction/Ticket')(client, interaction);
            }else if(Player.includes(interaction.customId)){
            let queue = client.player.getQueue(interaction.guild.id);
            if(!queue) return interaction.message.edit({components: []}) 
            else return
        }else if(Produtos.includes(interaction.customId)){
            return require('./RunFunction/MultiProdutos')(interaction, client)}
            else if(InteractionVerify.includes(interaction.customId)){
                try {return require(`./RunFunction/${interaction.customId}.js`)(interaction, client);                    
                } catch (error) {return require('./RunFunction/Invalid')(interaction, error)}
            }else return require('./RunFunction/Invalid')(interaction);
        }else if (interaction.isCommand()) return require('./RunFunction/RunCommand')(client, interaction);
     });
}