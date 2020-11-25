const express = require('express');
const router = express.Router();

app.use( (req, res, next) => {
    req.message = 'This message made it!';
    next();
});

app.use((req, res, next) => {
    console.log(req.message);
    next();
});

// root route
app.get('/', (req, res) => {
    const name = req.cookies.username; 
    if (name) {
        res.render('index', {name});
    } else {    
        res.redirect('/hello');
    }
});

app.get('/cards', (req, res) => {
    res.render('card', { prompt: "Who is buried in Grants's tomb?", hint: "Think about who's tomb it is"});
});

//check if can be done with app.all('/hello')
app.get('/hello', (req, res) => {
   //let op, nog een keer cookies declaren geen issue!
   const name = req.cookies.username;
    if (name){
       res.redirect('/'); 
    } else {
       res.render('hello');
    }
});

app.post('/hello', (req, res) => {
    res.cookie('username', req.body.username );
    res.redirect('/');
});

app.post('/goodbye', (req, res) => {
    res.clearCookie('username');
    res.redirect('/hello');
});

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res , next) => {
    res.locals.error = err;
    res.status(500);
    res.render('error', err);
})