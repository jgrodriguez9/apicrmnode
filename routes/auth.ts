import { Router } from 'express';
import { check } from 'express-validator';
import { getUserLogued, login } from '../controllers/auth';
import { validarCampos } from '../middlewares/validarCampos';
import { verificarToken } from '../middlewares/verificarToken';

const router = Router()


router.post('/login', [
    check('username', 'Campo requerido').not().isEmpty(),
    check('password', 'Campo requerido').not().isEmpty(),
    validarCampos
],
login)
router.get('/loguedUser', verificarToken, getUserLogued)

export default router;