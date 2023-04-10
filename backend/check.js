const bcrypt = require('bcryptjs');
const saltRounds = 12;

bcrypt.hash('0324', saltRounds, (err, hash)=>{
  console.log(hash);
})