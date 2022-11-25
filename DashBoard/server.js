const { AuthDiscord, LogoutDiscord, isAuth, AuthAuthorization } = require("../Estrutura-Base/IndentifyDiscord"),
      express = require("express"),
      app = express(),
      compression = require("compression"),
      bodyParser = require("body-parser"),
      session = require("express-session"),
      passport = require("passport");

const Server = async (client, port) => {

    await AuthAuthorization(client ,client.config)

    app.use(session({secret: `Secret${Date.now()}${client.config.CLIENT_ID}${Date.now()}Secret`
      ,cookie: { maxAge: 60000 * 60 * 24 }, resave: false,saveUninitialized: false,name: ".SecurityToken"}))

    .set("view engine", "ejs")

    .use(express.static(`${__dirname}/assets`))

    .set("views", `${__dirname}/views`)

    .use(passport.initialize())

    .use(passport.session())

    .use(compression())

    .use(bodyParser.urlencoded({extended: true}))

    .enable("trust proxy")

    .use(bodyParser.json())

    .use(function(req, res, next) {

      req.client = client;

      next();

    })

    .use("/", require("./routes/Auth/home"))

    .use("/stylesheets/*", require('./routes/Error/404'))

    .use("/javascripts/*", require('./routes/Error/404'))

    .use("/images/*", require('./routes/Error/404'))

    .use("/fonts/*", require('./routes/Error/404'))

    .use("/auth", await AuthDiscord())

    .use("/logout", async (a, b, c) => await isAuth(a, b, c), LogoutDiscord)

    .get("*", function(req, res) { res.redirect("/") })

    .listen(port, () => {
      client.server = true
    })

}

module.exports = {
    OnStartUp: Server, // Obj que vai ser executado para ser o Evento 
}