const router = require('express').Router();
const C_server = require('../controller/C_server');
const C_Client = require('../controller/C_Client')
var express = require('express');
var app = express();

router.route('/roadreport/web/login-pemkot').get(C_server.getLoginPage);
router.route('/roadreport/web/login-pemkot').post(C_server.postLoginPage);
router.route('/roadreport/web/dashboard').get(C_server.getDashboard);
router.route('/roadreport/api/upload').post(C_Client.uploadFile);
router.route('/roadreport/api/login').post(C_Client.LoginClient);
router.route('/roadreport/api/register').post(C_Client.RegisterClient);
router.route('/roadreport/web/map-report-client/:lat,:lng').get(C_server.getClientReportAddr)
router.route('/roadreport/web/map-report-all').get(C_server.mapAllReport);

module.exports = router;
