import express from 'express';
const router = express.Router();
import StudentController from '../../controllers/students/studentController.js';

router.get('/getAllStudents', StudentController.getAllStudents);
// router.post('/ediUser', StudentController.editUserById);
router.post('/createStudent', StudentController.createStudent);
router.get('/getStudent', StudentController.getStudentByCpf);
// router.post('/signInUser', StudentController.signInUser);
// router.post('/deletar-usuario', StudentController.deleteUserById); // utiliza query params

export default router;
