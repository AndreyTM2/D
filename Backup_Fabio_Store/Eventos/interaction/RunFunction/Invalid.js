module.exports = async(interaction, error) => {
    console.log(error)
    interaction.reply({ content: "Ocorreu um erro", ephemeral: true});
}