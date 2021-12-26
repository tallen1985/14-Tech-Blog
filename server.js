const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const helpers = require("./utils/helper-functions");
const app = express();
const PORT = process.env.PORT || 3001;
const sequelize = require("./config/connection");

//create handlebars instance and include helper functions
const hbs = exphbs.create({ helpers });

//initialize sequelizeStore to handle cookies
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sess = {
  secret: "LucyIanSarahJake",
  cookie: {
    //maxAge is for an hour
    maxAge: 1000 * 60 * 60,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
//tell express to use session
app.use(session(sess));

//initialize handlebars as template engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

//initialize middleware for parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//initialize routing for Routes
app.use(require("./controllers/index"));

//create sequelize instance and activate server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
