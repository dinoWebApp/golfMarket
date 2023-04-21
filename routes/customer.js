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
          addressName : req.body.addressName,
          detailAddress : req.body.detailAddress,
          point : 3000,
          cart : []
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
});

router.get('/mypage', loginCheck, (req, res)=>{
  console.log(req.query.nickName);
  let customer = req.query.nickName;
  let customerInfo = {
    purchaseData : [],
    cart : [],
    qna : [],
    id : '',
    nickName : '',
    name : '',
    phoneNum : '',
    addressNum : '',
    address : '',
    addressName : '',
    detailAddress : '',
    point : 0
  }
  console.log()
  db.collection('customers').findOne({nickName : customer})
  .then(result=>{
    console.log(result);
    customerInfo.cart = result.cart;
    customerInfo.id = result.id;
    customerInfo.nickName = result.nickName;
    customerInfo.name = result.name;
    customerInfo.phoneNum = result.phoneNum;
    customerInfo.addressNum = result.addressNum;
    customerInfo.address = result.address;
    customerInfo.addressName = result.addressName;
    customerInfo.detailAddress = result.detailAddress;
    customerInfo.point = result.point;
    return db.collection('purchaseData').find({nickName : result.nickName}).sort({orderId : -1}).toArray()
  })
  .then(result=>{
    customerInfo.purchaseData = result;
    return db.collection('personalQna').find({nickName : customer}).sort({id : -1}).toArray()
  })
  .then(result=>{
    customerInfo.qna = result;
    res.send(customerInfo);
  })
  .catch(err=>{
    console.log(err);
  })

});

router.get('/mypage/getNick', (req, res)=>{
  if(!req.user) res.send('need login');
  else {
    res.send(req.user.nickName);
  }
});

router.get('/findId', (req, res)=>{
  let nickName = req.query.nickName;
  let phoneNum = req.query.phoneNum;
  db.collection('customers').findOne({nickName : nickName})
  .then(result=>{
    if(!result) {
      res.send('wrong nickName');
    } else {
      if(result.phoneNum === phoneNum) {
        res.send(result.id);
      } else {
        res.send('wrong phoneNum');
      }
    }
  })
  .catch(err=>{
    console.log(err);
  })
});

router.get('/findPw', (req, res)=>{
  let nickName = req.query.nickName;
  let phoneNum = req.query.phoneNum;
  let id = req.query.id;
  db.collection('customers').findOne({id : id})
  .then(result=>{
    if(!result) {
      res.send('wrong id');
    } else {
      if(result.nickName !== nickName) {
        res.send('wrong nickName');
      } else if(result.phoneNum !== phoneNum){
        res.send('wrong phoneNum');
      } else {
        res.send('success');
      }
    }
  })
  .catch(err=>{
    console.log(err);
  })
});



router.delete('/mypage/deleteCart', (req, res)=>{
  let cartId = parseInt(req.query.cartId);
  db.collection('customers').updateOne({nickName : req.query.nickName}, {$pull : {cart : {cartId : cartId}}})
  .then(()=>{
    return db.collection('customers').findOne({nickName : req.query.nickName})
  })
  .then(result=>{
    res.send(result.cart);
    
  })
  .catch(err=>{
    console.log(err);
  })
});

router.put('/mypage/reviewSubmit', (req, res)=>{
  let curr = new Date();
  let utc = curr.getTime() + (curr.getTimezoneOffset()*60*1000);
  let KR_TIME_DIFF = 9*60*60*1000;
  let kr_curr = new Date(utc + KR_TIME_DIFF);
  let data = req.body;
  let year = kr_curr.getFullYear();
  let month = kr_curr.getMonth() + 1;
  let date = kr_curr.getDate();
  let hours = kr_curr.getHours();
  let minutes = kr_curr.getMinutes();
  let today = (year + '-' + month + '-' + date  + ' ' + hours + ':' + minutes );
  let reviewData = {
    stars : parseInt(data.star),
    comment : data.text,
    user : data.nickName,
    productId : data.productId,
    orderId : data.orderId,
    date : today
  }
  db.collection('reviews').insertOne(reviewData)
  .then(()=>{
    return db.collection('products').updateOne({id : data.productId}, {$inc : {reviews : 1}});
  })
  .then(()=>{
    return db.collection('customers').updateOne({nickName : data.nickName}, {$inc : {point : 300}});
  })
  .then(()=>{
    return db.collection('purchaseData').updateOne({orderId : data.orderId}, {$set : {review : true}});
  })
  .then(()=>{
    res.send('success');
  })
  .catch(err=>{
    console.log(err);
  })
});

router.post('/mypage/personalQna', (req, res)=>{
  let curr = new Date();
  let utc = curr.getTime() + (curr.getTimezoneOffset()*60*1000);
  let KR_TIME_DIFF = 9*60*60*1000;
  let kr_curr = new Date(utc + KR_TIME_DIFF);
  let year = kr_curr.getFullYear();
  let month = kr_curr.getMonth() + 1;
  let date = kr_curr.getDate();
  let hours = kr_curr.getHours();
  let minutes = kr_curr.getMinutes();
  let today = (year + '-' + month + '-' + date  + ' ' + hours + ':' + minutes );
  db.collection('personalQnaId').findOne({name : 'personalQnaId'})
  .then(result=>{
    let data = {
      id : result.id + 1,
      nickName : req.body.nickName,
      text : req.body.text,
      adminText : '',
      reply : false,
      date : today
    }
    return db.collection('personalQna').insertOne(data)
  })
  .then(()=>{
    return db.collection('personalQnaId').updateOne({name : 'personalQnaId'}, {$inc : {id : 1}});
  })
  .then(()=>{
    return db.collection('personalQna').find({nickName : req.body.nickName}).sort({id : -1}).toArray()
  })
  .then(result=>{
    console.log(result);
    res.send(result);
  })
  .catch(err=>{
    console.log(err);
  })
  
});

router.put('/mypage/changeData', (req, res)=>{
  let data = req.body
  db.collection('customers').updateOne({nickName : req.user.nickName}, {$set : {
    name : data.name,
    phoneNum : data.phoneNum,
    addressNum : data.addressNum,
    address : data.address,
    addressName : data.addressName,
    detailAddress: data.detailAddress
  }})
  .then(()=>{
    res.send('success');
  })
  .catch(err=>{
    console.log(err);
  })
});

router.put('/changePw', (req, res)=>{
  bcrypt.hash(req.body.pw, saltRounds)
  .then(hash=>{
    return db.collection('customers').updateOne({nickName : req.body.nickName}, {$set : {pw : hash}})
  })
  .then(()=>{
    res.send('success');
  })
  .catch(err=>{
    console.log(err);
  })
});

router.delete('/out', (req, res)=>{
  let nickName = req.query.nickName;
  db.collection('personalQna').deleteMany({nickName : nickName})
  .then(()=>{
    return db.collection('purchaseData').deleteMany({nickName : nickName})
  })
  .then(()=>{
    return db.collection('customers').deleteOne({nickName : nickName})
  })
  .then(()=>{
    req.session.destroy();
    res.send('success');
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