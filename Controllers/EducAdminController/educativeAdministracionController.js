'use strict';

var AcademicUnits = require('../../models/academicUnits');
var EducationalCareers = require('../../models/educationalCareers');
var Course = require('../../models/course');
var Instructor = require('../../models/instructores');
var Redes = require('../../models/Redes');
var Person = require('../../models/person');
var Assignment = require('../../models/assignment')
var AssignmentInstructorCourse = require('../../models/assignmentInstructorCourse');
var Grader = require('../../models/grader');
var mongoose = require('mongoose')

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

    if(params.code && params.profesion && params.Person){
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
        res.status(200).send({message: 'Llene todos los campos'});
    }
}

function listInstructor(req, res){
    Instructor.find({}, (err, instructors)=>{
        if(err){
            res.status(404).send({message: 'error al listar'});
        }else{
            Person.populate(instructors,{path: 'Person'},(err, instructores)=>{
                if(err){
                    res.status(200).send({message: 'Erro al listar'});
                }else{
                    res.status(200).send({instructor: instructores});
                }
            })
        }
    });
}

function listPerson(req, res){
    Person.find({}, (err, persons)=>{
        if(err){
            res.status(404).send({message: 'error al listar'});
        }else{
            res.status(200).send({persons: persons});
        }
    });
}

function searchInstructor(req, res){
    var instructorId = req.params.id;

    Instructor.findOne({_id: instructorId}, (err, instructor) => {
        if(err){
            res.status(404).send({message: 'error al buscar'});
        }else{
            Person.populate(instructor,{path: 'Person'},(err,instructores)=>{
                res.status(200).send({instructor: instructores});
            })
            
        }
    });
}

function updateInstructor(req, res){
    var instructorId = req.params.id;
    var params = req.body;

    Instructor.findByIdAndUpdate(instructorId, params, {new:true}, (err, instructorUpdate) => {
        if(err){
            res.status(500).send({
            message: 'Error al acutalizar'});
        }else{
            if(!instructorUpdate){
                res.status(404).send({message: 'No se ha podido actualizar'});
            }else{
                res.status(200).send({instructor: instructorUpdate});
            }
        }
    });
}

function deleteInstructor(req, res){
    var instructorId = req.params.id;

    Instructor.findByIdAndRemove(instructorId, (err, instructorDelete) => {
        if(err){
            res.status(500).send({message: 'Error al eliminar'});
        }else{
            res.status(200).send({message: 'Se elimino correctamente'});
        }
    });
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
function updateRedes(req,res){
    var params = req.body;
    var id = req.params.id;
    Redes.findByIdAndUpdate(id,params,{new: true}, (err,actualizando)=>{
        if(err){
            res.status(200).send({message: 'No se pudo actualizar'});
        }else{
            res.status(200).send({actualizado: actualizando});
        }
    })
}
function deleteRedes(req,res){
    var id = req.params.id;
    Redes.findByIdAndDelete(id,(err,eliminando)=>{
        if(err){
            res.status(200).send({message: 'No se pudo eliminar'});
        }else{
            res.status(200).send({Elimar: eliminando});
        }
    })
}
function buscarRedes(req,res){
    var id = req.params.id;
    Redes.findById({_id: id},(err, buscando)=>{
        if(err){
            res.status(200).send({message: 'No se encontro'});
        }else{
            res.status(200).send({buscado: buscando});
        }
    })
}
function listRedes(req, res){
    Redes.find({},(err,listar)=>{
        if(err){
            res.status(500).send({message: 'Ocurrio un error'});
        }else{
            EducationalCareers.populate(listar,{path: 'career'},(err, listarCareer)=>{
                if(err){
                    res.status(200).send({message: 'Error al listar'});
                }else{
                    res.status(200).send({redes: listarCareer})
                }
            })
        }
    });
}
/**-------------------------------------------------Asignacion del instructor al curso------------------------------------------------------------------------------------- */
function saveAssignmentInstructor(req,res){
    var params = req.body;
    var assignmentInstructor = new AssignmentInstructorCourse();

    if(params.course && params.instructor){
        assignmentInstructor.instructor = params.instructor;
        assignmentInstructor.course = params.course;
        
        AssignmentInstructorCourse.findOne({instructor: params.instructor, course: params.course},(err,buscandoNoiguales)=>{
            if(err){
                res.status(200).send({message: 'Error al busscar'});
            }else{
                if(!buscandoNoiguales){
                    assignmentInstructor.save((err, guardando)=>{
                        if(err){
                            res.status(200).send({message: 'Error al guardar'});
                        }else{
                            res.status(200).send({guardado: guardando});
                        }
                    })
                }else{
                    res.status(200).send({message: 'El registro ya esta en la base de datos'})
                }
            }
        })
    }else{
        res.status(200).send({message: 'Debes de llenar todos los campos'})
    }
}
function reportAssigmentInstructorCourse(req,res){
    AssignmentInstructorCourse.find({},(err,listar)=>{
        Person.populate(listar,{path: 'instructor'},(err,listarInstructor)=>{
            Course.populate(listarInstructor,{path: 'course'},(err,listarCourse)=>{
                if(err){
                    res.status(200).send({message: 'Error en la busqueda'});
                }else{
                    res.status(200).send({Assignment: listarCourse});
                }
            })
        })
    })
}
/**-------------------------------------------------Asignación por jornada y sección---------------------------------------------------------------------------- */
function saveAssignment(req,res){
    var params = req.body;
    var assignment = new Assignment()
    if(params.career == '' && params.grader == '' && params.course != ''){
        assignment.workingDay = params.workingDay.toUpperCase();;
        assignment.career = params.career;
        assignment.section = params.section.toUpperCase();;
        assignment.grader = params.grader.toUpperCase();;
        assignment.course = params.course;
        Assignment.findOne({workingDay: params.workingDay, section: params.section,course: params.course},(err,Noigualess)=>{
            if(err){
                res.status(200).send({message: 'Error al intentar buscar'});
            }else{
                if(!Noigualess){
                    assignment.save((err,guardando)=>{
                        if(err){
                            res.status(200).send({message: 'Error al guardar'});
                        }else{
                            res.status(200).send({Guardado: guardando });
                        }
                    })
                }
            }
        })
    }else{
        res.status(200).send({message: 'Es necesario el curso'});
    }if (params.career != '' && params.grader != '') {
        Assignment.findOne({workingDay: params.workingDay,career: params.career,grader: params.grader },(err,Noigualess)=>{
            if(err){
                res.status(200).send({message: 'Error al intentar buscar'});
            }else{
                if(!Noigualess){
                    assignment.save((err,guardando)=>{
                        if(err){
                            res.status(200).send({message: 'Error al guardar'});
                        }else{
                            res.status(200).send({Guardado: guardando });
                        }
                    })
                }
            }
        })
    } else {
        Assignment.findOne({workingDay: params.workingDay,career: params.career, grader: params.grader,course: params.course, },(err,Noigualess)=>{
            if(err){
                res.status(200).send({message: 'Error al intentar buscar'});
            }else{
                if(!Noigualess){
                    assignment.save((err,guardando)=>{
                        if(err){
                            res.status(200).send({message: 'Error al guardar'});
                        }else{
                            res.status(200).send({Guardado: guardando });
                        }
                    })
                }
            }
        })
    }
    
}
function listInstructorAssignment(req, res){
    var personid = []
    var personName = []
    Instructor.find({}, (err, instructors)=>{
        if(err){
            res.status(404).send({message: 'error al listar'});
        }else{
            Person.populate(instructors,{path: 'Person'},(err,listarInstructor)=>{
                if(err){
                    res.status(200).send({message: 'Error al listar'});
                }else{
                    res.status(200).send({persona: listarInstructor})
                    console.log(listarInstructor)
                }
            })


        }
    });
}

function reportAssigment(req,res){
    var carrreras = [];
    Assignment.find({},(err,listar)=>{
        if(err){
            res.status(200).send({message: 'Error al listar'})
        }else{
            EducationalCareers.populate(listar,{path: 'career'},(err, resultadoCarrer)=>{
                Person.populate(resultadoCarrer,{path: 'instructor'},(err,resultadoInstructor)=>{
                    Course.populate(resultadoInstructor,{path: 'course'},(err,resultadoCourse)=>{
                        if(err){
                            res.status(200).send({message: 'Error al listar'});
                        }else{
                            res.status(200).send({asignaciones: resultadoCourse});
                            console.log(resultadoCourse)
                        }
                    })
                })
            })
            console.log(carrreras)
        }
    })
}
/**no adapta a nada */
function reportAssigmentCareer(req,res){
    EducationalCareers.find({_id: params},(err,listar)=>{
        if(err){
            res.status(200).send({message: 'Error al listar'})
        }else{
            res.status(200).send({carreras: listar})

        }
    })
}
/**Llamar grados de la base de datos */
function reportAssigmentGrader(req,res){
    Grader.find({},(err,listar)=>{
        if(err){
            res.status(200).send({message: 'Error al listar'});
        }else{
            res.status(200).send({grader: listar})
            console.log(listar)
        }
    })
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
    listInstructor,
    listPerson,
    updateInstructor,
    deleteInstructor,
    searchInstructor,
    saveRedes,
    listRedes,
    updateRedes,
    buscarRedes,
    deleteRedes,
    saveAssignmentInstructor,
    reportAssigmentInstructorCourse,
    saveAssignment,
    listInstructorAssignment,
    reportAssigment,
    reportAssigmentCareer,
    reportAssigmentGrader
}