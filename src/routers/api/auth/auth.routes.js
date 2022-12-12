const express = require('express');
const authControllers = require('../../../controllers/auth.controllers');
const passport = require('../../../middlewares/passport');

const router = express.Router();

router.post('/register',
    passport.authenticate('signup',
        {
            failureRedirect: '/signup-error',//ruta para errores
            successRedirect: '/profile'
        }
    ));
router.post('/login',

    passport.authenticate('signin',

        {
            failureRedirect: '/signin-erro',
            successRedirect: '/profile'
        })


);
module.exports = router;