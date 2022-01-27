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
exports.deleteUser = exports.putUser = exports.postUser = exports.getUser = exports.getUserList = void 0;
const operators_1 = __importDefault(require("sequelize/lib/operators"));
const util_1 = require("../common/util");
const errors_1 = require("../constant/errors");
const role_1 = __importDefault(require("../models/role"));
const user_1 = __importDefault(require("../models/user"));
const getUserList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //paginate
    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = Number.parseInt(req.query.size);
    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
        page = pageAsNumber;
    }
    let size = 20;
    if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 20) {
        size = sizeAsNumber;
    }
    //filter
    const q = req.query.q;
    let query = "";
    if (q !== undefined) {
        query = q;
    }
    const { count, rows } = yield user_1.default.findAndCountAll({
        attributes: ['id', 'name', 'username', 'email', 'active', 'createdAt'],
        include: role_1.default,
        where: {
            [operators_1.default.or]: {
                username: {
                    [operators_1.default.like]: `%${query}%`
                },
                email: {
                    [operators_1.default.like]: `%${query}%`
                }
            },
            delete: false
        },
        offset: page * size,
        limit: size
    });
    return res.json({ content: rows, total_pages: Math.ceil(count / size) });
});
exports.getUserList = getUserList;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        //checamos si existe el usuario
        const user = yield user_1.default.findByPk(id, {
            include: role_1.default
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "No se encuentra el usuario con id " + id
            });
        }
        return res.status(200).json({
            success: true,
            msg: 'success',
            content: user
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            msg: errors_1.ERROR500,
            errors: error.errors
        });
    }
});
exports.getUser = getUser;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        //checamos si existe algun user en la BD
        //con el mismo email o username
        const existUser = yield user_1.default.findOne({
            where: {
                [operators_1.default.or]: {
                    username: body.username,
                    email: body.email
                }
            }
        });
        if (existUser) {
            return res.status(409).json({
                success: false,
                msg: `Ya existe un registro con el mismo usuario: ${body.username} o correo electrónico: ${body.email}`
            });
        }
        let data = Object.assign({}, body);
        data.password = (0, util_1.encrypted)(body.password);
        const user = yield user_1.default.create(data);
        return res.status(200).json({
            success: true,
            msg: 'salvador correctamente',
            content: user
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
exports.postUser = postUser;
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        //checamos si existe el usuario
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "No se encuentra el usuario con id " + id
            });
        }
        //checamos si existe algun user en la BD
        //con el mismo email o username
        const existUser = yield user_1.default.findOne({
            where: {
                [operators_1.default.or]: {
                    username: body.username,
                    email: body.email
                },
                id: {
                    [operators_1.default.ne]: id
                }
            }
        });
        if (existUser) {
            return res.status(409).json({
                success: false,
                msg: `Ya existe un registro con el mismo usuario: ${body.username} o correo electrónico: ${body.email}`
            });
        }
        yield user.update(body);
        return res.status(200).json({
            success: true,
            msg: 'success',
            content: user
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            msg: errors_1.ERROR500,
            errors: error.errors
        });
    }
});
exports.putUser = putUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        //checamos si existe el usuario
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "No se encuentra el usuario con id " + id
            });
        }
        yield user.update({ delete: true });
        return res.status(200).json({
            success: true,
            msg: 'success'
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: errors_1.ERROR500,
            errors: error.errors
        });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.js.map