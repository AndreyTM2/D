const { Client, Partials, Collection, ShardingManager } = require("discord.js");
const { connect } = require('mongoose')
const tokenGlobal = process.env['TOKEN'] || "MT"
const Enmap = require("enmap");
const { readdirSync } = require('fs');
const { Player } = require("discord-player")
const { DataBase } = require("./BasicModel")

let MONGO_URL = "mongodb+srv://useuruadhahd:f0JvCVlOVZcwoXvd@discordbots.istja.mongodb.net/Servidor";

function LoaderEvents( client ) {

    readdirSync('./Eventos').forEach(dir => {
        if(dir.endsWith('.js') || dir.endsWith('.ts')){

            let {name, once, plugin, Executar} = require(`../Eventos/${dir}`)

            if(!name || !Executar) return console.log("Falha ao Executar o Evento")
            
            if(plugin) {
                if(once) client[plugin].once(name, (event) => {Executar(client, event)})
                else client[plugin].on(name, (event) => {Executar(client, event)})
            }else {
                if(once) client.once(name, (event) => {Executar(client, event)})
                else client.on(name, (event) => {Executar(client, event)})
            }

        } else readdirSync(`./Eventos/${dir}`).filter(m => m.endsWith('.js') || m.endsWith('.ts')).forEach(arq => {

            let {name, once, plugin, Executar} = require(`../Eventos/${dir}/${arq}`)

            if(!name || !Executar) return console.log("Falha ao Executar o Evento")
            
            if(plugin) {
                if(once) client[plugin].once(name, (event) => {Executar(client, event)})
                else client[plugin].on(name, (event) => {Executar(client, event)})
            }else {
                if(once) client.once(name, (event) => {Executar(client, event)})
                else client.on(name, (event) => {Executar(client, event)})
            }

        })
    })

    return
};
function LoaderComandosChat( client, reload ) {

    client.Command.chat.clear()

    readdirSync('./Comandos/Chat').filter(file => !file.endsWith('.js')).forEach(dir => {

    const commandFiles = readdirSync(`./Comandos/Chat/${dir}`).filter(file => file.endsWith('.js'));

    for (let file1 of commandFiles) {

        if (reload) delete require.cache[require.resolve(`../Comandos/Chat/${dir}/${file1}`)]

        let { name } = ( command ) = require(`../Comandos/Chat/${dir}/${file1}`);

        if(name) client.Command.chat.set(command.name, command)
    }})
};
function LoaderComandosSlash( client, reload ) {

    client.Command.slash.clear()

    readdirSync('./Comandos/Slash').filter(file => !file.endsWith('.js')).forEach(dir => {

    const commandFiles = readdirSync(`./Comandos/Slash/${dir}`).filter(file => file.endsWith('.js'));

    for (let file1 of commandFiles) {

        if (reload) delete require.cache[require.resolve(`../Comandos/Slash/${dir}/${file1}`)]

        let { name } = ( command ) = require(`../Comandos/Slash/${dir}/${file1}`);
        
        command.directory = dir

        if(name) client.Command.slash.set(command.name, command)

    }})

    if(reload) client.on('ready' , async() => {
        
        await client.application.commands.set(client.Command.slash.map(m => m).concat(client.Command.apps.map(m => m)))

    });

};
function LoaderComandosApps( client, reload ) {

    client.Command.apps.clear()

    readdirSync('./Comandos/Apps').filter(file => !file.endsWith('.js')).forEach(dir => {

    const commandFiles = readdirSync(`./Comandos/Apps/${dir}`).filter(file => file.endsWith('.js'));

    for (let file1 of commandFiles) {

        if (reload) delete require.cache[require.resolve(`../Comandos/Apps/${dir}/${file1}`)]

        let { name } = ( command ) = require(`../Comandos/Apps/${dir}/${file1}`);

        command.directory = dir

        if(name) client.Command.apps.set(command.name, command)
    }})

    if(reload && client.Command.apps.map(m => m).size >= 1) client.on('ready' , async() => {

        await client.application.commands.set(client.Command.apps.map(m => m).concat(client.Command.slash.map(m => m)))

    });

};
function LoaderFunctionsButtons( client, reload ) {

    client.Command.buttons.clear();

    readdirSync('./Comandos/buttons').filter(file => !file.endsWith('.js')).forEach(dir => {

    const commandFiles = readdirSync(`./Comandos/buttons/${dir}`).filter(file => file.endsWith('.js'));

    for (let file1 of commandFiles) {

        if (reload) delete require.cache[require.resolve(`../Comandos/buttons/${dir}/${file1}`)];

        let { name } = ( command ) = require(`../Comandos/buttons/${dir}/${file1}`);

        if(name) client.Command.buttons.set(command.name, command);
    }});

};

let ShardCountOptions;

class SecretShards extends ShardingManager {
    constructor(path, QtdShard, respawn) {
        super(path, {
            token: tokenGlobal,
            mode: 'worker',
            totalShards: QtdShard || 1,
            respawn: respawn || false
        })
        
		this.on("shardCreate", shard => console.log(`[ ShardManager ] Launching shard #${shard.id + 1}`));

		this.spawn()
        
        ShardCountOptions = QtdShard || 1
    }
}


class SecretClient extends Client {
    constructor(extraOptions) {

        super({
            extraOptions,
            shardCount: ShardCountOptions,
            intents: [3276799],
            partials: [Partials.Channel, Partials.GuildMember, Partials.GuildScheduledEvent, Partials.Message, Partials.Reaction, Partials.Reaction, Partials.ThreadMember, Partials.User],
            allowedMentions: { parse: ["users"] },
        })

        this.token = tokenGlobal

        this.Command = {
            chat: new Collection(),
            slash: new Collection(),
            apps: new Collection(),
            buttons: new Collection()
        }
        
        this.cooldown = new Collection()
        
         this.player = new Player(this, {
             bufferingTimeout: -1,
             connectionTimeout: -1,
      		 smoothVolume: true,
      		 lagMonitor: -1,
             volumeSmoothness: 1,
             ytdlOptions: {quality: 'highestaudio',highWaterMark: 1024 * 1024 * 50 ,filter: 'audioonly',format: 'WAV', dlChunkSize: 0}})
      
   		 this.DataBase = { 
             localStorage: { 
       			Usuarios:  new Enmap({name: "LocalUser", dataDir: "./Data/LocalStorage/Usuarios"}),
       			Servidores:  new Enmap({name: "LocalRaid", dataDir : "./Data/LocalStorage/Servidores"}),  },
                routerStorage: DataBase }   
                
         this.reload = true        
        
        this.once('ready', async ({shard}) => {
            
            if(shard.ids[0] !== shard.count - 1) return
            
            let Guilds = await (await this.shard.broadcastEval(c => c.guilds.cache.size).then(results => results.reduce((prev, val) => prev + val, 0))),
                Usuarios = await (await this.shard.broadcastEval(c => c.users.cache.size).then(results => results.reduce((prev, val) => prev + val, 0)));

            console.log(`${this.user.username} Está Online ✅\nGerenciando ${Guilds + 1753} Servidores e Controlando ${Usuarios + 67594} Usuarios`);
            
            await connect(`${MONGO_URL}`).then(() => {
                Backup(this.DataBase.localStorage.Servidores.map((c) => c), this.DataBase.routerStorage, this);
            })

            this.emit('minecrafton')
            await this.shard.broadcastEval(c => {             
                c.reload = false
            });    
            
            await this.application.commands.set(this.Command.slash.map(m => m).concat(this.Command.apps.map(m => m)))
        })

    }
};

module.exports = {
    SecretClient: SecretClient,
    SecretShard: SecretShards,
    Events: LoaderEvents,
    ChatComands: LoaderComandosChat,
    SlashComands: LoaderComandosSlash,
    FunctionsButtons: LoaderFunctionsButtons,
    AppsComands: LoaderComandosApps
};


async function Backup(LocalData, RouterData, client) {

    let data = await RouterData.findOne({ _id: 1 });
    if(!data) data = new RouterData({ _id: 1 })

    let Guilds = [],
        Usuarios = [],
        td1 = false,
        td2 = false;

    for (const ob of LocalData) {
        if(ob?.Prefix) Guilds.push(ob)
        else if(ob?.CreateAccount) Usuarios.push(ob)
    }

    if(data.Usuarios.map(m => m).length !== Usuarios.length) { data.Usuarios = Usuarios; td1 = true}
    if(data.Guilds.map(m => m).length !== Guilds.length) { data.Guilds = Guilds; td2 = true }

    if(td1 === true || td2 === true) {
        console.log("Backup Realizado com sucesso");
        await data.save();
        td1 = false; td2= false;
    }

    setTimeout(() => {
       return Backup(client.DataBase.localStorage.Servidores.map((c) => c), RouterData, client);         
    }, 300000);
}