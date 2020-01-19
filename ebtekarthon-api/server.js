const
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    juries = require('./api/apijuries'),
    ebte_event = require('./api/apievent.js'),
    header = require('./api/header'),
    schedule = require('./api/day'),
    login = require('./api/apilogin'),
    contact =require('./api/apicontact'),    
    speaker = require('./api/apispeaker'),
    partners = require('./api/apipartners'),
    cors = require('cors'),
    // login = require('./api/apilogin'),
    db = require('./database/db'),
    port = 3000 ;
    app.use(cors());
    app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));
app.use('/images/speaker',express.static( process.cwd() + '/images/speaker' ));
app.use('/images/logos',express.static( process.cwd() + '/images/logos' ));
app.use('/images/home',express.static( process.cwd() + '/images/home' ));
app.use('/images/partner',express.static( process.cwd() + '/images/partner' ));
app.use('/images/contact',express.static( process.cwd() + '/images/contact' ));
app.use('/images/juries',express.static( process.cwd() + '/images/juries' ));

app.use(login);
app.use(juries);
app.use(bodyParser.json());
app.use(header);
app.use(schedule);
app.use(contact);
app.use(speaker);
app.use(partners);
app.use(ebte_event);

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});

