const Router1 = async() => {

    const router = require("express").Router();
    const passport = require("passport");

    router.get("/", passport.authenticate("discord"));

    router.get("/redirect", passport.authenticate("discord", {
        failureRedirect: "/",
        successRedirect: "/"
    }));

    return router
}

const Router2 = () => {

    const router = require("express").Router();

    router.get("/", (req, res) => {
        req.logout();
        res.redirect("/");
    });

    return router
}

const Router3 = (req, res, next) => {
    if(!req.user) return res.redirect("/auth");

    return next();
}

const Router4 = (client ,{CLIENT_ID, CLIENT_SECRET, CLIENT_REDIRECT}) => {
    
    const DiscordStrategy = require("passport-discord").Strategy;
    const passport = require("passport");

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
    passport.deserializeUser(async (id, done) => {
        
        let existUser = await client.DataBase.localStorage.Usuarios.get(id).dashboard; 
    
        if (existUser) done(null, existUser);
    });
    

    passport.use(new DiscordStrategy({
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: CLIENT_REDIRECT,
        scope: ["identify", "guilds"]
    }, async (accessToken, refreshToken, profile, done) => {
        try {

            let UserData = client.DataBase.localStorage.Usuarios.get(profile.id);

            if(!UserData) {

                client.DataBase.localStorage.Usuarios.ensure(profile.id, {
                    Usuario: {
                        Id: profile.id,
                        DataCreateIn: new Date().toLocaleTimeString('pt-br')
                    },
                    Guilds: {},
                    dashboard: {
                        id: profile.id,
                        guilds: profile.guilds
                    }

                });

                UserData = await client.DataBase.localStorage.Usuarios.get(profile.id)
            }

            if(!UserData.dashboard) {

                UserData.dashboard = {
                    id: profile.id,
                    guilds: profile.guilds
                }

                await client.DataBase.localStorage.Usuarios.set(profile.id, UserData);
                UserData = await client.DataBase.localStorage.Usuarios.get(profile.id);
            }
            done(null, UserData.dashboard);

        } catch (error) { done(error, null) }})
    )};

module.exports = {
    AuthDiscord: Router1,
    LogoutDiscord: Router2,
    isAuth: Router3,
    AuthAuthorization: Router4
}