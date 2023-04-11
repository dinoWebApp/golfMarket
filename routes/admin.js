const router = require('express').Router();
const express = require('express');
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
    maxAge: 7 * 24 * 60 * 60 * 1000,
  }
}));
router.use(passport.initialize());
router.use(passport.session());

MongoClient.connect(process.env.DB_URL, (err, client)=>{
  if (err) return console.log(err);
  db = client.db('tgolshop');
});

router.get('/search', (req, res)=>{
  let type = req.query.type;
  let searchMemberText = req.query.searchMemberText;
  db.collection('customers').findOne({[type] : searchMemberText})
  .then(result=>{
    console.log(result);
    if(result.length === 0) res.send('not found');
    else res.send(result);
  })
  .catch(err=>{
    console.log(err);
  })
});

router.get('/searchProduct', (req, res)=>{
  db.collection('products').find({$and : [{brand : req.query.brand}, {divide : req.query.divide}]}).toArray()
  .then(result=>{
    res.send(result);
  })
  .catch(err=>{
    console.log(err);
  })
});

router.get('/orderData', (req, res)=>{
  db.collection('purchaseData').find().sort({orderId : -1}).toArray()
  .then(result=>{
    res.send(result);
  })
  .catch(err=>{
    console.log(err);
  })
});

router.get('/qna', (req, res)=>{
  db.collection('qna').find().sort({id : -1}).toArray()
  .then(result=>{
    res.send(result);
  })
  .catch(err=>{
    console.log(err);
  })
});

router.get('/personalQna', (req, res)=>{
  db.collection('personalQna').find().sort({id : -1}).toArray()
  .then(result=>{
    res.send(result);
  })
  .catch(err=>{
    console.log(err);
  })
})

router.put('/changePoint', (req, res)=>{
  let point = parseInt(req.body.point);
  
  db.collection('customers').updateOne({nickName : req.body.nickName}, {$set : {point : point}})
  .then(()=>{
    return db.collection('customers').findOne({nickName : req.body.nickName})
  })
  .then(result=>{
    res.send(result);
  })
  .catch(err=>{
    console.log(err);
  })
});

router.put('/changeState', (req, res)=>{
  let orderId = req.body.orderId;
  let currentState = req.body.currentState;
  db.collection('purchaseData').updateOne({orderId : orderId}, {$set : {currentState : currentState}})
  .then(()=>{
    return db.collection('purchaseData').findOne({orderId : orderId});
  })
  .then(result=>{
    let state = result.currentState;
    res.send(state);
  })
  .catch(err=>{
    console.log(err);
  })
});

router.put('/changeDeliNum', (req, res)=>{
  let orderId = parseInt(req.body.orderId);
  let deliNum = req.body.deliNum;
  db.collection('purchaseData').updateOne({orderId : orderId}, {$set : {deliNum : deliNum}})
  .then(()=>{
    return db.collection('purchaseData').findOne({orderId : orderId});
  })
  .then(result=>{
    let sendData = result.deliNum;
    res.send(sendData);
  })
  .catch(err=>{
    console.log(err);
  })
});

router.put('/submitReply', (req, res)=>{
  let id = req.body.id;
  let adminText = req.body.adminText;
  db.collection('qna').updateOne({id : id}, {$set : {adminText : adminText, reply : true}})
  .then(()=>{
    res.send('success');
  })
  .catch(err=>{
    console.log(err);
  })
});

router.put('/submitPersonalReply', (req, res)=>{
  let id = req.body.id;
  let adminText = req.body.adminText;
  console.log(adminText);
  db.collection('personalQna').updateOne({id : id}, {$set : {adminText : adminText, reply : true}})
  .then(()=>{
    res.send('success');
  })
  .catch(err=>{
    console.log(err);
  })
})

router.delete('/deleteProduct', (req, res)=>{
  let id = parseInt(req.query.id);
  let brand = req.query.brand;
  let divide = req.query.divide;
  db.collection('products').deleteOne({id : id})
  .then(()=>{
    return db.collection('products').find({$and : [{brand : brand}, {divide : divide}]}).toArray();
  })
  .then(result=>{
    res.send(result);
  })
  .catch(err=>{
    console.log(err);
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