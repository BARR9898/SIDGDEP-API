import { NextFunction, Request,Response } from "express";
import {check,param,query} from 'express-validator';
import { handleValidatons } from "../middelwares/validaitons.handle";


const getHistoryPaymentsValidations = [

    param('mensuality_id')
    .exists()
    .notEmpty()
    .isNumeric(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)

    }
]

const getPaymentsValidations = [

    query('name')
    .exists()
    .isString(),
    query('lastname')
    .exists()
    .isString(),
    query('second_lastname')
    .exists()
    .isString(),
    query('start_date')
    .exists()
    .isString(),
    query('end_date')
    .exists()
    .isString(),
    query('payment_method')
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



export {getHistoryPaymentsValidations,getPaymentsValidations};