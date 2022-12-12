const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')
const UserDao = require('../models/daos/Users.dao');
const { formatUserForDB } = require('../utils/users.utils');
const envConfig = require('../env.config');



const User = new UserDao();

const salt = () => bcrypt.genSaltSync(10);
const createHash = (password) => bcrypt.hashSync(password, salt());
const isValidPassword =(user, password)=> bcrypt.compareSync(password, user.password);
//en el use estar pendiente del modo que le queremos dar.
passport.use('signup', new LocalStrategy({
    passReqToCallback: true,
}, async (req, username, password, done) => {
    try {
        const userItem ={
            firstname:req.body.firstname,
            email: username,
            password: createHash(password),
        };
        console.log(userItem);
        const newUser = formatUserForDB(userItem);
        const user = await User.createUser(newUser);
        
        return done(null, user)
} catch (error) {
        console.log('hay error');
        console.log(error);
        return done(error)
    }
}
));
//sing in
passport.use('signin', new LocalStrategy(async(username, password, done)=>{
try {
    const user = await User.getById(username);
    if(!isValidPassword(user, password)){
        console.log('invalido');
        return done(null, false)
    }
    return done(null, user);
} catch (error) {
    return done(error);
}
}));
//serialization
passport.serializeUser((user, done)=>{
    console.log('iniciado serializer');
    done(null, user._id); 
});
//deserialization
passport.deserializeUser(async(id,done)=>{
    console.log('inside deserialaizer');
    const user = await User.getById(id);
    done(null, user);
});

module.exports = passport