import {Router} from 'express';
import {login,register} from '../controllers/authController.js';
import {createTodo,getTodos} from '../controllers/todoController.js';
import {verifyToken} from '../middlewares/authMiddleware.js';
import {validateLogin,validateRegister,validateTodo} from '../middlewares/validator.js';
const router=Router();
router.post('/auth/register',validateRegister,register); router.post('/auth/login',validateLogin,login); router.get('/todos',verifyToken,getTodos); router.post('/todos',verifyToken,validateTodo,createTodo);
export default router;