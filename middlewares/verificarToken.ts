import { NextFunction, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { secret_token } from "../common/util";

export const verificarToken = ( req:any, res:Response, next:NextFunction ) =>{
    const bearer = req.headers['authorization'];
    if(typeof bearer !==undefined){
        let token = bearer?.split(" ")[1] || ""

        jwt.verify(token, secret_token, (err:any, decode:any) => {
            if(err){
                return res.status(403).json({
                    success: false,
                    msg: "Token inválido"
                })
            }else{
                req.token = token
                next()
            }
        })
    }else{
        return res.status(403).json({
            success: false,
            msg: "Acceso denegado"
        })
    }
}