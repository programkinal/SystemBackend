'use strict';

var AcademicUnits = require('../../models/academicUnits');
var EducationalCareers = require('../../models/educationalCareers');
var Course = require('../../models/course');
var Instructor = require('../../models/instructores')
var Redes = require('../../models/Redes')

function addAcademicUnits(req,res){
    var params = req.body;
    var academic = new AcademicUnits();

    if(params.academicUnit && params.description){
        academic.academicUnit = params.academicUnit.toUpperCase();
        academic.description = params.description.toUpperCase();
        academic.code = params.code.toUpperCase();

        AcademicUnits.findOne({academicUnit: academic.academicUnit},(err, academica)=>{
            if(err){
                res.status(500).send({message: 'Error en la busqueda'});
            }else{
               if(!academica){
                   academic.save((err,guardado)=>{
                       if(err){
                           res.status(500).send({message: 'Ocurrio un error al guardar!!'});
                       }else{
                           if(!guardado){
                               res.status(404).send({message: 'Error en el sistema'});
                           }else{
                               res.status(200).send({Unidad: guardado});
                           }
                       }
                   })
               }else{
                   res.status(200).send({message: 'La unidad academica ya esta registrada'});
               }
            }
        })
    }else{
        res.status(200).send({message:'Debes de llenar todos los campos de unidades'});
    }
}
function updatedAcademicUnit(req,res){
    var update = req.body
    var AcademicId = req.params.id;

    AcademicUnits.findByIdAndUpdate( AcademicId,update, {new: true},(err, updatedAcademicUnit)=>{
        if(err){
            res.status(500).send({message: 'Ocurrio un error al actualizar'});
        }else{
            if(!updatedAcademicUnit){
                res.status(404).send({message: 'Se produjo un error!!'});
            }else{
                res.status(200).send({academic: updatedAcademicUnit});
            }
        }
    })
}
function deleteAcademicUnit(req,res){
    var AcademicId = req.params.id
    AcademicUnits.findByIdAndDelete(AcademicId,(err)=>{
        if(err){
            res.status(500).send({message: 'Ocurrio un error'});
        }else{
            res.status(200).send({message: 'Fue eliminado de la base de datos'});
        }
    })
}
function listAcademicUnit(req, res){
    AcademicUnits.find({},(err,listar)=>{
        if(err){
            res.status(500).send({message: 'Ocurrio un error'});
        }else{
            res.status(200).send({'Unidad academica': listar});
        }
    })
}

/**------------------------------------------------------EducationalCareers--------------------------------------------------------------------------------- */
function addEducationalCareers(req,res){
    var params = req.body
    var career = new EducationalCareers();

    if(params.code && params.name && params.description){
        career.code = params.code.toUpperCase();
        career.name = params.name.toUpperCase();
        career.description = params.description.toUpperCase();

        EducationalCareers.findOne({name: params.name},(err,buscandoNombre)=>{
            if(err){
                res.status(500).send({message: 'Ocurrio un error'});
            }else{
                if(!buscandoNombre){
                    EducationalCareers.findOne({code: params.code},(err, academica)=>{
                        if(err){
                            res.status(500).send({message: 'Error en la busqueda'});
                        }else{
                           if(!academica){
                               career.save((err,guardado)=>{
                                   if(err){
                                       res.status(500).send({message: 'Ocurrio un error al guardar!!'});
                                   }else{
                                       if(!guardado){
                                           res.status(404).send({message: 'Error en el sistema'});
                                       }else{
                                           res.status(200).send({career: guardado});
                                       }
                                   }
                               })
                           }else{
                               res.status(200).send({message: 'El codigo ya fue registrado'});
                           }
                        }
                    })
                }else{
                    res.status(200).send({message: 'El nombre ya fue registrado'});
                }
            }
        })
    }else{
        res.status(200).send({message: 'Debes de llenar todos los campos'});
    }
}

function updateEducationalCareers(req,res){
    var update = req.body;
    var educationalCareersId = req.params.id;

    EducationalCareers.findByIdAndUpdate(educationalCareersId,update,{new: true},(err,actualizando)=>{
        if(err){
            res.status(500).send({message: 'Error al intentar actualizar'});
        }else{
            if(!actualizando){
                res.status(404).send({message: 'No encontro conexion'});
            }else{
                res.status(200).send({'Carrera Educativa': actualizando});
            }
        }
    });
}

function deleteEducationalCareers(req,res){
    var educationalCareersId = req.params.id

    EducationalCareers.findByIdAndDelete(educationalCareersId,(err)=>{
        if(err){
            res.status(500).send({message: 'Ocurrio un error al intentar eliminar'});
        }else{
            res.status(200).send({Elimar: 'Fue eliminado de la base de datos'});
        }
    })
}
function listEducationlCareers(req, res){
    EducationalCareers.find({},(err,buscando)=>{
        if(err){
            res.status(500).send({message: 'Ocurrio error al intentar buscar'});
        }else{
            if(!buscando){
                res.status(404).send({message: 'Error de conexion'});
            }else{
                res.status(200).send({career: buscando});
            }
        }
    });
}
function searchEducationCareers(req,res){
    var params = req.body;
    Course.find({
      $and: [
        {code: params.search, name: params.search1}
      ]
    }, (err, results)=>{
      if(err){
        res.status(404).send({message: 'Error general'})
      }else{
        if(!results){
          res.status(200).send({message: 'No hay registros'});
        }else{
          res.status(200).send({results});/*Error front*/
        }
      }
    });
  }

/**--------------------------------------------------Course-------------------------------------------------------------------------------------- */


function saveCourse(req, res){
    var course = new Course();
    var params = req.body;

    if(params.code && params.name){
        course.code = params.code.toUpperCase();
        course.name = params.name.toUpperCase();
        course.description = params.description.toUpperCase();
        
        Course.findOne({name: params.name},(err,buscandoNombre)=>{
            if(err){
                res.status(500).send({message: 'Ocurrio un error'});
            }else{
                if(!buscandoNombre){
                    Course.findOne({code: params.code},(err, academica)=>{
                        if(err){
                            res.status(500).send({message: 'Error en la busqueda'});
                        }else{
                           if(!academica){
                               course.save((err,guardado)=>{
                                   if(err){
                                       res.status(500).send({message: 'Ocurrio un error al guardar!!'});
                                   }else{
                                       if(!guardado){
                                           res.status(404).send({message: 'Error en el sistema'});
                                       }else{
                                           res.status(200).send({Courso: guardado});
                                       }
                                   }
                               })
                           }else{
                               res.status(200).send({message: 'El codigo ya fue registrado'});
                           }
                        }
                    })
                }else{
                    res.status(200).send({message: 'El nombre ya fue registrado'});
                }
            }
        })
    }else{
        res.status(200).send({message: 'Debes de llenar todos los campos'});
    }
}

function listCourse(req, res){
    Course.find({}, (err, courses)=>{
        if(err){
            res.status(404).send({message: 'error al listar'});
        }else{
            if(!courses){
                res.status(404).send({message:'no se pudo listar'});
            }else{
                res.status(200).send({course: courses});
            }
        }
    });
}

function updateCourse(req, res){
    var courseId = req.params.id;
    var update = req.body;

    Course.findByIdAndUpdate(courseId, update, {new:true}, (err, courseUpdate) => {
        if(err){
            res.status(500).send({
                message: 'Error al acutalizar'});
        }else{
            if(!courseUpdate){
                res.status(404).send({message: 'No se ha podido actualizar'});
            }else{
                res.status(200).send({course: courseUpdate});
            }
        }
    });
}

function deleteCourse(req, res){
    var courseId = req.params.id;

    if(courseId != req.user.sub){
        res.status(500).send({mnessage: 'No tienes permiso'});

    }else{
        Course.findByIdAndRemove(courseId, (err, courseDelete) => {
            if(err){
                res.status(500).send({message: 'Error al eliminar'});
            }else{
                res.status(200).send({message: 'Se elimino correctamente'});
            }
        });
    }
}
function searchCourse(req, res){
    var params = req.body;
    Persona.find({
      $and: [
        {code: params.search, name: params.search1}
      ]
    }, (err, results)=>{
      if(err){
        res.status(404).send({message: 'Error general'})
      }else{
        if(!results){
          res.status(200).send({message: 'No hay registros'});
        }else{
          res.status(200).send({results});/*Error front*/
        }
      }
    });
}

/**-------------------------------------------------- Instructor -------------------------------------------------------------------------------------- */
function pruebaInstructor(req,res){
    res.status(200).send({message: 'Controlador nuevo'})
}

function addInstructor(req,res){
    var params = req.body;
    var instructor = new Instructor()
    
    if(params.code && params.profesion){
        instructor.code = params.code.toUpperCase();
        instructor.profesion = params.profesion.toUpperCase();
        instructor.Person = params.Person

        instructor.save((err,guardado)=>{
            if(err){
                res.status(500).send({message: 'Ocurrio un error'})
            }else{
                if(!guardado){
                    res.status(404).send({message: 'Error en el sistema'});
                }else{
                    res.status(200).send({Instructor: guardado})
                }
            }
        })
    }else{
        res.status(500).send({message: 'Llene todos los campos'})
    }
}

function searchInstructor(req, res){
 

    Instructor.find({}, (err, instructors)=>{
        if(err){
            res.status(404).send({message: 'error al listar'});
        }else{
            res.status(200).send({instructor: instructors});
        }
    })
}

/*------------------------------------------------Redes De estudio-------------------------------------------------------------------------*/ 
function saveRedes(req,res){
    var params = req.body;
    var redes = new Redes();

    if(params.name && params.career && params.dateInit && params.dateFinal){
        redes.name = params.name.toUpperCase();;
        redes.career = params.career.toUpperCase();;
        redes.dateInit = params.dateInit;
        redes.dateFinal = params.dateFinal;

        Redes.findOne({name: redes.name, dateInit: redes.dateInit},(err, redesbuscar)=>{
            if(err){
                res.status(500).send({message: 'Error al buscar'});
            }else{
               if(!redesbuscar){
                   if(redes.dateInit === redes.dateFinal){
                       res.status(200).send({message: 'La fecha no puede ser la misma que la inicial'});
                   }else{
                       if(redes.dateInit.localeCompare(redes.dateFinal) != -1){
                           res.status(200).send({message:'La Fecha final es antes que la fecha de incio'});
                       }else{
                        redes.save((err,guardado)=>{
                            if(err){
                                res.status(200).send({message: 'Ocurrio un error al guardar'});
                            }else{
                                if(!guardado){
                                    res.status(200).send({message: 'Error en el sistema'});
                                }else{
                                    res.status(200).send({Guardado: guardado});
                                }
                            }
                        })
                       }
                       
                   }                   
               }else{
                   res.status(200).send({message: 'La red de estudio ya esta registrada'});
               }
            }
        }); 
    }else{
        res.status(200).send({message:'Debes de llenar todos los campos'});
    }
}
function listRedes(req, res){
    var idName = [];
    var names = [];
    Redes.find({},(err,listar)=>{
        if(err){
            res.status(500).send({message: 'Ocurrio un error'});
        }else{
            listar.forEach(element => {
                idName.push(element.career)
            });

            EducationalCareers.find({_id: idName}, (err, results)=>{
                if(err){
                  res.status(404).send({message: 'Error general'})
                }else{
                  if(!results){
                    res.status(200).send({message: 'No hay registros'});
                  }else{
                      results.forEach(elementName =>{
                          names.push(elementName.name)
                      });
                      res.status(200).send({redes: listar, name: names});/*Error front*/
                      console.log(names)
                  }
                  
                }
              });  
        }
    });
}







module.exports = {
    addAcademicUnits,
    updatedAcademicUnit,
    listAcademicUnit,
    deleteAcademicUnit,
    addEducationalCareers,
    updateEducationalCareers,
    deleteEducationalCareers,
    listEducationlCareers,
    searchEducationCareers,
    saveCourse,
    listCourse,
    updateCourse,
    deleteCourse,
    searchCourse,
    addInstructor,
    pruebaInstructor,
    searchInstructor,
    saveRedes,
    listRedes
}