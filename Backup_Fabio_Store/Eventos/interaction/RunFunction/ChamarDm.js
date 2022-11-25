module.exports = async(interaction) => {
    try {
        interaction.message.components[0].components[1].setDisabled(true)
        await interaction.message.edit({components: [interaction.message.components[0]]})
        await interaction.channel.send(`|| @here ||`)
        interaction.deferUpdate()
    } catch (error) {
        interaction.channel.send('foi mals to com covid, nao posso avisar aos staff')
        interaction.deferUpdate()
        }
}