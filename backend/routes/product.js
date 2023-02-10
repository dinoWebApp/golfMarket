const router = require('express').Router();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const MongoClient = require('mongodb').MongoClient;
const MongoStore = require('connect-mongo');
const bcrypt = require('bcrypt');
const saltRounds = 12;
let multer = require('multer');
let storage = multer.diskStorage({
  destination : function(req, file, cb){
    cb(null, './public/image');
  },
  filename : function(req, file, cb){
    
    cb(null, file.originalname);
  }
});
let upload = multer({storage : storage});
require('dotenv').config();
let db;

router.use(bodyParser.urlencoded({extended : true}));
router.use(express.json());
router.use(cors());
router.use(session({
  secret : 'secretcode',
  resave : true,
  saveUninitialized : false,
  store : new MongoStore({mongoUrl : process.env.DB_URL}),
  cookie : {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  }
}));
router.use(passport.initialize());
router.use(passport.session());

MongoClient.connect(process.env.DB_URL, (err, client)=>{
  if (err) return console.log(err);
  db = client.db('tgolshop');
});


router.get('/driver', (req, res)=>{
  db.collection('products').find({divide : '드라이버'}).toArray((err, result)=>{
    console.log(result);
    res.send(result);
  })
});

router.get('/driver/ping', (req, res)=>{
  db.collection('products').find({divide : '드라이버', brand : '핑'}).toArray((err, result)=>{
    console.log(result);
    res.send(result);
  })
});

router.get('/driver/brand', (req, res)=>{
  
  let brandName = req.query.brandName;
  console.log(brandName);
  db.collection('products').find({divide : '드라이버', brand : brandName}).toArray((err, result)=>{
    console.log(result);
    res.send(result);
  })
})


router.post('/upload', upload.fields([{name: 'thumbnail'}, {name: 'infoImage'}]), (req, res)=>{
  console.log(req.files);
  let data = JSON.parse(req.body.data);
  db.collection('products').insertOne({
    divide : data.divide,
    brand : data.brand,
    productName : data.productName,
    productPrice : data.productPrice,
    deliverKor : data.deliverKor,
    deliverOut : data.deliverOut,
    thumbnail : req.files.thumbnail[0].filename,
    infoImage : req.files.infoImage[0].filename
  }, (err, result)=>{
    if (err) console.log(err);
    res.send('upload success');
  });
});









passport.use(new LocalStrategy({
  usernameField: 'id',
  passwordField: 'pw',
  session: true,
  passReqToCallback: false,
}, (inputId, inputPw, done)=>{
  console.log(inputId, inputPw);
  db.collection('customers').findOne({id : inputId}, (err, result)=>{
    if(err) return done(err);
    if(!result) return done(null, false, {message : 'id fail'});
    bcrypt.compare(inputPw, result.pw, (err, isMatch)=>{
      if (err) return done(err);
      if (isMatch) {
        return done(null, result);
      }else{
        return done(null, false, {message : 'password fail'});
      }
    });
  });
}));

passport.serializeUser((user, done)=>{
  done(null, user.id);
});
passport.deserializeUser((id, done)=>{
  db.collection('customers').findOne({id : id}, (err, result)=>{
    done(null, result);
  });
});

function loginCheck(req, res, next) {
  if (req.user) {
    next();
  }else {
    res.send('need login');
  }
}

module.exports = router;