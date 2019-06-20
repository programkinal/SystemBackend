/**----------------------------------------------------Save User---------------------------------------------------------- */
var CreateUser = require('../../models/createUser');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../../services/jwt');

function saveUser(req,res){
    var params = req.body;
    var user = new CreateUser();

    if(params.nameUser && params.password && params.rol){
        user.nameUser = params.nameUser.toUpperCase();
        user.password = params.password;
        user.rol = params.rol;

        CreateUser.findOne({nameUser: user.nameUser},(err, issetUser)=>{
            if(err){
                res.status(200).send({message: 'Ya esta registrado el usuario'});
            }else{
                if(!issetUser){
                    bcrypt.hash(params.password, null, null, function(err, hash){
                        user.password = hash;

                        user.save((err, userStored)=>{
                            if(err){
                                res.status(200).send({message: 'Error al guardar el usuario'});
                            }else{
                                res.status(200).send({user: userStored});
                            }
                        });
                    });
                }else{
                    res.status(200).send({message: 'Ya esta registrado el usuario'});
                }
            }
        })
    }else{
        res.status(200).send({message: 'Debes de agregar todos los campos'});
    }
}
function reportUser(req,res){
    CreateUser.find({},(err,listar)=>{
        if(err){
            res.status(200).send({message: 'Eror al listar'});
        }else{
            res.status({user: listar});
        }
    })
}
function updateUser(req,res){
    var params = req.body;
    var userId = req.params.id;

    CreateUser.findOneAndUpdate(userId,params,{new: true},(err,update)=>{
        if(err){
            res.status(200).send({message: 'Error al actualizar'});
        }else{
            res.status(200).send({user: update});
        }
    })
}

function deleteUser(req,res){
    var userId = req.params.id;

    CreateUser.findByIdAndDelete(userId,(err)=>{
        if(err){
            res.status(200).send({message: 'Error al eliminar el usuario'});
        }else{
            res.status(200).send({message: 'Se ha elimado de la base de datos'});
        }
    })
}

function login(req,res){
    var params = req.body;
    CreateUser.findOne({nameUser: params.nameUser.toUpperCase(), rol: params.rol},(err,user)=>{
        if(err){
            res.status(200).send({message: 'Error al inciar seccion'});
        }else{
            bcrypt.compare(params.password, user.password,(err, check)=>{
                if(check){
                    // console.log(jwt.createToken(user))
                    res.status(200).send({toke: jwt.createToken(user)});

                }else{
                    res.status(200).send({message: 'Error en tu contrasena'});
                }
            })
        }
    })
}


module.exports = {
    saveUser,
    reportUser,
    updateUser,
    deleteUser,
    login
}