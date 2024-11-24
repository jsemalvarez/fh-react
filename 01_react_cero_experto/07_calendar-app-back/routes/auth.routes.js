const { Router } = require('express');
const authController = require('../controllers/auth.controllers');
const { check } = require('express-validator');
const { vadarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();


router.post('/register',[
    check('name','el nombre es oblivatorio').not().isEmpty(),
    check('email','el es obligatorio es oblivatorio').isEmail(),
    check('password','el es obligatorio es oblivatorio').isLength({min:6}),
    vadarCampos
], authController.register)


router.post('/',[
    check('email','el es obligatorio es oblivatorio').isEmail(),
    check('password','el es obligatorio es oblivatorio').isLength({min:6}),
    vadarCampos
], authController.login)


router.get('/renew',[
    validarJWT
], authController.renewToken)

module.exports = router