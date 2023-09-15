// 관리자 페이지 api
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
  secret : process.env.SECRET_CODE,
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


//회원찾기
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


// 주문 목록 불러오기
router.get('/orderData', (req, res)=>{
  db.collection('purchaseData').find().sort({orderId : -1}).toArray()
  .then(result=>{
    res.send(result);
  })
  .catch(err=>{
    console.log(err);
  })
});

// 문의 내역 불러오기
router.get('/qna', (req, res)=>{
  db.collection('qna').find().sort({id : -1}).toArray()
  .then(result=>{
    res.send(result);
  })
  .catch(err=>{
    console.log(err);
  })
});

// 개인 문의 내역 불러오기
router.get('/personalQna', (req, res)=>{
  db.collection('personalQna').find().sort({id : -1}).toArray()
  .then(result=>{
    res.send(result);
  })
  .catch(err=>{
    console.log(err);
  })
});


// 전체 상품 불러오기
router.get('/allProducts', (req, res)=>{
  
  db.collection('products').find().toArray()
  .then(result=>{
    res.send(result);
  })
  .catch(err=>{
    console.log(err);
  })
});


// 피팅 문의 불러오기
router.get('/fittingQna', (req, res)=>{
  db.collection('fitting').find().sort({id : -1}).toArray()
  .then(result=>{
    res.send(result);
  })
  .catch(err=>{
    console.log(err);
  })
});


// 비회원 문의 불러오기
router.get('/nonMemberQna', (req, res)=>{
  db.collection('nonMemberQna').find().sort({id : -1}).toArray()
  .then(result=>{
    res.send(result);
  })
  .catch(err=>{
    console.log(err);
  })
});


router.get('/paymentKey', (req, res)=>{
  db.collection('purchaseReport').findOne({orderId : req.query.orderId.toString()})
  .then(result=>{
    res.send(result.paymentKey);
  })
  .catch(err=>{
    console.log(err);
  });
})


// 포인트 변경
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


// 주문 상태 변경
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


// 운송장 번호 수정
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

// 문의 답변
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
});


//피팅 문의 답변
router.put('/fitting/submit', (req, res)=>{
  let id = req.body.id;
  let adminText = req.body.adminText;
  db.collection('fitting').updateOne({id : id}, {$set : {adminText : adminText, reply : true}})
  .then(()=>{
    res.send('success');
  })
  .catch(err=>{
    console.log(err);
  })
});


// 비회원 문의 답변
router.put('/nonMemberQna/submit', (req, res)=>{
  let id = req.body.id;
  let adminText = req.body.adminText;
  db.collection('nonMemberQna').updateOne({id : id}, {$set : {adminText : adminText, reply : true}})
  .then(()=>{
    res.send('success');
  })
  .catch(err=>{
    console.log(err);
  })
});


//결제 취소 처리
router.put('/cancel', (req, res)=>{
  let orderId = req.body.orderId;
  db.collection('purchaseData').updateOne({orderId : orderId}, {$set : {currentState : '결제취소'}})
  .then(()=>{
    return db.collection('purchaseData').find().sort({orderId : -1}).toArray();
  })
  .then(result=>{
    res.send(result);
  })
  .catch(err=>{
    console.log(err);
  })
});


// 상품 옵션 수정
router.put('/optionEdit', (req, res)=>{
  let productName = req.body.productName;
  let optionText = req.body.optionText;
  let optionEditText = req.body.optionEditText;
  let optionEditPrice = req.body.optionEditPrice;
  db.collection('products').updateOne({productName : productName},
    {$set : {'optionData.$[elem].optionText' : optionEditText, 'optionData.$[elem].optionPrice' : optionEditPrice}},
    {arrayFilters : [{'elem.optionText' : optionText}]})
  .then(()=>{
    return db.collection('products').findOne({productName : productName})
  })
  .then(result=>{
    res.send(result);
  })
  .catch(err=>{
    console.log(err);
  });
})


// 옵션 삭제
router.put('/optionDelete', (req, res)=>{
  db.collection('products').updateOne({productName : req.body.productName}, {$pull : {optionData : {optionText : req.body.optionText}}})
  .then(()=>{
    return db.collection('products').findOne({productName : req.body.productName})
  })
  .then(result=>{
    res.send(result);
  })
  .catch(err=>{
    console.log(err);
  })
});



// 옵션 추가
router.put('/addEditOption', (req, res)=>{
  db.collection('products').updateOne({productName : req.body.productName}, {$push : {optionData : {optionText : req.body.optionText, optionPrice : req.body.optionPrice}}})
  .then(()=>{
    return db.collection('products').findOne({productName : req.body.productName});
  })
  .then(result=>{
    res.send(result);
  })
  .catch(err=>{
    console.log(err);
  });
});

router.put('/editProductName', (req, res)=>{
  let productName = req.body.productName;
  let editProductName = req.body.editProductName;
  db.collection('products').updateOne({productName : productName}, {$set : {productName : editProductName}})
  .then(()=>{
    res.send('edit productName');
  })
  .catch(err=>{
    console.log(err);
  });
})


router.put('/editBeforeDiscount', (req, res)=>{
  let productName = req.body.productName;
  let beforeDiscount = req.body.beforeDiscount;
  db.collection('products').updateOne({productName : productName}, {$set : {beforeDiscount : beforeDiscount}})
  .then(()=>{
    res.send('edit beforeDiscount');
  })
  .catch(err=>{
    console.log(err);
  });
});

router.put('/editProductPrice', (req, res)=>{
  let productName = req.body.productName;
  let productPrice = req.body.productPrice;
  db.collection('products').updateOne({productName : productName}, {$set : {productPrice : productPrice}})
  .then(()=>{
    res.send('edit price');
  })
  .catch(err=>{
    console.log(err);
  })
});


// 썸네일 변경
router.put('/editThumb', (req, res)=>{
  let productName = req.body.productName;
  let thumbnail = req.body.thumbnail;
  db.collection('products').updateOne({productName : productName}, {$set : {thumbnail, thumbnail}})
  .then(()=>{
    res.send('edit thumbnail');
  })
  .catch(err=>{
    console.log(err);
  });
});


// 상세 설명 정보 변경
router.put('/editInfo', (req, res)=>{
  let productName = req.body.productName;
  let infoImage = req.body.infoImage;
  db.collection('products').updateOne({productName : productName}, {$set : {infoImage : infoImage}})
  .then(()=>{
    res.send('edit infoImage');
  })
  .catch(err=>{
    console.log(err);
  });
});


// 배송 방식 변경
router.put('/editDeliMethod', (req, res)=>{
  let productName = req.body.productName;
  let deliverKor = req.body.deliverKor;
  let deliverOut = req.body.deliverOut;
  db.collection('products').updateOne({productName : productName}, {$set : {deliverKor : deliverKor, deliverOut : deliverOut}})
  .then(()=>{
    res.send('edit deliMethod');
  })
  .catch(err=>{
    console.log(err);
  });
});


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