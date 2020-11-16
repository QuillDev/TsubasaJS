const path = require("path");
const proxy = require('express-http-proxy');

function setupApp(app) {
    //Directory for pages to be server from
    const pages = path.join(__dirname, "public", "pages");

    //main page route
    app.get("/", (req, res) => {
        res.sendFile(path.join(pages, "index.htm"));
    });

    //if the tsubasa prefix is used, redirect to the invite url
    app.get("tsubasa", (req, res) => {
        res.redirect(301, 'https://discord.com/oauth2/authorize?client_id=753764233484828703&permissions=2147483639&scope=bot');
    });

    //proxy to mc server url
    app.use('minecraft', proxy(`${process.env.IP}:25565`));

    //Routes to projects
    app.get("/tsubasa", (req, res) => {
        res.sendFile(path.join(pages, "tsubasa.htm"));
    });

    //Add the source endpoint
    app.get("/tsubasa/helper/source", (req, res) => {
        res.redirect(301, 'https://github.com/QuillDev/TsubasaJS');
    });

    //Add the changelog endpoint
    app.get("/tsubasa/changes", (req, res) => {
        res.sendFile(path.join(pages, "changelog.htm"));
    });

    //if we didnt get locked 404 that bih
    app.get("*", (req, res) => {
        res.sendFile(path.join(pages, "404.htm"));
    });

    //Listen on port 80 for any traffic
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        //TODO Add logger message for this
    });
}

module.exports = {
    setup: setupApp
}