import { NextFunction, Request,Response } from "express";
import {check,param,query} from 'express-validator';
import { handleValidatons } from "../middelwares/validaitons.handle";



const getDepositsInscriptionsValidations = [
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
    query('payment_method')
    .exists()
    .isString(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)
        
    }
]

const deleteDepositInscriptionValidators = [
    param('deposit_id')
    .exists()
    .notEmpty()
    .isString(),
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
    check('payment_method')
    .exists()
    .isNumeric()
    .notEmpty(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)
        
    }
]







export {
    getDepositsInscriptionsValidations,
    deleteDepositInscriptionValidators,
    newDepositInscriptionValidations

};