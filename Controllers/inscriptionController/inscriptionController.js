'use strict';

var Inscription = require('../../models/inscription');
var Person = require('../../models/person');
var AcademicUnits = require('../../models/academicUnits');
var EducationalCareers = require('../../models/educationalCareers');
var Jornada = require('../../models/jornada');
var Grade = require('../../models/grader');

function saveInscription(req, res){
    var params = req.body;
    var inscription = new Inscription();

    inscription.person = params.person,
    inscription.jornada = params.jornada,
    inscription.grade = params.grade,
    inscription.share = params.share

    inscription.save({unitAcademy: {unitAcademy: params.unitAcademy, career: params.career}}, (err, inscrip)=>{
        if(err){
            res.status(500).send({message: 'Error al guardar'});
        }else{
            if(!inscrip){
                res.status(404).send({message: 'No se ha podido guardar'});
            }else{
                res.status(200).send({inscription: inscrip});
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

function listAcamedemicUnits(req,res){    
    AcademicUnits.find({},(err,units)=>{
        if(err){
            res.status(500).send({message: 'No se ha podido listar'});
        }else{
            res.status(200).send({units});
        }
    });

}

function listCareer(req, res){
    EducationalCareers.find({}, (err, carreras) => {
        if(err){
            res.status(500).send({message: 'Error al listar'});
        }else{
            if(!carreras){
                res.status(404).send({message: 'No se ha podido listar'});
            }else{
                res.status(200).send({careers: carreras});
            }
        }
    });
}

function listJornada(req, res){
    Jornada.find({}, (err, jornadas) => {
        if(err){
            res.status(500).send({message: 'Error al listar'});
        }else{
            if(!jornadas){
                res.status(404).send({message: 'No se ha podido listar'});
            }else{
                res.status(200).send({jornadas: jornadas});
            }
        }
    });
}

function listGrade(req, res){
    Grade.find({}, (err, grados) => {
        if(err){
            res.status(500).send({message: 'Error al listar'});
        }else{
            if(!grados){
                res.status(404).send({message: 'No se ha podido listar'});
            }else{
                res.status(200).send({grades: grados});
            }
        }
    });
}

module.exports = {
    saveInscription,
    listPerson,
    listAcamedemicUnits,
    listCareer,
    listJornada,
    listGrade
}