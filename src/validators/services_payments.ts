import { NextFunction, Request,Response } from "express";
import {check,param,query} from 'express-validator';
import { handleValidatons } from "../middelwares/validaitons.handle";

const payServiceValidations = [
    check('total')
    .exists()
    .notEmpty()
    .isNumeric(),
    check('agent_id')
    .exists()
    .notEmpty()
    .isString(),
    check('payment_method')
    .exists()
    .notEmpty()
    .isNumeric(),
    param('service_id')
    .exists()
    .notEmpty()
    .isString(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)

    }
]

const getServicePaymentsValidations = [
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

const deleteServicePaymentValidations = [
    param('payment_id')
    .exists()
    .isString(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)
    }
]

export {
    getServicePaymentsValidations,
    payServiceValidations,
    deleteServicePaymentValidations
};