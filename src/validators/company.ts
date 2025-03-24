import { NextFunction, Request,Response } from "express";
import {check,param,query} from 'express-validator';
import { handleValidatons } from "../middelwares/validaitons.handle";


const createCompanyValidations = [
    
    check('name')
    .exists()
    .notEmpty()
    .isString(),
    check('rfc')
    .exists()
    .notEmpty()
    .isString(),
    check('email')
    .exists()
    .notEmpty()
    .isString(),
    check('gmail_key')
    .exists()
    .notEmpty()
    .isString(),
    check('address')
    .exists()
    .notEmpty()
    .isString(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)

    }

]

export {createCompanyValidations};