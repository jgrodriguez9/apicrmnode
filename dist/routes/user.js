"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const express_validator_1 = require("express-validator");
const validarCampos_1 = require("../middlewares/validarCampos");
const verificarToken_1 = require("../middlewares/verificarToken");
const router = (0, express_1.Router)();
router.get("/", verificarToken_1.verificarToken, user_1.getUserList);
router.get("/:id", verificarToken_1.verificarToken, user_1.getUser);
router.post('/', verificarToken_1.verificarToken, [
    (0, express_validator_1.check)('name', 'Campo requerido').not().isEmpty(),
    (0, express_validator_1.check)('username', 'Campo requerido').not().isEmpty(),
    (0, express_validator_1.check)('email', 'Campo requerido').isEmail(),
    (0, express_validator_1.check)('password', 'Campo requerido').not().isEmpty(),
    (0, express_validator_1.check)('role_id', 'Campo requerido').not().isEmpty(),
    validarCampos_1.validarCampos
], user_1.postUser);
router.put('/:id', verificarToken_1.verificarToken, [
    (0, express_validator_1.check)('name', 'Campo requerido').not().isEmpty(),
    (0, express_validator_1.check)('username', 'Campo requerido').not().isEmpty(),
    (0, express_validator_1.check)('email', 'Campo requerido').isEmail(),
    validarCampos_1.validarCampos
], user_1.putUser);
router.delete("/:id", verificarToken_1.verificarToken, user_1.deleteUser);
exports.default = router;
//# sourceMappingURL=user.js.map