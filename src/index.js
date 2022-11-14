const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const session = require('express-session')
const flash = require('connect-flash');
require('./passport/auth');

// settings
var app = express();

//middlewares
app.use(session({
    secret: 'Jveronelli',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next)=>{
    app.locals.Message = req.flash('Message');
    app.locals.MessageErr = req.flash('MessageErr')
    next();
})

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname + '/public'));

// rutas
const router = require('./routes/routes');
router(app)

//Database 
const db = require('./db');
const keys = require('./keys');
db(keys.mongodb.URI);


// execute
app.listen(8080,()=>{
    try{
        console.log('App escuchando en el puerto 8080 [ http://localhost:8080 ]')
    }
    catch(err){
    console.log(err)
    }
});