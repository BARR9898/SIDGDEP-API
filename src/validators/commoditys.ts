import { NextFunction, Request,Response } from "express";
import {check,param,query} from 'express-validator';
import { handleValidatons } from "../middelwares/validaitons.handle";

const createCommodityValidations = [
    check('category')
    .exists()
    .notEmpty()
    .isNumeric(),
    check('name')
    .exists()
    .notEmpty()
    .isString(),
    check('agent_id')
    .exists()
    .notEmpty()
    .isString(),
    check('price')
    .exists()
    .notEmpty()
    .isNumeric(),
    check('size')
    .exists()
    .isString(),
    check('amount')
    .exists()
    .notEmpty()
    .isNumeric(),
    check('status')
    .exists()
    .notEmpty()
    .isBoolean(),
    check('iva')
    .exists()
    .notEmpty()
    .isNumeric(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)

    }
]
const getCommodityValidations = [
    param('commodity_id')
    .exists()
    .notEmpty()
    .isString(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)
    }
]
const getCoommoditysValidations = [
    query('size')
    .exists()
    .isString(),
    query('status')
    .exists()
    .isString(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)
        
    }
]
const updateCommodityValidations = [
    
    param('commodity_id')
    .exists()
    .notEmpty()
    .isString(),
    check('category')
    .exists()
    .notEmpty()
    .isNumeric(),
    check('name')
    .exists()
    .notEmpty()
    .isString(),
    check('agent_id')
    .exists()
    .notEmpty()
    .isString(),
    check('price')
    .exists()
    .notEmpty()
    .isNumeric(),
    check('size')
    .exists()
    .notEmpty()
    .isString(),
    check('amount')
    .exists()
    .notEmpty()
    .isNumeric(),
    check('status')
    .exists()
    .notEmpty()
    .isBoolean(),
    check('iva')
    .exists()
    .notEmpty()
    .isNumeric(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)

    }
]
const deleteCommodityValidations = [
    param('commodity_id')
    .exists()
    .notEmpty()
    .isString(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)
    }
]



export {createCommodityValidations,getCommodityValidations,
    getCoommoditysValidations,
    updateCommodityValidations,
    deleteCommodityValidations};