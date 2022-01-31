const bcrypt = require('bcryptjs');

const hashPassword = (password) => new Promise(async (resolve, reject) => {
    try {
      resolve(await bcrypt.hash(password, 12));
    } catch (error) {
      reject(error);
    }
  });

const comparewPassword = (clientPass, dbPass) => new Promise(async (resolve, reject) => {
    try {
      console.log(clientPass, dbPass);
      resolve(await bcrypt.compareSync(clientPass, dbPass));
    } catch (error) {
      reject(error);
    }
  });

module.exports = { hashPassword, comparewPassword };


