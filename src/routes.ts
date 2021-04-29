import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import apiSpec from '../openapi.json';

import * as CentreUniversitariController from './controllers/CentreUniversitari';
import * as AssignaturaController from './controllers/Assignatura';
import * as EstudiantController from './controllers/Estudiant';
import * as BookController from './controllers/book';
import * as GrauController from './controllers/Grau';

const swaggerUiOptions = {
  customCss: '.swagger-ui .topbar { display: none }'
};

const router = Router();

// CentreUniversitari rutes
router.post('/Centre/add', CentreUniversitariController.add);
router.get('/Centre/getAll', CentreUniversitariController.getAll);
router.get('/Centre/getOne', CentreUniversitariController.getOne);
router.put('/Centre/update', CentreUniversitariController.update);
router.delete('/Centre/delete', CentreUniversitariController.deleteCentre);

// Grau rutes
router.post('/grau/add', GrauController.add);
router.get('/grau/getAll', GrauController.getAll);
router.get('/grau/getOne', GrauController.getOne);
router.put('/grau/update', GrauController.update);
router.delete('/grau/delete', GrauController.deleteGrau);

// Assignatura rutes
router.post('/Assignatura/add', AssignaturaController.add);
router.get('/Assignatura/getAll', AssignaturaController.getAll);
router.get('/Assignatura/getOne', AssignaturaController.getOne);
router.put('/Assignatura/update', AssignaturaController.update);
router.delete('/Assignatura/delete', AssignaturaController.deleteAssignatura);

// Estudiant rutes
router.post('/Estudiant/add', EstudiantController.add);
router.get('/Estudiant/getAll', EstudiantController.getAll);
router.get('/Estudiant/getOne', EstudiantController.getOne);
router.put('/Estudiant/update', EstudiantController.update);
router.delete('/Estudiant/delete', EstudiantController.deleteEstudiant);

// Book routes
router.post('/book/add', BookController.add);
router.get('/book/all', BookController.all);
router.get('/book/search', BookController.search);

// Dev routes
if (process.env.NODE_ENV === 'development') {
  router.use('/dev/api-docs', swaggerUi.serve);
  router.get('/dev/api-docs', swaggerUi.setup(apiSpec, swaggerUiOptions));
}

export default router;
