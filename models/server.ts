import express, { Application } from 'express'
import cors from 'cors'
import db from '../db/connection';

//routes
import authRoute from '../routes/auth';
import userRoute from '../routes/user';
import roleRoute from '../routes/roles';
import leadRoute from '../routes/lead';

//data defaul
import { data as dataRole } from '../data/roles'
import Role from './role';
import User from './user';
import { encrypted } from '../common/util';

class Server {
    private app: Application;
    private  port: string;
    private apiPath  = {
        auth: '/api/auth',
        user: '/api/user',
        role: '/api/role',
        lead: '/api/lead'
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8082';

        //db
        this.dbConnection();

        //middlewares
        this.middlewares();

        //definir routes
        this.routes()
    }

    async dbConnection(){
        try {
            await db.authenticate();
            console.log('database connection success')
            
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
        } catch (error:any) {
            throw new Error(error)
        }
    }

    middlewares(){
        //cors
        this.app.use(cors());

        //parse body
        this.app.use(express.json());

        //folder public
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.apiPath.auth, authRoute)
        this.app.use(this.apiPath.user, userRoute)
        this.app.use(this.apiPath.role, roleRoute)
        this.app.use(this.apiPath.lead, leadRoute)
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`server port ${this.port}`)
        })
    }

}

export default Server;