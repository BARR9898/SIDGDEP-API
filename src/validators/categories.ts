import { NextFunction, Request,Response } from "express";
import {check,param,query} from 'express-validator';
import { handleValidatons } from "../middelwares/validaitons.handle";



const getCategoriesValidators = [
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
    query('status')
    .exists()
    .isString(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)
        
    }
]

const createCategoryValidations = [
    check('nombre')
    .exists()
    .isString()
    .notEmpty(),
    check('fecha_creacion')
    .exists()
    .isString()
    .notEmpty(),
    check('costo')
    .exists()
    .isNumeric()
    .notEmpty(),
    check('inscripcion')
    .exists()
    .isNumeric()
    .notEmpty(),
    check('beneficio_instructor')
    .exists()
    .isNumeric()
    .notEmpty(),
    check('beneficio_academia')
    .exists()
    .isNumeric()
    .notEmpty(),
    check('estatus')
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

const deleteCategoryValidations = [
    param('category_id')
    .exists()
    .isString()
    .notEmpty(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)
        
    }
]

const getUserCategoriesInscriptionValidations = [
    param('user_id')
    .exists()
    .isString()
    .notEmpty(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)
        
    }
]



export {
    getCategoriesValidators,
    createCategoryValidations,
    updateCategoryValidations,
    deleteCategoryValidations,
    getUserCategoriesInscriptionValidations

};