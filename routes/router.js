const router = require('express').Router();
const C_server = require('../controller/C_server');

router.route('/upload').post(C_server.uploadFile);

module.exports = router;
