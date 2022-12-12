const moment = require('moment');

const formatUserForDB = (userObj) => {
  const newUser = {
    ...userObj,
    email: userObj.email,
    password: userObj.password,
    createdAt: new Date(),
    updatedAt: new Date(),
    accounts: null
  };
  if (userObj.birthdate) {
    const today = moment();
  }
  return newUser;
};

module.exports = {
  formatUserForDB,
}