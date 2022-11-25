const event = async (client, interactionApps) => {
    if(interactionApps.commandType !== 2 || !interactionApps.channel || interactionApps.targetUser.bot || interactionApps.user.bot || client.reload) return
    
    const app = client.Command.apps.get(interactionApps.commandName)
    if (!app) return interactionApps.followUp({ content: "Ocorreu um erro", ephemeral: true});

    return app.run(client, interactionApps);
}

module.exports = {
    name: 'interactionCreate', // Utilizado para criar o evento
    plugin: '', // Utilizado para utilizar module externos do discord
    once: false, // Utilizado para dizer ao codigo se é para executar apenas uma vez ou repetir

    Executar: event // Obj que vai ser executado para ser o Evento 
}