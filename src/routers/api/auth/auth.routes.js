const express = require('express');
const passport = require('../../../middlewares/passport');

const router = express.Router();

router.post('/api/auth/register',
    passport.authenticate('signup',
        {
            failureRedirect: '/signup-error',//ruta para errores
            successRedirect: '/profile'
        }
    ));
router.post('/api/auth/login',

    passport.authenticate('signin',

        {
            failureRedirect: '/signin-erro',
            successRedirect: '/profile'
        })


);//aqui va la ruta final


module.exports = router;