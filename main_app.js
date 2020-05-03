const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3001;

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

app.listen(PORT, () => {
    console.log(`Server UP and LISTENING on PORT: ${PORT}`);
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