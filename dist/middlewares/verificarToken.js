"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const util_1 = require("../common/util");
const verificarToken = (req, res, next) => {
    const bearer = req.headers['authorization'];
    if (typeof bearer !== undefined) {
        let token = (bearer === null || bearer === void 0 ? void 0 : bearer.split(" ")[1]) || "";
        jwt.verify(token, util_1.secret_token, (err, decode) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    msg: "Token inválido"
                });
            }
            else {
                req.token = token;
                next();
            }
        });
    }
    else {
        return res.status(403).json({
            success: false,
            msg: "Acceso denegado"
        });
    }
};
exports.verificarToken = verificarToken;
//# sourceMappingURL=verificarToken.js.map