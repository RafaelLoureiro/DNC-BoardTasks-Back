const express = require('express');
const conectarBancoDados = require('../middlewares/conectarDB');
const router = express.Router();

/* GET users listing. */
router.get('/', conectarBancoDados, function (req, res, next) {
  res.send('olá nodemon' + process.env.TEST);
});

module.exports = router;
