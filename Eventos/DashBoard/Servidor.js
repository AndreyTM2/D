const { OnStartUp } = require('../../DashBoard/server')
const event = async (client, guild) => {

    client.config = {
        CLIENT_ID : "1040456323919257621",
        CLIENT_SECRET: "LdvC7uE0wPlrDxgghw_Y9wxmwYTZJm9d",
        CLIENT_REDIRECT: "/auth/redirect"
    }
    
    console.log("Inicializando DashBoard")

    OnStartUp(client, 10026)
}

module.exports = {
    name: 'minecrafton', // Utilizado para criar o evento
    plugin: '', // Utilizado para utilizar module externos do discord
    once: false, // Utilizado para dizer ao codigo se é para executar apenas uma vez ou repetir

    Executar: event, // Obj que vai ser executado para ser o Evento 
}