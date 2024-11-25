const { generateToken } = require('../helpers/jwt');
const User = require('../models/Usuario')
const bcrypt = require('bcryptjs')

const login = async(req, res) => {
    
    try {

        const { email, password } = req.body

        let user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario o password incorrectos'
            })
        }

        const validPassword = bcrypt.compareSync(password, user.password)

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario o password incorrectos'
            })
        }

        const token = await generateToken(user.id, user.name);


        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token: token,
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Server Error'
        })
    }
}

const register = async(req, res) => {

    try {

        const { email, password } = req.body

        let user = await User.findOne({ email });

        if(user){
            res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            })
        }

        user = new User( req.body );

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        const token = await generateToken(user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token: token
        })
            
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Server Error'
        })
    }
}

const renewToken = async(req, res) => {

    const {uid, name} = req.user;

    const token = await generateToken(uid, name);

    res.json({
        ok: true,
        uid: uid,
        name: name,
        token: token
    })
}

module.exports = {
    login,
    register,
    renewToken
}