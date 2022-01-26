import { Router } from 'express';
import { check } from 'express-validator';
import { login } from '../controllers/auth';
import { validarCampos } from '../middlewares/validarCampos';

const router = Router()


router.post('/login', [
    check('username', 'Campo requerido').not().isEmpty(),
    check('password', 'Campo requerido').not().isEmpty(),
    validarCampos
],
login)

export default router;