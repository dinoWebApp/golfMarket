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
const path = require('path');
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
    maxAge: 7 * 24 * 60 * 60 * 1000,
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/customer', require('./routes/customer.js'));
app.use('/api/product', require('./routes/product.js'));
app.use('/api/admin', require('./routes/admin.js'));
app.use('/static',express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'TGolShop/dist')));
app.use(express.static(path.join(__dirname, '.well-known/pki-validation')));
app.use(express.static(path.join(__dirname, 'sitemap.xml')));
app.use(express.static(path.join(__dirname, 'robots.txt')));
app.use(express.static(path.join(__dirname, 'tgolshop.jpg')));
MongoClient.connect(process.env.DB_URL, (err, client)=>{
  if (err) return console.log(err);
  db = client.db('tgolshop');
  app.listen(8080, ()=>{
    console.log('listening on 8080');
  });
});

app.get('/.well-known/pki-validation/E2F74FD275038D1962E4DCB0DA17732D.txt', (req, res)=>{
  res.sendFile(path.join(__dirname, './.well-known/pki-validation/E2F74FD275038D1962E4DCB0DA17732D.txt'));
});

app.get('/sitemap.xml', (req, res)=>{
  res.sendFile(path.join(__dirname, './sitemap.xml'));
});

app.get('/robots.txt', (req, res)=>{
  res.sendFile(path.join(__dirname, './robots.txt'));
});

app.get('/tgolshop.jpg', (req, res)=>{
  res.sendFile(path.join(__dirname, './tgolshop.jpg'));
});

app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname, 'TGolShop/dist/index.html'));
})

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

app.get('/api/nonMemberOrder', (req, res)=>{
  let orderId = parseInt(req.query.orderId);
  let name = req.query.name;
  db.collection('purchaseData').findOne({$and : [{orderId : orderId}, {name : name}]})
  .then((result)=>{
    if(!result) {
      res.send("wrong");
    } else res.send(result);
  })
  .catch(err=>{
    console.log(err);
  })
});

app.get('/api/fitting', loginCheck, (req, res)=>{
  db.collection('fitting').find().sort({id : -1}).toArray()
  .then(result=>{
    res.send(result);
  })
  .catch(err=>{
    console.log(err);
  })
});

app.get('/api/customerCenter/nonMemberQna', (req, res)=>{
  db.collection('nonMemberQna').find().sort({id : -1}).toArray()
  .then(result=>{
    res.send(result);
  })
  .catch(err=>{
    console.log(err);
  })
})

app.post('/api/fitting/submit', (req, res)=>{
  let nickName = req.user.nickName;
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
  db.collection('fittingId').findOne({name : 'fittingId'})
  .then(result=>{
    let data = {
      id : result.id + 1,
      nickName : nickName,
      text : req.body.text,
      adminText : '',
      reply : false,
      date : today
    }
    return db.collection('fitting').insertOne(data)
  })
  .then(()=>{
    return db.collection('fittingId').updateOne({name : 'fittingId'}, {$inc : {id : 1}});
  })
  .then(()=>{
    return db.collection('fitting').find().sort({id : -1}).toArray()
  })
  .then(result=>{
    res.send(result);
  })
  .catch(err=>{
    console.log(err);
  })
});

app.post('/api/customerCenter/qnaSubmit', (req, res)=>{
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
  db.collection('nonMemberQnaId').findOne({name : 'nonMemberQnaId'})
  .then(result=>{
    let data = {
      id : result.id + 1,
      nickName : req.body.nickName,
      text : req.body.text,
      adminText : '',
      reply : false,
      date : today
    }
    return db.collection('nonMemberQna').insertOne(data)
  })
  .then(()=>{
    return db.collection('nonMemberQnaId').updateOne({name : 'nonMemberQnaId'}, {$inc : {id : 1}});
  })
  .then(()=>{
    return db.collection('nonMemberQna').find().sort({id : -1}).toArray()
  })
  .then(result=>{
    res.send(result);
  })
  .catch(err=>{
    console.log(err);
  })
})


app.post('/api/admin-pw', (req, res)=>{
  db.collection('admin').findOne({id : 'admin'}, (err, result)=>{
    bcrypt.compare(req.body.pw, result.pw, (err, isMatch)=>{
      if (err) console.log(err);
      if (isMatch) {
        res.send('ok');
      } else res.send('fail');
    })
  })
});

app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, 'TGolShop/dist/index.html'))
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

