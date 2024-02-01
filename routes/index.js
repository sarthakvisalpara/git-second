var express = require('express');
var router = express.Router();
var demo = require('../controller/usercontroller')
var logincontroller=require('../controller/logincontroller');


router.post('/insert',demo.index)
router.get('/delete/:id',demo.delete);
router.post('/update/:id',demo.update);
router.get('/check',demo.checkbymodel);
router.get('/checkbymodel/:id',demo.checkbymodel);
router.post('/login',logincontroller.login);
router.get('/logout',logincontroller.logout);



module.exports = router;
