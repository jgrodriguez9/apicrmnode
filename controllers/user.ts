import { Request, Response } from "express"
import Op from "sequelize/lib/operators"
import { PaginateQuery } from "../common/interfaces"
import { encrypted } from "../common/util"
import { ERROR500 } from "../constant/errors"
import User from "../models/user"



export const getUser = async (req:Request<{}, {}, {}, PaginateQuery>, res:Response) =>{

    //paginate
    const pageAsNumber = Number.parseInt(req.query.page)
    const sizeAsNumber = Number.parseInt(req.query.size)

    let page = 0;
    if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0){
        page = pageAsNumber;
    }

    let size = 20;
    if(!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 20){
        size = sizeAsNumber;
    }

    //filter
    const q = req.query.q;
    let query = "";
    if(q!==undefined){
        query = q;
    }
    


    const { count, rows } = await User.findAndCountAll({
        attributes: ['id','name', 'username', 'email', 'active', 'createdAt'],
        where: {
            [Op.or]: {
                username:{
                    [Op.like]: `%${query}%`
                },
                email: {
                    [Op.like]: `%${query}%`
                }
            },
            delete: false
        },
        offset: page * size,
        limit: size
    });

    return res.json({ content: rows, total_pages: Math.ceil(count / size) })
}

export const postUser = async (req:Request, res:Response) =>{
    const { body } = req
    try {
        //checamos si existe algun user en la BD
        //con el mismo email o username
        const existUser = await User.findOne({
            where: {
                [Op.or]: {
                    username: body.username,
                    email: body.email
                }
            }
        })

        if(existUser){
            return res.status(409).json({
                success: false,
                msg: `Ya existe un registro con el mismo usuario: ${body.username} o correo electrónico: ${body.email}` 
            })
        }

        let data = Object.assign({}, body)
        data.password = encrypted(body.password)
        const user = await User.create(data);
        return res.status(200).json({
            success: true,
            msg: 'salvador correctamente',
            content: user
        })
        
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            msg: ERROR500,
            errors: error.errors
        })
    }
}

export const putUser = async (req:Request, res:Response) =>{
    const { id } = req.params;
    const { body } = req
    try {

        //checamos si existe el usuario
        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({
                success: false,
                msg: "No se encuentra el usuario con id "+id
            })
        }
        //checamos si existe algun user en la BD
        //con el mismo email o username
        const existUser = await User.findOne({
            where: {
                [Op.or]: {
                    username: body.username,
                    email: body.email
                },
                id: {
                    [Op.ne]: id
                }
            }
        })

        if(existUser){
            return res.status(409).json({
                success: false,
                msg: `Ya existe un registro con el mismo usuario: ${body.username} o correo electrónico: ${body.email}` 
            })
        }

        await user.update(body)
        return res.status(200).json({
            success: true,
            msg: 'success',
            content: user
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

export const deleteUser = async (req:Request, res:Response) =>{
    const { id } = req.params;
    try {

        //checamos si existe el usuario
        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({
                success: false,
                msg: "No se encuentra el usuario con id "+id
            })
        }

        await user.update({delete: true})
        return res.status(200).json({
            success: true,
            msg: 'success'
        })
        
    } catch (error: any) {
        console.log(error)
        return res.status(500).json({
            msg: ERROR500,
            errors: error.errors
        })
    }
}