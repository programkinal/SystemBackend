'use strict';

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_super_secreta_del_proyecto';

exports.createToken = function(user){
    var playload = {
        sub: user._id,
        nameUser: user.nameUser,
        rol: user.rol,
        iat: moment().unix(),
        exp: moment().add(30, 'day').unix
    };
    return jwt.encode(playload, secret);
}