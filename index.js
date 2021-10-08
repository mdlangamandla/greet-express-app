const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require("body-parser");
const flash = require('express-flash');
const session = require('express-session');
const ServicesFactory = require("./servicesFactory");

const app = express();
const pg = require("pg");
const { Routes } = require("./Routes");

const Pool = pg.Pool;

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = false;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/db';

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

var servicesFactory = ServicesFactory(pool)
app.use(session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({ partialsDir: "./views/partials", viewPath: './views', layoutsDir: './views/layouts' }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 3011;
const routes = Routes(servicesFactory);

app.get("/", routes.home) 
app.post("/bulisa", routes.bulisa)
app.post("/reset", routes.reset)
app.post("/greeted", routes.greeted)
app.get("/counter/:userGreeted", routes.userGreeted)
app.post("/action", routes.action )

app.listen(PORT, () => {
    console.log("Listening at PORT: " + PORT);
})
