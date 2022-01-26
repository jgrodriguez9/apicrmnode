import { DataTypes } from 'sequelize';
import db from '../db/connection';

const User = db.define('User', {
    name: {
        type: DataTypes.STRING
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    username: {
        type: DataTypes.STRING
    },
    delete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }   
});

export default User;