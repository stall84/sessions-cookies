const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();


app.use(cookieParser());


app.use(session({
    secret: 'keyboard cat',
    cookie: {secure: false,
        }
}));

app.use((req,res,next) => {
    if (req.session.views) {
        console.log(`You have ${req.session.views} views`)
        next();
    } else {
        next();
    }
});

app.listen(3000, () => {
    console.log('Listening on 3Grand');
});

/*
app.get('/ping', (req,res) => {
    res.send('pong')
});
*/
app.get('/ping', (req,res) => {
    if (req.session.views) {
        req.session.views++
        res.json(req.session.views);
    } else {
        req.session.views = 1;
        res.send('New Counter: ')
    }
});

app.get('/counter', (req,res) => {
    res.json(req.session.views)
});