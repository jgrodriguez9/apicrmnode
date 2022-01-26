"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserLogued = exports.login = void 0;
const operators_1 = __importDefault(require("sequelize/lib/operators"));
const util_1 = require("../common/util");
const errors_1 = require("../constant/errors");
const user_1 = __importDefault(require("../models/user"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        //checamos si existe algun user en la BD
        //con el mismo email o username
        const existUser = yield user_1.default.findOne({
            where: {
                [operators_1.default.or]: {
                    username: body.username,
                    email: body.username
                }
            }
        });
        if (!existUser) {
            return res.status(404).json({
                success: false,
                msg: 'No existe usuario'
            });
        }
        //obtenemos el password y lo comparamos
        let passDecrypt = (0, util_1.decrypted)(existUser.get("password"));
        if (passDecrypt !== body.password) {
            return res.status(404).json({
                success: false,
                msg: 'La constraseña no coincide'
            });
        }
        //obtenemos el jwt
        let token = (0, util_1.getToken)(existUser);
        return res.status(200).json({
            success: true,
            token: token
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            msg: errors_1.ERROR500,
            errors: error.errors
        });
    }
});
exports.login = login;
const getUserLogued = (req, res) => {
    const { token } = req;
    try {
        const authData = (0, util_1.getDecodeToken)(token);
        return res.status(200).json({
            success: true,
            content: authData
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            msg: errors_1.ERROR500,
            errors: error.errors
        });
    }
};
exports.getUserLogued = getUserLogued;
//# sourceMappingURL=auth.js.map