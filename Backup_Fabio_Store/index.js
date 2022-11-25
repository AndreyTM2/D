function Events(reader, client) {
    reader('./Eventos').forEach(dir => {
        reader(`./Eventos/${dir}`).filter(file => file.endsWith('.js')).forEach(handler => {
            require(`./Eventos/${dir}/${handler}`)(client)});
        })
    return
};
function ChatComandos(reader, client) {
    reader('./Comandos/Chat').filter(file => !file.endsWith('.js')).forEach(dir => {
    const commandFiles = reader(`./Comandos/Chat/${dir}`).filter(file1 => file1.endsWith('.js'));
    for (let file1 of commandFiles) 
    { let command = require(`./Comandos/Chat/${dir}/${file1}`);
    if(command.name) client.ChatComandos.set(command.name, command)}})
    return
};
function SlashComandos(reader, client) {
    reader('./Comandos/Slash').filter(file => !file.endsWith('.js')).forEach(dir => {
    const commandSlash = reader(`./Comandos/Slash/${dir}/`).filter(file => file.endsWith('.js'));
    for(let file of commandSlash){ 
    let slashcommands = require(`./Comandos/Slash/${dir}/${file}`);
    if(slashcommands.name) client.SlashComandos.set(slashcommands.name, slashcommands)}})
    client.on('ready' , async() => {await client.application.commands.set(client.SlashComandos.map(m => m))});
    return
};

var options = {autoSelfDeaf:false,bufferingTimeout:1,disableVolume:false,initialVolume:100,leaveOnEmpty:true,leaveOnEmptyCooldown:10000,leaveOnEnd:false,leaveOnStop:true,spotifyBridge:true,volumeSmoothness:0.08,
ytdlOptions: {quality: 'highestaudio',highWaterMark: 1 << 25,filter: 'audioonly',format: 'mp3'}}

const {readdirSync} = 
require('fs');
const {Player} = 
require('discord-player-now');
const {Client, Collection} = 
require("discord.js");

const client = new Client({intents: [32767], shardCount: 2, messageCacheMaxSize: 10000})
const client_Player = new Player(client, options)

client.ChatComandos = new Collection();
client.SlashComandos = new Collection();
client.owner = ["989975870280183869"]
client.player = client_Player;

const express = require('express');
const server = express();

server.all('/', (req, res) => {
    res.send(`${process}`);
});

client.login("").then(() => {

    Events(readdirSync, client);
    ChatComandos(readdirSync, client);
    SlashComandos(readdirSync, client);
})

process.on('unhandledRejection', function (error) {
    console.error(error);
  });
  
  process.on('warning' , function (error) {
    console.error(`Warning` + error)
  })