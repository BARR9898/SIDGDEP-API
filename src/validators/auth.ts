import { NextFunction, Request,Response } from "express";
import {check,param,query} from 'express-validator';
import { handleValidatons } from "../middelwares/validaitons.handle";
import { verify } from "crypto";

const loginValidations = [
    check('email')
    .exists()
    .notEmpty()
    .isString(),
    check('password')
    .exists()
    .notEmpty()
    .isString(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)
    }
]

const registerValidations = [
    check('email')
    .exists()
    .notEmpty()
    .isString(),
    check('password')
    .exists()
    .notEmpty()
    .isString(),
    check('name')
    .exists()
    .notEmpty()
    .isString(),
    check('lastname')
    .exists()
    .notEmpty()
    .isString(),
    check('second_lastname')
    .exists()
    .notEmpty()
    .isString(),
    check('rol')
    .exists()
    .notEmpty()
    .isString(),
    check('status')
    .exists()
    .notEmpty()
    .isString(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)
    }
]

const verifyUserValidations = [
    check('email')
    .exists()
    .notEmpty()
    .isString(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)
    }
]

const restorePasswordValidations = [
    check('password')
    .exists()
    .notEmpty()
    .isString(),
    param('user_id')
    .exists()
    .notEmpty()
    .isString(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)
    }
]

const sendAuthEmailValidations = [
    check('email')
    .exists()
    .notEmpty()
    .isString(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)
    }
]

export {loginValidations,verifyUserValidations,restorePasswordValidations,sendAuthEmailValidations};