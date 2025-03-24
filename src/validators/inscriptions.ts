import { NextFunction, Request,Response } from "express";
import {check,param,query} from 'express-validator';
import { handleValidatons } from "../middelwares/validaitons.handle";



const getInscriptionsValidations = [
    query('pageSize')
    .exists()
    .isNumeric(),
    query('pageIndex')
    .exists()
    .isNumeric(),
    query('start_date')
    .exists()
    .isString(),
    query('end_date')
    .exists()
    .isString(),
    query('user')
    .exists()
    .isNumeric(),
    query('category_id')
    .exists()
    .isNumeric(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)
        
    }
]

const getCateogiresAssignedValidations = [
    param('inscription_id')
    .exists()
    .isString()
    .notEmpty(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)
        
    }
]

const createInscriptionValidations = [
    check('categorias')
    .exists()
    .isArray()
    .notEmpty(),
    check('usuario_id')
    .exists()
    .isNumeric()
    .notEmpty(),
    check('fecha_inscripcion')
    .exists()
    .isString()
    .notEmpty(),
    check('monto')
    .exists()
    .isNumeric()
    .notEmpty(),
    check('pagado')
    .exists()
    .isNumeric()
    .notEmpty(),
    check('estatus_pago')
    .exists()
    .isBoolean()
    .notEmpty(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)
        
    }
]

const updateCategoryValidations = [
    param('category_id')
    .exists()
    .isString()
    .notEmpty(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)
        
    }
]

const deleteInscriptionValidations = [
    param('inscription_id')
    .exists()
    .isString()
    .notEmpty(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)
        
    }
]

const newDepositInscriptionValidations = [
    param('inscription_id')
    .exists()
    .isString()
    .notEmpty(),
    check('amount')
    .exists()
    .isNumeric()
    .notEmpty(),
    check('payed')
    .exists()
    .isNumeric()
    .notEmpty(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)
        
    }
]



export {
    getInscriptionsValidations,
    createInscriptionValidations,
    updateCategoryValidations,
    deleteInscriptionValidations,
    getCateogiresAssignedValidations,
    newDepositInscriptionValidations

};