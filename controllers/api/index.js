const express = require('express');
const router = express.Router();

// controllers linked in through index.js from api folder
const artPeiceController = require('./artpieceController')
router.use('/artpieces', artPeiceController);

const commentController = require('./commentController')
router.use('/comments', commentController);

const usersController = require('./usersController')
router.use('/users', usersController);

module.exports = router;