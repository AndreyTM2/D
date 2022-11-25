const event = async (client, PlayerEvent) => {
    return PlayerEvent.metadata.PlayerControl.edit({components: []})
}
    
    module.exports = {
        name: 'trackEnd', // Utilizado para criar o evento
        plugin: 'player', // Utilizado para utilizar module externos do discord
        once: false, // Utilizado para dizer ao codigo se é para executar apenas uma vez ou repetir
    
        Executar: event // Obj que vai ser executado para ser o Evento 
    }