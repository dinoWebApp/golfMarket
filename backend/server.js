const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const MongoClient = require('mongodb').MongoClient;
const MongoStore = require('connect-mongo');
const bcrypt = require('bcryptjs');
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

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.json());
app.use(cors());
app.use(session({
  secret : 'secretcode',
  resave : true,
  saveUninitialized : false,
  store : new MongoStore({mongoUrl : process.env.DB_URL}),
  cookie : {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/customer', require('./routes/customer.js'));
app.use('/api/product', require('./routes/product.js'));
app.use('/api/admin', require('./routes/admin.js'));
app.use('/static',express.static(__dirname + '/public'));

MongoClient.connect(process.env.DB_URL, (err, client)=>{
  if (err) return console.log(err);
  db = client.db('tgolshop');
  app.listen(process.env.PORT, ()=>{
    console.log('listening on 3000');
  });
});



app.get('/api/', (req, res)=>{
  db.collection('products').find().limit(6).sort({reviews : -1}).toArray()
  .then(result=>{
    console.log(result);
    res.send(result);
  })
});

app.get('/api/search', (req, res)=>{
  db.collection('products').find({$text : {$search : req.query.searchText}}).toArray()
  .then(result=>{
    res.send(result);
  })
  .catch(err=>{
    console.log(err);
  })
})

app.get('/api/admin-check', loginCheck, (req, res)=>{
  let adminData = [req.user.nickName, req.user.id];
  res.send(adminData);
});

app.post('/api/admin-pw', (req, res)=>{
  db.collection('admin').findOne({id : 'admin'}, (err, result)=>{
    bcrypt.compare(req.body.pw, result.pw, (err, isMatch)=>{
      if (err) console.log(err);
      if (isMatch) {
        res.send('ok');
      } else res.send('fail');
    })
  })
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

