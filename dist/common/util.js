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
exports.getToken = exports.decrypted = exports.encrypted = exports.secret_token = void 0;
const CryptoJS = __importStar(require("crypto-js"));
const jwt = __importStar(require("jsonwebtoken"));
const secret = "CRMJAVI2022/09/23";
exports.secret_token = "CRMTOKENLOGIN2022/09/23";
const encrypted = (str) => {
    let encrypted = CryptoJS.AES.encrypt(str, secret).toString();
    return encrypted;
};
exports.encrypted = encrypted;
const decrypted = (str) => {
    let decrypted = CryptoJS.AES.decrypt(str, secret);
    return decrypted.toString(CryptoJS.enc.Utf8);
};
exports.decrypted = decrypted;
const getToken = (user) => {
    let token = jwt.sign({ user }, exports.secret_token, {
        expiresIn: '3h'
    });
    return token;
};
exports.getToken = getToken;
//# sourceMappingURL=util.js.map