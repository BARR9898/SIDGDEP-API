import { NextFunction, Request,Response } from "express";
import {check,param,query} from 'express-validator';
import { handleValidatons } from "../middelwares/validaitons.handle";

const payMensualityValidations = [
    check('start_date')
    .exists()
    .notEmpty()
    .isString(),
    check('end_date')
    .exists()
    .notEmpty()
    .isString(),
    check('total')
    .exists()
    .notEmpty()
    .isNumeric(),
    check('payed')
    .exists()
    .notEmpty()
    .isNumeric(),
    check('user_id')
    .exists()
    .notEmpty()
    .isNumeric(),
    check('agent_id')
    .exists()
    .notEmpty()
    .isNumeric(),
    check('status')
    .exists()
    .notEmpty()
    .isBoolean(),
    check('promotion_id')
    .exists(),
    check('payment_method')
    .exists()
    .notEmpty()
    .isNumeric(),
    check('additional_descent')
    .exists()
    .notEmpty()
    .isNumeric(),
    check('categories')
    .exists()
    .notEmpty()
    .isArray(),
    
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)

    }
]

const getPendingPaymentsValidations = [
    query('name')
    .exists()
    .isString(),
    query('lastname')
    .exists()
    .isString(),
    query('second_lastname')
    .exists()
    .isString(),
    query('status')
    .exists()
    .isString(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)
        
    }
]

const newDepositValidations = [
    check('agent_id')
    .exists()
    .notEmpty()
    .isNumeric(),
    check('date')
    .exists()
    .notEmpty()
    .isString(),
    check('mensuality_id')
    .exists()
    .notEmpty()
    .isNumeric(),
    check('pay_method')
    .exists()
    .notEmpty()
    .isNumeric(),
    check('total')
    .exists()
    .notEmpty()
    .isNumeric(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)
    }
]

const getMensualityesValidations = [
    
    query('user')
    .exists()
    .isNumeric(),
    query('payment_status')
    .exists()
    .isString(),
    query('agent')
    .exists()
    .isNumeric(),
    query('payment_type')
    .exists()
    .isNumeric(),
    query('promotion_id')
    .exists()
    .isNumeric(),
    query('pageIndex')
    .exists()
    .isNumeric(),
    query('pageSize')
    .exists()
    .isNumeric(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)
        
    }
]

const deleteUserValidations = [
    param('id')
    .exists()
    .notEmpty()
    .isString(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)
    }
]



const getMonthlyCategoriesValidations = [
    param('mensuality_id')
    .exists()
    .notEmpty()
    .isString(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)
    }
]

const getMnesualityValidaitons = [
    param('mensuality_id')
    .exists()
    .notEmpty()
    .isString(),    
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)

    }
]

const deleteMonthlyCategoriesValidations = [
    param('mensuality_id')
    .exists()
    .notEmpty()
    .isString(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)
    }
]

export {payMensualityValidations,newDepositValidations,getPendingPaymentsValidations,getMensualityesValidations,deleteUserValidations,
    getMonthlyCategoriesValidations,
    getMnesualityValidaitons,
    deleteMonthlyCategoriesValidations
};