import { Router } from 'express';
import { deleteUser, getUser, getUserList, postUser, putUser } from '../controllers/user';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validarCampos';
import { verificarToken } from '../middlewares/verificarToken';

const router = Router()

router.get("/", verificarToken, getUserList)
router.get("/:id", verificarToken, getUser)
router.post('/', verificarToken, [
    check('name', 'Campo requerido').not().isEmpty(),
    check('username', 'Campo requerido').not().isEmpty(),
    check('email', 'Campo requerido').isEmail(),
    check('password', 'Campo requerido').not().isEmpty(),
    check('role_id', 'Campo requerido').not().isEmpty(),
    validarCampos
],
postUser)
router.put('/:id',verificarToken, [
    check('name', 'Campo requerido').not().isEmpty(),
    check('username', 'Campo requerido').not().isEmpty(),
    check('email', 'Campo requerido').isEmail(),
    validarCampos
], putUser)
router.delete("/:id", verificarToken, deleteUser)

export default router;