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

router.post('/sign-up', (req, res)=>{
  console.log(req.body);
  db.collection('customers').findOne({phoneNum : req.body.phoneNum}, (err, result)=>{
    if (err) console.log(err);
    if (result) {
      res.send('phone number existed');
    } else {
      bcrypt.hash(req.body.pw, saltRounds, (err, hash)=>{
        db.collection('customers').insertOne({
          nickName : req.body.nickName,
          id : req.body.id,
          pw : hash,
          name : req.body.name,
          phoneNum : req.body.phoneNum,
          addressNum : req.body.addressNum,
          address : req.body.address,
          detailAddress : req.body.detailAddress,
          point : 0,
        }, (err, result)=>{
          if (err) console.log(err);
          res.send('sign-up success');
        });
      });
    }
  });
});

router.post('/login', passport.authenticate('local', {
  failureRedirect : '/api/customer/loginFail',
}), (req, res)=>{
  console.log(req.body);
  db.collection('customers').findOne({id : req.body.id}, (err, result)=>{
    if(err) console.log(err);
    res.send(result.nickName);
  });
});

router.get('/loginFail', (req, res)=>{
  res.send('login fail');
});

router.get('/sign-up/nick-check', (req, res)=>{
  console.log(req.query.nick);
  db.collection('customers').findOne({nickName : req.query.nick}, (err, result)=>{
    console.log(result);
    if(result) {
      res.send('existed');
    } else res.send('success');
  });
});

router.get('/sign-up/id-check', (req, res)=>{
  console.log(req.query.id);
  db.collection('customers').findOne({id : req.query.id}, (err, result)=>{
    console.log(result);
    if(result) {
      res.send('existed');
    } else res.send('success');
  });
});

router.get('/login-check', loginCheck, (req, res)=>{
  console.log(req.user.nickName);
  res.send(req.user.nickName);
})

router.get('/logout', (req, res)=>{
  req.session.destroy();
  res.send('logout success');
})







passport.use(new LocalStrategy({
  usernameField: 'id',
  passwordField: 'pw',
  session: true,
  passReqToCallback: false,
}, (inputId, inputPw, done)=>{
  console.log(inputId, inputPw);
  db.collection('customers').findOne({id : inputId}, (err, result)=>{
    if(err) return done(err);
    console.log(result);
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
    res.send('not login');
  }
}

module.exports = router;