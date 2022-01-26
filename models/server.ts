import express, { Application } from 'express'
import authRoute from '../routes/auth';
import userRoute from '../routes/user';
import cors from 'cors'
import db from '../db/connection';

class Server {
    private app: Application;
    private  port: string;
    private apiPath  = {
        auth: '/api/auth',
        user: '/api/user'
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
            console.log('database online')
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
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`server port ${this.port}`)
        })
    }

}

export default Server;