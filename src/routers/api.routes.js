const express = require('express');
const authRoutes = require('../routers/api/auth/auth.routes');

const router = express.Router();


//Routes
router.use( authRoutes);

module.exports = router;