import { NextFunction, Request,Response } from "express";
import {check,param,query} from 'express-validator';
import { handleValidatons } from "../middelwares/validaitons.handle";

const getPendingMonthlyPaymentsValidations = [
    check('start_date')
    .exists()
    .isString(),
    check('end_date')
    .exists()
    .isString(),
        (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)

    }
]

const getPayedMonthlyPaymentsValidations = [
    check('start_date')
    .exists()
    .isString(),
    check('end_date')
    .exists()
    .isString(),
        (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)

    }
]

const getBussinesServicesPaymentsValidations = [
    check('start_date')
    .exists()
    .isString(),
    check('end_date')
    .exists()
    .isString(),
        (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)

    }
]

const getCashFlowReportValidations = [
    check('start_date')
    .exists()
    .isString(),
    check('end_date')
    .exists()
    .isString(),
        (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)

    }
]

const getEarningsGroupedByCategoriesValidations = [
    check('start_date')
    .exists()
    .isString(),
    check('end_date')
    .exists()
    .isString(),
        (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)

    }
]

export { getPendingMonthlyPaymentsValidations, getPayedMonthlyPaymentsValidations, getBussinesServicesPaymentsValidations, getCashFlowReportValidations,getEarningsGroupedByCategoriesValidations };