import { NextFunction, Request,Response } from "express";
import {check,param,query} from 'express-validator';
import { handleValidatons } from "../middelwares/validaitons.handle";

const createAgentsValidations = [
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
    check('password')
    .exists()
    .notEmpty()
    .isString(),
    check('email')
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
    .isBoolean(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)

    }
]
const getAgentValidations = [
    param('id')
    .exists()
    .notEmpty()
    .isString(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)
    }
]
const getAgentsValidations = [
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
const updateAgentValidations = [
    
    param('id')
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
    check('email')
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
const deleteAgentValidations = [
    param('id')
    .exists()
    .notEmpty()
    .isString(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)
    }
]


export {createAgentsValidations,getAgentValidations,getAgentsValidations,updateAgentValidations,deleteAgentValidations};