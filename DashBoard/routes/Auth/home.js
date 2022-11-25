const router = require("express").Router();

router.get("/", async (req, res) => {

    if(req.query.guild_id){
        return res.redirect(`/guild/${req.query.guild_id}`)
    }
  
    let user_fetched;
    let new_user = (data) => { 
       user_fetched = data;
    };
  
    if(req.isAuthenticated()){
      await req.client.users.fetch(req.user.id).then((e) => new_user(e));
    }

    res.render("index", {
        id: (req.isAuthenticated() ? `${req.user.id}` : false),
        avatar: (req.isAuthenticated() ? `https://cdn.discordapp.com/avatars/${user_fetched.id}/${user_fetched.avatar}.png?size=2048` : null),
        show: (req.isAuthenticated() ? true : false),
        shards: req.client.shard?.count || 0,
        users: await (await req.client.shard.broadcastEval(c => c.users.cache.size).then(results => results.reduce((prev, val) => prev + val, 0))) || 0,
        guilds: await (await req.client.shard.broadcastEval(c => c.guilds.cache.size).then(results => results.reduce((prev, val) => prev + val, 0))) || 0,
    })
});

module.exports = router;