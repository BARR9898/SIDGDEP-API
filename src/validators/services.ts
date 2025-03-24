import { NextFunction, Request,Response } from "express";
import {check,param,query} from 'express-validator';
import { handleValidatons } from "../middelwares/validaitons.handle";

const createServiceValidations = [
    check('name')
    .exists()
    .notEmpty()
    .isString(),
    check('periodicity')
    .exists()
    .notEmpty()
    .isString(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)

    }
]

const payServiceValidations = [
    check('total')
    .exists()
    .notEmpty()
    .isNumeric(),
    check('agent_id')
    .exists()
    .notEmpty()
    .isString(),
    param('service_id')
    .exists()
    .notEmpty()
    .isString(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)

    }
]

const getServicesValidations = [
    query('name')
    .exists()
    .isString(),
    query('periodicity')
    .exists()
    .isString(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)
        
    }
]

const getServicesReportValidations = [
    query('name')
    .exists()
    .isString(),
    query('periodicity')
    .exists()
    .isString(),
    query('agent')
    .exists()
    .isNumeric(),
    query('start_date')
    .exists()
    .isString(),
    query('end_date')
    .exists()
    .isString(),
    query('pay_date')
    .exists()
    .isString(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)
        
    }
]

const getServiceValidations = [
    param('id')
    .exists()
    .notEmpty()
    .isString(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)
    }
]

const updateServiceValidations = [
    param('id')
    .exists()
    .notEmpty()
    .isString(),
    check('name')
    .exists()
    .notEmpty()
    .isString(),
    check('periodicity')
    .exists()
    .notEmpty()
    .isString(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)

    }
    
]

const deleteServiceValidations = [
    param('id')
    .exists()
    .notEmpty()
    .isString(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)
    }
]


const getServicePaymentsValidations = [
    param('start_date')
    .exists()
    .isString(),
    param('end_date')
    .exists()
    .isString(),
    param('status')
    .exists()
    .isString(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)
    }
]

export {
    createServiceValidations,
    getServicesValidations,
    getServiceValidations,
    updateServiceValidations,
    deleteServiceValidations,
    getServicesReportValidations,
    getServicePaymentsValidations,
    payServiceValidations
};