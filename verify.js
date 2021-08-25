var User = require('./models/login.js');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config.js');

/**
*@method getToken
* This method returns token to client post sign in
*/
exports.getToken = function (user) {
    return jwt.sign(user, config.secretKey, {
        expiresIn: 3600000
    });
};

exports.logout = function (token) {
    return jwt.sign(token);
};

/**
*@method verifyOrdinaryUser
* This method verify for the Ordinary user based on token
*/
exports.verifyOrdinaryUser = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
                var err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};

/**
*@method verifyAdmin
* This method verify for admin user
*/
exports.verifyAdmin = function (req, res, next) {
    /*if (!req.decoded._doc.admin) {
        var err = new Error('You are not authorize to perform POST OR Admin access!');
        err.status = 403;
        return next(err);
    } else {
        next();
    }*/
     //var token = req.body.token || req.query.token || req.headers['x-access-token'];
    // jwt.signOut(token);
    next();
}