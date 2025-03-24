import { NextFunction, Request,Response } from "express";
import {check,param,query} from 'express-validator';
import { handleValidatons } from "../middelwares/validaitons.handle";

const createUserValidations = [
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
    check('age')
    .exists()
    .notEmpty()
    .isString(),
    check('phone')
    .exists()
    .notEmpty()
    .isString(),
    check('sex')
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

const getUsersValidatons = [
    query('name')
    .exists()
    .isString(),
    query('lastname')
    .exists()
    .isString(),
    query('second_lastname')
    .exists()
    .isString(),
    query('status')
    .exists()
    .isString(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)
        
    }
]

const getUserValidations = [
    param('id')
    .exists()
    .notEmpty()
    .isString(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)
    }
]

const updateUserValidations = [
    
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
    check('age')
    .exists()
    .notEmpty()
    .isString(),
    check('registration_date')
    .exists()
    .notEmpty()
    .isString(),
    check('phone')
    .exists()
    .notEmpty()
    .isString(),
    check('sex')
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

const deleteUserValidations = [
    param('id')
    .exists()
    .notEmpty()
    .isString(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)
    }
]


export {createUserValidations,getUserValidations,getUsersValidatons,updateUserValidations,deleteUserValidations};