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
    
    cb(null, new Date().toISOString() + file.originalname);
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
});

router.get('/purchase/:id', (req, res)=>{
  console.log(req.params.id);
  let userInfo = 'not login'
  if(req.user !== undefined) userInfo = req.user;
  let productId = parseInt(req.params.id);
  let sendData = {
    userInfo : userInfo,
    product : {},
    relatedList : [],
    reviews :[],
    totalReview : {
      average : 0,
      fivePer : 0,
      fourPer : 0,
      threePer : 0,
      twoPer : 0,
      onePer : 0,
    },
  }

  db.collection('products').findOne({id : productId})
  .then(result=>{
    console.log(result);
    sendData.product = result;
    return db.collection('products').find({divide : result.divide}).limit(6).sort({reviews : -1}).toArray();
  })
  .then(result=>{
    sendData.relatedList = result;
    console.log(result);
    return db.collection('reviews').find({productId : productId}).toArray();
  })
  .then(result=>{
    sendData.reviews = result;
    let starArray = result.map(review=>{
      return review.stars;
    });
    let average = 0;
    let total = 0;
    starArray.forEach(stars=>total+=stars);
    average = total/starArray.length;
    sendData.totalReview.average = average;
    sendData.totalReview.fivePer = (starArray.filter(e => 5 === e).length / starArray.length)*100;
    sendData.totalReview.fourPer = (starArray.filter(e => 4 === e).length / starArray.length)*100;
    sendData.totalReview.threePer = (starArray.filter(e => 3 === e).length / starArray.length)*100;
    sendData.totalReview.twoPer = (starArray.filter(e => 2 === e).length / starArray.length)*100;
    sendData.totalReview.onePer = (starArray.filter(e => 1 === e).length / starArray.length)*100;
    console.log(sendData);
    res.send(sendData);
  })
  .catch(err=>{
    console.log(err);
    res.status(404).send('not found');
  })
});

router.get('/purchase-detail', loginCheck, (req, res)=>{
  let userData = {
    nickName: req.user.nickName,
    name: req.user.name,
    phoneNum: req.user.phoneNum,
    addressNum : req.user.addressNum,
    address : req.user.address,
    addressName : req.user.addressName,
    detailAddress : req.user.detailAddress
  }
  res.send(userData)
});

router.get('/submit', (req, res)=>{
  res.send(req.user.nickName);
})



router.post('/upload', upload.fields([{name: 'thumbnail'}, {name: 'infoImage'}]), (req, res)=>{
  console.log(req.files);
  let data = JSON.parse(req.body.data);
  db.collection('productNum').findOne({name : 'productId'}, (err, result)=>{
    let productNum = result.totalProducts;
    let dataSet = {
      id : productNum + 1,
      divide : data.divide,
      brand : data.brand,
      productName : data.productName,
      beforeDiscount : data.beforeDiscount,
      productPrice : data.productPrice,
      optionData : data.optionData,
      deliverKor : data.deliverKor,
      deliverOut : data.deliverOut,
      thumbnail : req.files.thumbnail[0].filename,
      infoImage : req.files.infoImage[0].filename,
      reviews : 0
    };
    db.collection('products').insertOne(dataSet, (err, result)=>{
      if (err) console.log(err);
      db.collection('productNum').updateOne({name : 'productId'}, {$inc : {totalProducts : 1}}, (err, result)=>{
        res.send('upload success');
      });
    });
  });
});

router.post('/purchase', (req, res)=>{
  let data = req.body
  console.log(data);
  db.collection('orderId').findOne({name : 'orderId'})
  .then(result=>{
    let orderId = result.orderId;
    let purchaseData = {
      cartBool : false,
      nickName : data.nickName,
      name : data.name,
      phoneNum : data.phoneNum,
      addressNum : data.addressNum,
      address : data.address,
      addressName : data.addressName,
      detailAddress : data.detailAddress,
      productId : data.productId,
      productName : data.productName,
      orderNum : data.orderNum,
      optionText : data.optionText,
      totalPrice : data.totalPrice,
      orderId : orderId + 1,
      deliNum : 0,
      currentState : '결제완료'
    }
    return db.collection('purchaseData').insertOne(purchaseData)
  })
  .then(()=>{
    return db.collection('orderId').updateOne({name : 'orderId'}, {$inc : {orderId : 1}})
  })
  .then(()=>{
    res.send('purchase success');
  })
  .catch(err=>{
    console.log(err);
  });
});

router.post('/cartPurchase', (req, res)=>{
  let data = req.body;
  for(let i = 0; i < data.length; i++) {
    db.collection('orderId').findOne({name : 'orderId'})
    .then(result=>{
      let orderId = result.orderId;
      let purchaseData = {
        cartBool : true,
        nickName : data[i].nickName,
        name : data[i].name,
        phoneNum : data[i].phoneNum,
        addressNum : data[i].addressNum,
        address : data[i].address,
        addressName : data[i].addressName,
        detailAddress : data[i].detailAddress,
        productId : data[i].productId,
        productName : data[i].productName,
        orderNum : data[i].orderNum,
        optionText : data[i].optionText,
        totalPrice : data[i].totalPrice,
        orderId : orderId + 1,
        deliNum : 0,
        currentState : '결제완료'
      }
      console.log(purchaseData);
      return db.collection('purchaseData').insertOne(purchaseData)
    })
    .then(()=>{
      return db.collection('customers').updateOne({nickName : data[i].nickName}, {$pull : {cart : {cartId : data[i].cartId}}});
    })
    .then(()=>{
      return db.collection('orderId').updateOne({name : 'orderId'}, {$inc : {orderId : 1}});
    })
    .catch(err=>{
      console.log(err);
    });
  }
  res.send('purchase success');
});

router.put('/addCart', (req, res)=>{
  console.log(req.user.id);
  db.collection('cartId').findOne({name : 'cartId'})
  .then(result=>{
    let cartId = result.cartId;
    return db.collection('customers').updateOne({id : req.user.id}, {$push : {cart : 
      {
        productName : req.body.productName,
        productId : req.body.productId,
        productOption : req.body.option,
        productNum : req.body.orderNum,
        totalPrice : req.body.totalPrice,
        cartId : cartId + 1
      }
    }});
  })
  .then(result=>{
    console.log(result.data);
    return db.collection('cartId').updateOne({name : 'cartId'}, {$inc : {cartId : 1}})
  })
  .then(()=>{
    res.send('addCart success');
  })
  .catch(err=>{
    console.log(err);
  });
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
    res.send('need login');
  }
}

module.exports = router;