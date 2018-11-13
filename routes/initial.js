var router = require('express').Router();

router.get('/data', function (req, res) {

  res.json({
    "name": "Rahul",
    "data": "I dont care"
  });

  return;

});


module.exports = router