const express = require('express');
const tratarErrrosEsperados = require('../functions/tratarErrosEsperados');
const conectarBancoDados = require('../middlewares/conectarDB');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const EsquemaUsuario = require('../models/usuario');
const router = express.Router();

router.post('/criar', conectarBancoDados, async function (req, res) {
  try {
    // #swagger.tags = ['Usuario']
    let { nome, email, senha } = req.body;
    const numeroVezesHash = 10;
    const senhaHash = await bcrypt.hash(senha, numeroVezesHash);
    const respostaDB = await EsquemaUsuario.create({
      nome,
      email,
      senha: senhaHash
    });
    res.status(200).json({
      status: "OK",
      statusMensagem: 'Usuário criado com sucesso!',
      resposta: respostaDB
    });
  } catch (error) {
    if (String(error).includes("email_1 dup key")) {
      return tratarErrrosEsperados(res, "Error: Já existe uma conta com este e-mail cadastrado!")
    }
    return tratarErrrosEsperados(res, error);
  }
});

router.post('/logar', conectarBancoDados, async function (req, res) {
  try {
    // #swagger.tags = ['Usuario']
    let { email, senha } = req.body;

    let respostaBD = await EsquemaUsuario.findOne({ email }).select('+senha');
    if (respostaBD) {

      let senhaCorreta = await bcrypt.compare(senha, respostaBD.senha);
      if (senhaCorreta) {

        let token = jwt.sign({ id: respostaBD._id }, process.env.JWT_SECRET, { expiresIn: 'id' })

        res.header('x-auth-token', token);
        res.status(200).json({
          status: "OK",
          statusMensagem: "Usuário autenticado com sucesso",
          resposta: { "x-auth-token": token }
        });
      } else {
        throw new Error("Email ou senha incorreta");
      }
    } else {
      throw new Error("Email ou senha incorreta");
    }
  } catch (err) {
    return tratarErrrosEsperados(res, err)
  }
});

module.exports = router;
