import { NextFunction, Request,Response } from "express";
import {check,param,query} from 'express-validator';
import { handleValidatons } from "../middelwares/validaitons.handle";

const createPromotionValidations = [
    check('name')
    .exists()
    .notEmpty()
    .isString(),
    check('discount')
    .exists()
    .notEmpty()
    .isNumeric(),
    check('discount_percent')
    .exists()
    .notEmpty()
    .isNumeric(),
    check('description')
    .exists()
    .notEmpty()
    .isString(),
    check('status')
    .exists()
    .notEmpty()
    .isBoolean(),
    check('creation_date')
    .exists()
    .notEmpty()
    .isString(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)

    }
]
const getPromotionValidations = [
    param('id')
    .exists()
    .notEmpty()
    .isString(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)
    }
]
const getPromotionsValidations = [
    query('name')
    .exists()
    .isString(),
    query('status')
    .exists()
    .isString(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)
        
    }
]
const updatePromotions = [
    
    param('id')
    .exists()
    .notEmpty()
    .isString(),
    check('name')
    .exists()
    .notEmpty()
    .isString(),
    check('discount')
    .exists()
    .notEmpty()
    .isNumeric(),
    check('discount_percent')
    .exists()
    .notEmpty()
    .isNumeric(),
    check('description')
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
const deletePromotionValidation = [
    param('id')
    .exists()
    .notEmpty()
    .isString(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)
    }
]


export {createPromotionValidations,getPromotionValidations,getPromotionsValidations,updatePromotions,deletePromotionValidation};