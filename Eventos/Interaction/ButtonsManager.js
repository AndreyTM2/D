const event = async (client, interactionApps) => {
    if(interactionApps.type !== 3 || !interactionApps.channel || interactionApps.user.bot || client.reload) return
    
    const app = client.Command.buttons.get(interactionApps.customId)
    if (!app) return interactionApps.reply({ content: "Ocorreu um erro", ephemeral: true});

    return app.run(client, interactionApps);
}

module.exports = {
    name: 'interactionCreate', // Utilizado para criar o evento
    plugin: '', // Utilizado para utilizar module externos do discord
    once: false, // Utilizado para dizer ao codigo se é para executar apenas uma vez ou repetir

    Executar: event // Obj que vai ser executado para ser o Evento 
}