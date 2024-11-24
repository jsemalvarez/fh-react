const jwt = require('jsonwebtoken')

const generateToken = ( uid, name ) => {

    return new Promise((resolve, reject) => {

        const payload = {uid, name};

        jwt.sign( payload, process.env.JWT_SECRET_SEED, {
            expiresIn:'2h'
        }, (err, token) => {

            if(err){
                console.log(err)
                reject(err)
            }

            resolve(token)
        })

    })
}

module.exports = {
    generateToken
}