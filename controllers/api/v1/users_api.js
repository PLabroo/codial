const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const env = require('../../../config/environment')




// sign in and create a session

module.exports.createSession = async (req, res) => {
    
    try {
        let user = await User.findOne({ email: req.body.email });

        if (!user || user.password != req.body.password)
        {
            return res.status(422).json({
                message:"Invalid username/password"
            })
        }

        return res.status(200).json({
            message: 'Sign In successful,here is your token,keep it safe',
            data: {
                token: jwt.sign(user.toJSON(), env.jwt_secretKey, { expiresIn: '100000' })
            }
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error"
            })
    }
}
