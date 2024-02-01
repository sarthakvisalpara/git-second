var express = require('express');
var router = express.Router();
var demo=require('../controller/findcontroller');
// var model=require('../middleware/auth');



router.get('/find',demo.users)

    
module.exports = router;
