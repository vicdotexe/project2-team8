const express = require('express');
const router = express.Router();

const viewsController = require('./viewsController');
router.use(viewsController);

const apiController = require('./api');
router.use('/api', apiController);

module.exports = router;