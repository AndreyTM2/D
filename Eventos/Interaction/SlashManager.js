const event = async (client, InteractionSlash) => {
    if(InteractionSlash.commandType !== 1 || !InteractionSlash.channel || InteractionSlash.user.bot || client.reload) return
    
    const app = client.Command.slash.get(InteractionSlash.commandName)
    if (!app) return InteractionSlash.followUp({ content: "Ocorreu um erro", ephemeral: true});

    return app.run(client, InteractionSlash);
}

module.exports = {
    name: 'interactionCreate', // Utilizado para criar o evento
    plugin: '', // Utilizado para utilizar module externos do discord
    once: false, // Utilizado para dizer ao codigo se é para executar apenas uma vez ou repetir

    Executar: event // Obj que vai ser executado para ser o Evento 
}