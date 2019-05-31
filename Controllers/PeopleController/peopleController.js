'use strict';
var Person = require('../../models/person');
var emailCorrect = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i
var comprobar = false;
var comprobarfalse = true;
var comprobarNumber = false;
var comprobarNumberfalse = true;
function Prueba(req,res){
    res.status(200).send({message: 'Probando el Servidor'})
}
function addPerson(req,res){
    var person = new Person();
    var params = req.body;
    var email = params.email;

    person.firstName = params.firstName.toUpperCase();
    person.middleName = params.middleName.toUpperCase();
    person.firstLastName = params.firstLastName.toUpperCase();
    person.secondLastName = params.secondLastName.toUpperCase();
    person.marriedName = params.marriedName.toUpperCase();
    person.birthname = params.birthname;
    person.religion = params.religion.toUpperCase();
    person.gender = params.gender;
    person.civilStatus = params.civilStatus;


    
    if (params.firstName  && params.firstLastName  && params.birthname &&params.civilStatus && params.religion && params.gender){
        if(params.gender == 'FEMENINO' && params.marriedName == '' && params.civilStatus == 'CASADA'){
            res.status(500).send({message: 'Debe de ingresar el apellido de casada'});
        }else{
            if(params.marriedName != '' && params.gender == 'MASCULINO' && params.civilStatus == 'CASADO' && params.civilStatus == 'SOLTERO'){
                res.status(500).send({message: 'El genero de masculino no tiene apellido de Casada'});
            }else{
                if(params.marriedName != '' && params.gender == 'FEMENINO' && params.civilStatus == 'SOLTERA'){
                    res.status(500).send({message: 'El estado civil SOLTERA, no tiene apeliido de casda'});
                }else{
                    if(params.gender == 'MASCULINO' && params.civilStatus == 'SOLTERA' && params.civilStatus == 'CASADA'){
                        res.status(500).send({message: 'El estado civil en Masculino tiene que terminar en SOLETERO Ó CASADO'});
                    }else{
                        if(params.gender == 'FEMENINO' && params.civilStatus == 'SOLTERO' && params.civilStatus == 'CASADO'){
                            res.status(500).send({message: 'El estado civil en FEMENINO tiene que ser SOLTERA o CASADA'});
                        }else{
                            person.save((err,personSave)=>{
                                if(err){
                                    res.status(200).send({message: 'Error al guardar'});
                                }else{
                                    console.log('Paramentros' + JSON.stringify(params))
                                        Person.findByIdAndUpdate({_id: personSave._id},{$push: {email: {$each: params.email}}}, {new: true},(err,actualizar)=>{
                                        if(err){
                                            res.status(200).send({message: 'Error al guardar email'});
                                        }else{
                                            Person.findByIdAndUpdate({_id: personSave._id},{$push: {address: {$each: params.address}}}, {new: true},(err,actualizarAddress)=>{
                                                if(err){
                                                    res.status(200).send({message: 'Error al guardar Address'})
                                                }else{
                                                    let telefonos = [ params.phones]
                                                    Person.findByIdAndUpdate({_id: personSave.id},{$push: {phones: {$each: telefonos}}}, {new: true},(err,addPerson)=>{
                                                        if(err){
                                                            res.status(200).send({message: 'Error al guardar los telefonos'});
                                                        }else{
                                                            res.status(200).send({Person: addPerson});
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                            // Person.insertMany({'firstName': params.firstName.toUpperCase(), 'middleName': params.middleName.toUpperCase(), 'firstLastName': params.firstLastName.toUpperCase(), 'secondLastName': params.secondLastName.toUpperCase(), 'marriedName': params.marriedName.toUpperCase(), 'birthname': params.birthname,
                            // 'religion': params.religion,'gender': params.gender, 'civil status': params.civilStatus, 
                            // 'address': {$push:{address:{$each: params.address}}},
                            // 'phones':{'cellphone': params.cellphone, 'house': params.house}},(err,person)=>{
                            //     if(err){
                            //         res.status(500).send({message:'error al guardar'});
                            //     }else{
                            //         if(!person){
                            //             res.status(404).send({message:'NO se pudo guardar'});
                            //         }else{
                            //                 Person.findByIdAndUpdate({_id:person[0]._id},{$push: {email: {$each: params.email}}},(err,emailRes)=>{
                            //                     if(err){
                            //                         // res.status(500).send({message: 'Error al guardar email'});
                            //                         console.log(err);
                            //                     }else{
                            //                         // res.status(200).send({Person: emailRes});
                            //                         Person.findByIdAndUpdate({_id:person[0]._id},{$push: {otherNumber: {$each: params.otherNumber}}},(err,phoneRes)=>{
                            //                             if(err){
                            //                                 console.log(err);
                            //                             }
                            //                         })
                            //                     }
                            //                 })
                            //         }
                            //     }
                            // });
                        }
                    }
                    
                }
                
            }
        }
        
    }else{
        res.status(500).send({message: 'Ingrese todos los datos'});
    }
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

function updatePerson(req, res){
    var personId = req.params.id;
    var params = req.body;

    Person.findOneAndUpdate({_id:personId}, {$set:{firstName: params.firstName, middleName: params.middleName,
        firstLastName: params.firstLastName, secondLastName: params.secondLastName, marriedName: params.marriedName,
        birthname: params.birthname, religion: params.religion, email: params.email, gender: params.gender,
        'address.department': params.department, 'address.municipality': params.municipality, 'address.zone': params.zone, 
        'address.residential': params.residential, 'address.avenue': params.avenue, 'address.street': params.street, 
        'address.sector': params.sector, 'address.number': params.number, 
        'phones.cellphone': params.cellphone, 'phones.house': params.house, 'phones.other': params.other
        }}, {new:true}, (err, personFind) => {
        if(err){
            res.status(500).send({message: 'Error al acutalizar'});
        }else{
            if(!personFind){
                res.status(404).send({message: 'No se ha podido actualizar'});
            }else{
                res.status(200).send({personFind});
            }
        }
    });
}

function deletePerson(req,res){
    var personId = req.params.id;
    
    Person.findByIdAndDelete(personId,(err,personDeleted)=> {
        if(err){
            res.status(404).send({message: 'Error al eliminar'});
        }else{
            if(!personDeleted){
                res.status(404).send({message: 'No se pudo eliminar'});
            }else{
                
                res.status(200).send({message:'Se a eliminado correctamente'});
            }
        }
    });    
}
function email (req,res){
    var params = req.body;
    var email = params.email;
    var emailcorrect = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i
    
    email.forEach(element => {
        if(emailcorrect.test(element)){
            console.log('el correo esta correcto');
            console.log(element);
        }else{
            res.status(500).send({message: 'Error'});
        }
    });





    
    
}

module.exports ={
    Prueba,
    addPerson,
    listPerson,
    updatePerson,
    deletePerson,
    email
}