import { NextFunction, Request,Response } from "express";
import {check,param,query} from 'express-validator';
import { handleValidatons } from "../middelwares/validaitons.handle";


const newCommoditySaleValidations = [
    
    check('date')
    .exists()
    .notEmpty()
    .isString(),
    check('products')
    .exists()
    .notEmpty()
    .isArray(),
    check('total')
    .exists()
    .notEmpty()
    .isNumeric(),
    check('user')
    .exists()
    .notEmpty()
    .isNumeric(),
    check('subtotal')
    .exists()
    .notEmpty()
    .isNumeric(),
    check('iva')
    .exists()
    .notEmpty()
    .isNumeric(),
    check('status')
    .exists()
    .notEmpty()
    .isBoolean(),
    check('agent')
    .exists()
    .notEmpty()
    .isNumeric(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)

    }
]

const getCommoditySalesValidators = [

    
    check('start_date')
    .exists()
    .isString(),
    check('end_date')
    .exists()
    .isString(),
    check('user')
    .exists()
    .isNumeric(),
    check('merchancy')
    .exists()
    .isString(),
    check('agent')
    .exists()
    .isString(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)

    }
]

const getCommoditySaleProductsValidations = [

    
    param('sale_id')
    .exists()
    .isString()
    .notEmpty(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)

    }
]

const getCommoditySaleDepositsValidations = [

    
    param('sale_id')
    .exists()
    .isString()
    .notEmpty(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)

    }
]

const deleteCommoditySaleValidations = [

    
    param('sale_id')
    .exists()
    .isString()
    .notEmpty(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)

    }
]

const getCommoditySaleValidations = [

    
    param('sale_id')
    .exists()
    .isString()
    .notEmpty(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)

    }
]

export {   
    newCommoditySaleValidations,
    getCommoditySalesValidators,
    getCommoditySaleProductsValidations,
    deleteCommoditySaleValidations,
    getCommoditySaleDepositsValidations,
    getCommoditySaleValidations
}