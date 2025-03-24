import { NextFunction, Request,Response } from "express";
import {check,param,query} from 'express-validator';
import { handleValidatons } from "../middelwares/validaitons.handle";

const createSupplierValidation = [
    check('name')
    .exists()
    .notEmpty()
    .isString(),
    check('rfc')
    .exists()
    .notEmpty()
    .isString(),
    check('registation_date')
    .exists()
    .notEmpty()
    .isString(),
    check('status')
    .exists()
    .notEmpty()
    .isBoolean(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)

    }
]

const getSuppliersValidations = [
    query('supplier')
    .exists()
    .isNumeric(),
    query('start_date')
    .exists()
    .isString(),
    check('end_date')
    .exists()
    .isString(),
    check('status')
    .exists()
    .isString(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)

    }
]

const deleteSupplierValidations = [
    param('id_supplier')
    .exists()
    .isString()
    .notEmpty(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)

    }
]


const updateSupplierValidations = [
    param('id_supplier')
    .exists()
    .isString()
    .notEmpty(),
    check('name')
    .exists()
    .notEmpty()
    .isString(),
    check('rfc')
    .exists()
    .notEmpty()
    .isString(),
    check('status')
    .exists()
    .notEmpty()
    .isBoolean(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)
    }
]



export {createSupplierValidation,getSuppliersValidations,deleteSupplierValidations,updateSupplierValidations};