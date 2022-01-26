"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../controllers/auth");
const validarCampos_1 = require("../middlewares/validarCampos");
const verificarToken_1 = require("../middlewares/verificarToken");
const router = (0, express_1.Router)();
router.post('/login', [
    (0, express_validator_1.check)('username', 'Campo requerido').not().isEmpty(),
    (0, express_validator_1.check)('password', 'Campo requerido').not().isEmpty(),
    validarCampos_1.validarCampos
], auth_1.login);
router.get('/loguedUser', verificarToken_1.verificarToken, auth_1.getUserLogued);
exports.default = router;
//# sourceMappingURL=auth.js.map