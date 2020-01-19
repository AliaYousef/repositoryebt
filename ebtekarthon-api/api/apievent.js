const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const router = express.Router();
const mysql = require('mysql');
router.use(bodyParser.json());
router.use(express.json());
const fs = require('fs');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "ebtekarthon"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});



//logo
router.put('/event', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      let logophoto = req.body.photo;
      let base64Image = logophoto.split(';base64,').pop();
      let imgpath = "/images/logos/logo.png";
      let fullpath = process.cwd() + imgpath;
      console.log(fullpath);
      fs.writeFile(fullpath, base64Image, {
        encoding: 'base64'
      }, function (err) {});
      const sql = `UPDATE ebtekarthon_event SET headerlogo = '${imgpath}' WHERE id = 1 ;`;
      con.query(sql, function (err, result) {
        res.send(result)
      });
    }
  });
});

router.get('/event', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const sql = `SELECT headerlogo FROM ebtekarthon_event WHERE id = 1;`;
      con.query(sql, function (err, result) {
        console.log(result);
        res.send(result)
      });
    }
  })
});

// home
router.put('/home',verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      let logophoto = req.body.photo;
      let base64Image = logophoto.split(';base64,').pop();
      let imgpath = "/images/home/logo.png";
      let fullpath = process.cwd() + imgpath;
      console.log(fullpath);
      fs.writeFile(fullpath, base64Image, {
        encoding: 'base64'
        }, function (err) {
          // console.log('File created');
          // console.log(err);
      });
      const sql = `UPDATE ebtekarthon_event SET homeimg = '${imgpath}', hometitle = '${req.body.title}', homelocation = '${req.body.location}', homedate = '${req.body.date}'  WHERE id = 1 ;`;
      con.query(sql, function (err, result) {
        // console.log(err);
        // console.log(result);
        res.send(result)
      });
    }
  });    
});
router.get('/home',verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const sql = `SELECT homeimg , hometitle, homelocation , homedate FROM ebtekarthon_event WHERE id = 1;`;
      console.log(sql);
      con.query(sql, function (err, result) {
        console.log(err);
        console.log(result);
        res.send(result)
      });
    }
  });
})



//about
router.put('/about',verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const sql = `UPDATE ebtekarthon_event SET aboutdescr = '${req.body.description}', aboutvidoe = '${req.body.vidoe}'  WHERE id = 1 ;`;
      con.query(sql, function (err, result) {
        console.log(err);
        console.log(result);
        res.send(result)
      });
    }
  });
});
router.get('/about',verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const sql = `SELECT aboutdescr, aboutvidoe FROM ebtekarthon_event WHERE id = 1;`;
      console.log(sql);
      con.query(sql, function (err, result) {
        console.log(err);
        console.log(result);
        res.send(result)
      });
    }
  });
})



//contINF
router.put('/contINF',verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const sql = `UPDATE ebtekarthon_event SET location = '${req.body.location}', numphone = '${req.body.numphone}', email = '${req.body.email}'  WHERE id = 1 ;`;
      con.query(sql, function (err, result) {
        console.log(err);
        console.log(result);
        res.send(result)
      });
    }
  });
});
router.get('/contINF',verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const sql = `SELECT location, numphone , email FROM ebtekarthon_event WHERE id = 1;`;
      console.log(sql);
      con.query(sql, function (err, result) {
        console.log(err);
        console.log(result);
        res.send(result)
      });
    }
  });
})

function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }

}
module.exports = router