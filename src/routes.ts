import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import apiSpec from '../openapi.json';

import * as CentreUniversitariController from './controllers/CentreUniversitari';
import * as AssignaturaController from './controllers/Assignatura';
import * as EstudiantController from './controllers/Estudiant';
import * as GrauController from './controllers/Grau';
import * as Xat from './controllers/Xat';
import * as XatGrupal from './controllers/XatGrupal';
import * as XatMentor from './controllers/XatMentor';
import * as XatGrupTancat from './controllers/XatGrupTancat';
import * as CursadaController from './controllers/Cursada';
import * as ParticipantController from './controllers/Participant';
import * as MissatgeController from './controllers/Missatge';
import * as EnquestaController from './controllers/Enquesta';
import * as XatAssignatura from './controllers/XatAssignatura';
import authentication from './middleware/authentication';

const swaggerUiOptions = {
  customCss: '.swagger-ui .topbar { display: none }'
};

const router = Router();

// CentreUniversitari rutes
router.post('/centre/add', CentreUniversitariController.add);
router.get('/centre/getAll', CentreUniversitariController.getAll);
router.get('/centre/getOne', CentreUniversitariController.getOne);
router.put('/centre/update', CentreUniversitariController.update);
router.delete('/centre/delete', CentreUniversitariController.deleteCentre);

// Grau rutes
router.post('/grau/add', GrauController.add);
router.get('/grau/getAll', GrauController.getAll);
router.get('/grau/getOne', GrauController.getOne);
router.put('/grau/update', GrauController.update);
router.delete('/grau/delete', GrauController.deleteGrau);

// Cursada rutes
router.post('/cursada/add', CursadaController.add);
router.get('/cursada/getAll', CursadaController.getAll);
router.get('/cursada/getOne', CursadaController.getOne);
router.put('/cursada/update', CursadaController.update);
router.delete('/cursada/delete', CursadaController.deleteCursada);

// Participant rutes
router.post('/participant', ParticipantController.add);
router.get('/participant', ParticipantController.getAll);
router.get('/participant/:est/:xat', ParticipantController.getOne);
router.put('/participant', ParticipantController.update);
router.delete('/participant', ParticipantController.deleteParticipant);
router.delete('/participant/xat/:id', ParticipantController.deleteParticipantXat);

// Missatge rutes
router.post('/missatge/add', MissatgeController.add);
router.get('/missatge/getAll', MissatgeController.getAll);
router.get('/missatge/getOne', MissatgeController.getOne);
router.get('/missatge/xat/:id', MissatgeController.getXat);
router.put('/missatge/update', MissatgeController.update);
router.delete('/missatge/delete', MissatgeController.deleteMissatge);
router.delete('/missatge/xat/:id', MissatgeController.deleteMissatgeXat);

// Enquesta rutes
router.post('/enquesta/add', EnquestaController.add);
router.get('/enquesta/getAll', EnquestaController.getAll);
router.get('/enquesta/getOne', EnquestaController.getOne);
router.put('/enquesta/update', EnquestaController.update);
router.delete('/enquesta/delete', EnquestaController.deleteEnquesta);

// Assignatura rutes
router.post('/assignatura/add', AssignaturaController.add);
router.get('/assignatura/getAll', AssignaturaController.getAll);
router.get('/assignatura/getOne', AssignaturaController.getOne);
router.get('/assignatura/:grau/:quad', AssignaturaController.getQuadrimestreGrau);
router.put('/assignatura/update', AssignaturaController.update);
router.delete('/assignatura/delete', AssignaturaController.deleteAssignatura);

// Estudiant rutes
router.post('/estudiant/auth/signin', EstudiantController.signin);
router.get('/estudiant/auth/session', authentication, (req, res) => res.send({ msg: 'Success' }));
router.post('/estudiant/auth/signup', EstudiantController.signup);
router.get('/estudiant', EstudiantController.getAll);
router.get('/mentors', EstudiantController.getMentors);
router.get('/estudiant/:id', EstudiantController.getOne);
router.get('/estudiant/xats/:id', EstudiantController.getXats);
router.get('/estudiants/:id', EstudiantController.getEstudiants);
router.get('/estudiant/grups/:id', EstudiantController.getGrups);
router.put('/estudiant/:id', EstudiantController.update);
router.delete('/estudiant/:id', EstudiantController.deleteEstudiant);

// Estudiant VerificationToken rutes
router.get('/estudiant/verify/:token', EstudiantController.verify);

// Xat rutes
router.post('/Xat', Xat.add);
router.get('/Xat', Xat.getAll);
router.get('/Xat/:id', Xat.getOne);
router.put('/Xat/:id', Xat.update);
router.delete('/Xat/:id', Xat.deleteXat);
router.get('/Xat/Parts/:nom1/:nom2', Xat.getXatParts);

// XatGrupal rutes
router.post('/XatGrupal', XatGrupal.add);
router.get('/XatGrupal', XatGrupal.getAll);
router.get('/XatGrupal/:id', XatGrupal.getOne);
router.put('/XatGrupal/:id', XatGrupal.update);
router.delete('/XatGrupal/:id', XatGrupal.deleteXatGrupal);

// XatAssignatura rutes
router.post('/XatAssignatura', XatAssignatura.add);
router.post('/XatAssignatura/getXatAssig', XatAssignatura.getXatAssig);
router.get('/XatAssignatura', XatAssignatura.getAll);
router.get('/XatAssignatura/getOne', XatAssignatura.getOne);
router.get('/XatAssignatura/getOneID/:id', XatAssignatura.getOneID);
router.put('/XatAssignatura/:id', XatAssignatura.update);
router.delete('/XatAssignatura/:id', XatAssignatura.deleteXatAssignatura);

// XatMentor rutes
router.post('/XatMentor', XatMentor.add);
router.get('/XatMentor', XatMentor.getAll);
router.get('/XatMentor/:id', XatMentor.getOne);
router.put('/XatMentor/:id', XatMentor.update);
router.delete('/XatMentor/:id', XatMentor.deleteXatMentor);

// XatGrupTancat rutes
router.post('/XatGrupTancat', XatGrupTancat.add);
router.get('/XatGrupTancat', XatGrupTancat.getAll);
router.get('/XatGrupTancat/:id', XatGrupTancat.getOne);
router.put('/XatGrupTancat/:id', XatGrupTancat.update);
router.delete('/XatGrupTancat/:id', XatGrupTancat.deleteXatGrupTancat);

// Dev routes
if (process.env.NODE_ENV === 'development') {
  router.use('/dev/api-docs', swaggerUi.serve);
  router.get('/dev/api-docs', swaggerUi.setup(apiSpec, swaggerUiOptions));
}

export default router;
