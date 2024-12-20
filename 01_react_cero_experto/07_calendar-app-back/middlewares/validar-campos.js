const { validationResult } = require("express-validator");


const vadarCampos = (req, res, next) => {

    const errors = validationResult(req)

    if( !errors.isEmpty() ){
        res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    next()
}


module.exports = {
    vadarCampos
}