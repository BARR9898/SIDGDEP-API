import { NextFunction, Request,Response } from "express";
import {check,param,query} from 'express-validator';
import { handleValidatons } from "../middelwares/validaitons.handle";

const getAccountsReceivablePaymentsValidations = [
    query('start_date')
    .exists()
    .isString(),
    query('end_date')
    .exists()
    .isString(),
    query('agent')
    .exists()
    .isNumeric(),
    query('user')
    .exists()
    .isNumeric(),
    query('payment_method')
    .exists()
    .isNumeric(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)

    }
]

const getAccountsReceivableValidations = [
    query('start_date')
    .exists()
    .isString(),
    query('end_date')
    .exists()
    .isString(),
    query('agent')
    .exists()
    .isNumeric(),
    query('user')
    .exists()
    .isNumeric(),
    query('payment_method')
    .exists()
    .isNumeric(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)

    }
]


const getAccountReceivableProductsValidations = [
    param('account_id')
    .exists()
    .isString()
    .notEmpty(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)

    }
]

const getAccountReceivableDepositsValidations = [
    query('pageIndex')
    .exists()
    .isNumeric()
    .notEmpty(),
    query('pageSize')
    .exists()
    .isNumeric()
    .notEmpty(),
    query('start_date')
    .exists()
    .isString(),
    query('end_date')
    .exists()
    .isString(),
    query('user')
    .exists()
    .isNumeric(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)

    }
]


const getAccountReceivablePaymentsValidations = [
    param('account_id')
    .exists()
    .isString()
    .notEmpty(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)

    }
]

const createAccountReceivableDepositValidations = [
    check('account')
    .exists()
    .isNumeric()
    .notEmpty(),
    check('ammount')
    .exists()
    .isNumeric()
    .notEmpty(),
    check('date')
    .exists()
    .isString()
    .notEmpty(),
    check('payment_method')
    .exists()
    .isNumeric()
    .notEmpty(),
    check('agent')
    .exists()
    .isString()
    .notEmpty(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)

    }
]

export {getAccountsReceivablePaymentsValidations,getAccountsReceivableValidations,getAccountReceivableProductsValidations,
    createAccountReceivableDepositValidations,getAccountReceivablePaymentsValidations,
    getAccountReceivableDepositsValidations
};