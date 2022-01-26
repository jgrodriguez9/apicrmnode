import { Sequelize } from 'sequelize'

const db = new Sequelize('crmtsapi', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    //logging: false,
    port: 3306
});

export default db;