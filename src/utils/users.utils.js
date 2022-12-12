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
    const birthdate = moment(userObj.birthdate, "MMMM DD, YYYY").startOf('day');
    newUser.birthdate = birthdate.format('DD-MM-YYYY');
    const userAge = today.diff(birthdate, 'years');
    newUser.age = +userAge;
  }
  return newUser;
};

module.exports = {
  formatUserForDB,
}