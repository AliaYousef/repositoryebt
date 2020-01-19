const express = require('express'),
  bodyParser = require('body-parser'),
  bcrypt = require('bcryptjs'),
  jwt = require('jsonwebtoken'),
  cookie = require('js-cookie'),
  router = express.Router();

const {
  createDatabaseConnection,
  DB_NAME
} = require('../database/db.js');

router.use(bodyParser.json());
router.use(express.json());

router.get('/users', (req, res) => {
  res.json(users);
})

const  http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hello World!');
  res.end();
}).listen(3030);


//  الي يعمل بوست يعني 
router.post('/users', async (req, res, err) => {
  try {
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(req.body.password, salt);
    console.log(hash);

    createDatabaseConnection((error, connection) => {
      if (error) {
        req.status(500);
        return;
      }
      connection.query(`INSERT INTO ${DB_NAME}.user (user_name,email,user_pass)
     VALUES ('${req.body.username}','${req.body.email}','${hash}');`, function (err, result) {
        if (err) throw err;
        console.log(result);
        connection.end();
        res.status(201).send(result);
      });
    });

  } catch {
    res.status(500).send();
  }
});



router.post('/users/login', (req, res, err) => {
  
  const users = [];
  createDatabaseConnection((error, connection) => {
    if (error) {
      req.status(500);
      return;
    };
    connection.query(`SELECT * FROM user ;`, async (error, results, fields) => {
      const user = results.find(user => user.email === req.body.email);
      console.log(user);
      if (user == null) {
        return res.status(400).send('Cannot find user')
      }
      try {
        const x = await bcrypt.compareSync(req.body.password, user.user_pass);
        console.log(x);
        if (x) {
          const token = await jwt.sign({
            email: req.body.email
          }, 'secretkey');
          console.log(token);
          res.cookie('rememberme', '1', { maxAge: 900000 });
          res.send({
            token
          });
        } else {
          res.sendStatus(400)
        }
      } catch (err) {
        console.log(err);
        res.status(500).send()
      }
    });
  });
});



module.exports = router;