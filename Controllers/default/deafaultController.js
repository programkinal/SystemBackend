'use strict';
var Grader = require('../../models/grader')
function saveGradereDefault(req,res){
    var grader = new Grader();
    var graderdefault = ['PRIMERO BÁSICO','SEGUNDO BÁSICO','TERCERO BÁSICO','CUARTO DIVERCSIFICADO','QUINTO DIVERSIFICADAO','SEXTO DIVERSIFICADO'];
    Grader.find({grader: graderdefault},(err, reportDefault)=>{
        if(err){
            res.status(500).send({message: 'Error al crear tabla de de graderDefault'})
        }else{
            if(reportDefault && reportDefault.length >=1){
                
            }
        }
    })
}