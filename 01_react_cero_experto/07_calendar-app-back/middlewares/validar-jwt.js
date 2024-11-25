const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

    const token = req.headers['x-token'];

    if( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        })
    }

    try {

        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET_SEED
        )

        req.user = {
            uid: payload.uid,
            name: payload.name
        }
        
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }
}

module.exports = {
    validarJWT
}