const jwt = require('jsonwebtoken')
const { findOne } = require('../models/user')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replce('Bearer ', '')
        const decoded = jwt.verify(token, 'thisisnodecourse')
        const user = await findOne({_id: decoded._id, 'tokens.token': token})

        if (!user) {
            throw new Error()
        }

        req.user = user
        next()
    } catch (e) {
        res.status(401).send({error: 'Please authenticate'})
    }
}

module.exports = auth