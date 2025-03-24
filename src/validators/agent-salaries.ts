import { NextFunction, Request,Response } from "express";
import {check,param,query} from 'express-validator';
import { handleValidatons } from "../middelwares/validaitons.handle";


const deleteAgentSalaryPaymentValidations = [
    
    param('id')
    .exists()
    .notEmpty()
    .isString(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)

    }
]

const getAgentsSalariesValidations = [
    
    query('pageSize')
    .exists()
    .notEmpty()
    .isNumeric(),
    query('pageIndex')
    .exists()
    .notEmpty()
    .isNumeric(),
    query('agent')
    .exists()
    .notEmpty()
    .isNumeric(),
    query('start_date')
    .exists()
    .isString(),
    query('end_date')
    .exists()
    .isString(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)

    }
]

const postAgentSalaryValidators = [
    
    check('fecha_de_pago')
    .exists()
    .notEmpty()
    .isString(),
    check('metodo_de_pago')
    .exists()
    .notEmpty()
    .isNumeric(),
    check('cantidad')
    .exists()
    .notEmpty()
    .isNumeric(),
    check('agente_id')
    .exists()
    .isNumeric(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)

    }
]


export {
    deleteAgentSalaryPaymentValidations,
    getAgentsSalariesValidations,
    postAgentSalaryValidators
};