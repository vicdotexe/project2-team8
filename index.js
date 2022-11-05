const express = require('express');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const session = require("express-session")

// Set up the Express App
const app = express();
const PORT = process.env.PORT || 3000;


// Set Express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Express to use sessions
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge:2*60*60*1000
    }
}))

// Set the static directory
app.use(express.static('public'));

// Create handlebars engine, add it to express, and set it as the view engine.
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const rootRouter = require('./controllers');
app.use(rootRouter);

// sync sequalize and then start express
sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
    });
});