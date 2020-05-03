const express = require('express');
const session = require('express-session');
// Database setup
const Sequelize = require('sequelize');
// initalize sequelize with session store
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const PORT = process.env.PORT || 3002;
const db = new Sequelize(
    "sessions_practice",
    "postgres",
    "postgres", 
    {
        "host": "localhost",
        "dialect": "postgres"
    });
const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
// app.use(cookieParser()); Shouldn't need this if we're not dealing with cookies
const myStore = new SequelizeStore({
    db: db
});
app.use(session({
    secret: 'keyboard cat',
    store: myStore,
    resave: false,
    proxy: true
}));
myStore.sync();
// our own middleware
app.use(function(req, res, next) {
    if (req.session) {
        next();
    } else {
        res.redirect('/empty');
    }
})
app.get('/empty', function(req, res, next) {
    res.render('empty');
})
app.get('/ping', (req, res, next) => {
    if (req.session.views) {
        req.session.views++
        res.json(req.session.views);
    } else {
        req.session.views = 1;
        res.send('New counter');
    }
})
app.get('/counter', (req, res, next) => {
    res.json(req.session.views);
})
app.listen(PORT, () => {
    console.log(`Server is UP and LISTENING on Port: ${PORT}`);
})