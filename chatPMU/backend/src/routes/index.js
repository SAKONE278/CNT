const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/messages', require('./messages'));
router.use('/favorites', require('./favorites'));
router.use('/rooms', require('./rooms'));
router.use('/users', require('./users'));
router.use('/info', require('./info'));
router.use('/updates', require('./updates'));
router.use('/files', require('./files'));

module.exports = router;
