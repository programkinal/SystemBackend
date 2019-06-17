'use stric';

var express = require('express');
var educativeAdministracionController = require('../Controllers/EducAdminController/educativeAdministracionController');
var api = express.Router();

api.post('/Save-Units-Academic', educativeAdministracionController.addAcademicUnits);
api.put('/Update-Units-Academic/:id', educativeAdministracionController.updatedAcademicUnit);
api.put('/Delete-Units-Academic/:id', educativeAdministracionController.deleteAcademicUnit);
api.get('/List-Units-Academic', educativeAdministracionController.listAcademicUnit);



/**--------------------------------------------------------------EducationalCareers-------------------------------------------------------------------------------------------- */
api.post('/Save-Career-Educative',educativeAdministracionController.addEducationalCareers);
api.put('/Update-Career-Educative/:id',educativeAdministracionController.updateEducationalCareers);
api.put('/Delete-Career-Educative/:id', educativeAdministracionController.deleteEducationalCareers);
api.get('/List-Career-Educative', educativeAdministracionController.listEducationlCareers);
api.post('/SearchCareer', educativeAdministracionController.searchEducationCareers);


/**---------------------------------------------------------COURSE------------------------------------------------------------------- */
api.post('/Save-Course', educativeAdministracionController.saveCourse);
api.get('/List-Course', educativeAdministracionController.listCourse);
api.put('/Update-Course/:id', educativeAdministracionController.updateCourse);
api.put('/Delete-Course/:id', educativeAdministracionController.deleteCourse);
api.post('/Search-Course', educativeAdministracionController.searchCourse);

/**---------------------------------------------------------INSTRUCTOR------------------------------------------------------------------- */
api.get('/PruebaInstructor', educativeAdministracionController.pruebaInstructor);
api.post('/saveInstructor', educativeAdministracionController.addInstructor);
api.get('/listInstructor', educativeAdministracionController.listInstructor);
api.get('/listPerson', educativeAdministracionController.listPerson);
api.put('/updateInstructor/:id', educativeAdministracionController.updateInstructor);
api.put('/deleteInstructor/:id', educativeAdministracionController.deleteInstructor);
api.post('/searchInstructor/:id', educativeAdministracionController.searchInstructor);

/**---------------------------------------------------------REDES ACADEMICAS------------------------------------------------------------------- */
api.post('/saveRedes', educativeAdministracionController.saveRedes);
api.get('/listRedes', educativeAdministracionController.listRedes);
api.put('/updateRedes/:id', educativeAdministracionController.updateRedes);
api.get('/BuscarRedes/:id', educativeAdministracionController.buscarRedes);
api.put('/deleteRedes/:id',educativeAdministracionController.deleteRedes);
api.get('/Listar-Assignmete-Redes',educativeAdministracionController.buscarRedAssignment)
/**----------------------------------------------------Asignacion por instructor a curso---------------------------- */
api.post('/saveAssignmentInstructor-Course', educativeAdministracionController.saveAssignmentInstructor);
api.get('/List-Assignment-Instructor-Course', educativeAdministracionController.reportAssigmentInstructorCourse);
/**-----------------------------------------------------Assignameten y Seccion-------------------------------------------------------- */
api.post('/saveAssignment', educativeAdministracionController.saveAssignment);
api.get('/List-Instructor-Assignment', educativeAdministracionController.listInstructorAssignment);
api.get('/report-Assignment', educativeAdministracionController.reportAssigment);
api.post('/report-Assignment-Career', educativeAdministracionController.reportAssigmentCareer);
api.get('/report-Assignment-Grader', educativeAdministracionController.reportAssigmentGrader);
api.get('/List-Assignment-Jornada', educativeAdministracionController.reportAssigmentWorkindDay);
api.get('/List-Assignment-Section', educativeAdministracionController.reportAssigmentSection);
/**----------------------------------------------CourseNetworks--------------------------------------------------- */
api.post('/save-Course-Networks', educativeAdministracionController.saveCourseNetworks);
api.get('/List-Course-Network', educativeAdministracionController.reportCourseNetworks);
api.put('/Update-Course-Network/:id', educativeAdministracionController.updateCourseNetworks);
api.put('/Delete-Course-Network/:id',educativeAdministracionController.deleteCourseNetwork);

/**-------------------------------------------ListGrader------------------------------------------------------------------- */
api.get('/ListGrader', educativeAdministracionController.listGrader);
module.exports = api