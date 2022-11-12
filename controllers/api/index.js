const express = require('express');
const router = express.Router();

// controllers linked in through index.js from api folder
const artPeiceController = require('./artpieceController')
router.use('/artpieces', artPeiceController);

const commentController = require('./commentController')
router.use('/comments', commentController);

const usersController = require('./usersController')
router.use('/users', usersController);

const imagesController = require('./imagesController')
router.use('/images', imagesController);

const likesController = require('./likesController')
router.use('/likes', likesController);

const relationshipController = require('./followController')
router.use('/follow', relationshipController);

module.exports = router;