const { SecretClient, Events, ChatComands, SlashComands, AppsComands, FunctionsButtons } = require('./SecretClient')

var client = new SecretClient();

client.login().then(function () {
    ChatComands(client, false),
    SlashComands(client, false),
    AppsComands(client, false),
    FunctionsButtons(client, false),
    Events(client);
});

process.on('unhandledRejection', function (error) {
    console.error(error);
});