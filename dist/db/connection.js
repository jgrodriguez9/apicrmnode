"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('crmtsapi', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    //logging: false,
    port: 3306
});
exports.default = db;
//# sourceMappingURL=connection.js.map