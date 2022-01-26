import { Request, Response } from "express"
import Op from "sequelize/lib/operators"
import { decrypted, getToken } from "../common/util"
import { ERROR500 } from "../constant/errors"
import User from "../models/user"

export const login = async (req:Request, res:Response) =>{
    const { body } = req
    try {
        //checamos si existe algun user en la BD
        //con el mismo email o username
        const existUser = await User.findOne({
            where: {
                [Op.or]: {
                    username: body.username,
                    email: body.username
                }
            }
        })
        if(!existUser){
            return res.status(404).json({
                success: false,
                msg: 'No existe usuario'
            })
        }

        //obtenemos el password y lo comparamos
        let passDecrypt = decrypted(existUser.get("password"))
        if(passDecrypt !== body.password){
            return res.status(404).json({
                success: false,
                msg: 'La constraseña no coincide'
            })
        }

        //obtenemos el jwt
        let token = getToken(existUser)
        return res.status(200).json({
            success: true,
            token: token
        })
        
    } catch (error: any) {
        console.log(error)
        return res.status(500).json({
            success: false,
            msg: ERROR500,
            errors: error.errors
        })
    }
}