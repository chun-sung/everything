// module load
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const MariaDBStore = require('express-mysql-session')(session);
require('dotenv').config({ path:'.env'});

// template engine EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// route module load
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const membershipRouter = require('./routes/membership');
const topicRouter = require('./routes/topic');
const myMenu = require('./routes/my-menu');
const memberInfo = require('./routes/member-info');
const nodejs = require('./routes/nodejs');
const database = require('./routes/database');
const javascript = require('./routes/javascript');
const ajax = require('./routes/ajax');
const json = require('./routes/json');
const bootstrap = require('./routes/bootstrap');
const jquery = require('./routes/jquery');
const react = require('./routes/react');
const vue = require('./routes/vue');

// middleware
app.use(bodyParser.urlencoded( {extended: false}));
app.use(session({
    secret: 'abcd#!%efghijk',
    resave: false,
    saveUninitialized: true,
    store: new MariaDBStore({
        host: 'localhost',
        port: 3306,
        user: process.env.admin,
        password: process.env.passwd,
        database: 'o2'
    })
}));

// Route middleware
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/membership', membershipRouter);
app.use('/topic', topicRouter);
app.use('/my-menu', myMenu)
app.use('/member-info', memberInfo)
app.use('/nodejs', nodejs)
app.use('/database', database)
app.use('/javascript', javascript)
app.use('/ajax', ajax)
app.use('/json', json)
app.use('/bootstrap', bootstrap)
app.use('/jquery', jquery)
app.use('/react', react)
app.use('/vue', vue)

// common folder
app.use('/notfound', express.static('./public'))
app.use(express.static('./uploads'))

// 404 page
app.use((req, res) => {
    res.render('404page');
});

// server listen
app.listen(80, () => {
    console.log('Server Running Port 80...')
});