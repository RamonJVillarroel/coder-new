
const register =  (req, res, next) => res.redirect('/profile');

const login =  (req, res, next) => res.redirect('/profile');

module.exports = {
  login,
  register,
}