'use strict';
var Person = require('../../models/person');
var Family = require('../../models/family');

function searchPerson(req, res){
    var params = req.body;
    
    Person.find({$or: [{firstName: params.person },{middleName: params.person},
    {firstLastName: params.person}, {secondLastName: params.person}]}, (err, results)=>{
        if(err){
            res.status(404).send({message: 'Error al buscar'});
        }else{
            if(!results){
                res.status(200).send({message: 'No hay registros'});
            }else{
                res.status(200).send({results});
            }
        }
    });
}

function saveFamily(req, res){
    var params = req.body;
    var family = new Family();

    family.name = params.name,
    family.father = params.father,
    family.mother = params.mother,
    family.inCharge = params.inCharge,
    family.son = params.son

    family.save((err, familyStored)=>{
        if(err){
            res.status(500).send({message: 'Error al guardar'});
        }else{
            if(!familyStored){
                res.status(404).send({message: 'No se ha podido guardar'});
            }else{
                res.status(200).send({family: familyStored});
            }
        }
    });
}

function updateFamily(req, res){
    var update = req.body
    var famliyId = req.params.id;

    Family.findByIdAndUpdate(famliyId, update, {new: true},(err, familyUp) =>{
        if(err){
            res.status(500).send({message: 'Ocurrio un error al actualizar'});
            console.log(err);
        }else{
            if(!familyUp){
                res.status(404).send({message: 'Se produjo un error!!'});
            }else{
                res.status(200).send({academic: familyUp});
            }
        }
    });
}

function searchFamily(req, res){
    var params = req.body;

    Family.findOne({$or: [{name: params.search }]}, (err, results)=>{
        if(err){
            res.status(404).send({message: 'Error general'})
        }else{
            if(!results){
                res.status(200).send({message: 'No hay registros'});
            }else{
                res.status(200).send({results});
            }
        }
    });
}

function listPerson(req,res){    
    Person.find({},(err,persons)=>{
        if(err){
            res.status(500).send({message: 'No se ha podido listar'});
        }else{
            res.status(200).send({persons});
        }
    });

}

module.exports = {
    searchPerson,
    saveFamily,
    searchFamily,
    updateFamily,
    listPerson
}