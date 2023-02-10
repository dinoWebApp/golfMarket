const bcrypt = require('bcrypt');
const saltRounds = 12;

bcrypt.hash('tgolshop680328', saltRounds, (err, hash)=>{
  console.log(hash);
})