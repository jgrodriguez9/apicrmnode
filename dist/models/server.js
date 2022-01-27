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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../db/connection"));
//routes
const auth_1 = __importDefault(require("../routes/auth"));
const user_1 = __importDefault(require("../routes/user"));
const roles_1 = __importDefault(require("../routes/roles"));
const lead_1 = __importDefault(require("../routes/lead"));
class Server {
    constructor() {
        this.apiPath = {
            auth: '/api/auth',
            user: '/api/user',
            role: '/api/role',
            lead: '/api/lead'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8082';
        //db
        this.dbConnection();
        //middlewares
        this.middlewares();
        //definir routes
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('database connection success');
                //sync
                //await db.sync({force: true})
                //console.log('database online sync')
                //data default
                //Role.bulkCreate(dataRole)
                // User.create({
                //     name: 'Admin',
                //     email: 'admin@admin.com',
                //     username: "admin",
                //     active: true,
                //     password: encrypted('123456')   ,
                //     role_id: 1             
                // })
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    middlewares() {
        //cors
        this.app.use((0, cors_1.default)());
        //parse body
        this.app.use(express_1.default.json());
        //folder public
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPath.auth, auth_1.default);
        this.app.use(this.apiPath.user, user_1.default);
        this.app.use(this.apiPath.role, roles_1.default);
        this.app.use(this.apiPath.lead, lead_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`server port ${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map