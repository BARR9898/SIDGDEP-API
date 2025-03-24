import { NextFunction, Request,Response } from "express";
import {check,param,query} from 'express-validator';
import { handleValidatons } from "../middelwares/validaitons.handle";

const getAccountsPayableValidations = [
    query('start_date')
    .exists()
    .isString(),
    query('end_date')
    .exists()
    .isString(),
    query('status')
    .exists()
    .isString(),
    query('supplier')
    .exists()
    .isNumeric(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)

    }
]

const createAccountPayableValidations = [
    check('date')
    .exists()
    .isString(),
    check('agent')
    .exists()
    .isNumeric(),
    check('supplier')
    .exists()
    .isNumeric(),
    check('iva')
    .exists()
    .isNumeric(),
    check('total')
    .exists()
    .isNumeric(),
    check('subtotal')
    .exists()
    .isNumeric(),
    check('concept')
    .exists()
    .isString(),
    check('status')
    .exists()
    .isBoolean(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)

    }
]


const createAccountPayablePaymentValidations = [
    check('date')
    .exists()
    .isString(),
    check('agent')
    .exists()
    .isNumeric(),
    check('account')
    .exists()
    .isNumeric(),
    check('ammount')
    .exists()
    .isNumeric(),
    check('payment_method')
    .exists()
    .isNumeric(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)

    }
]

const getAccountPayablePaymentsValidations = [
    param('account_id')
    .exists()
    .isString(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)

    }
]

const getAccountPayableValidations = [
    param('account_id')
    .exists()
    .isString(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)

    }
]
export {getAccountsPayableValidations,createAccountPayableValidations,getAccountPayablePaymentsValidations,createAccountPayablePaymentValidations,
    getAccountPayableValidations};