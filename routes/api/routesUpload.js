var express = require('express');
var multer  = require('multer');
const router = express.Router();
var upload = multer({ dest: 'public' });


router.post('/', upload.single('upload'),  function(req, res) {
    
    console.log(req.file);
    /* res.status(200).json({
        message: req.file,
        status: "success"
    }); */
    res.send("server running perfectly");
  });

module.exports = router;