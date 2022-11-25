const { ShardingManager } = require("discord.js");
const manager = new ShardingManager("./index.js", {
    respawn: true,
    totalShards: 2,
    token: "Nz"
});
const path = require('path');
const express = require('express');
const server = express();
server.set("view engine", "pug");
 server.set('Content-Type', 'text/plain');
server.set("views", path.join(__dirname));

server.all('/', (req, res) => {
	res.render("index", { title: "Dados", HOSTNAME: process.env.HOSTNAME, MEMORY: process.env.SERVER_MEMORY });
});

server.listen(10029, () => {
        console.log('Server Ready.');
    });

manager.on("shardCreate", (shard) =>{
    shard.on('ready', () => {
        console.log(`${shard.id + 1}`)
    })
});

manager.spawn();