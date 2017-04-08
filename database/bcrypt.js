const bcrypt = require('bcrypt');

bcrypt.hash('pwd', 10, function(err, hash) {
  console.log(hash);
});
