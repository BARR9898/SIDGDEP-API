import { NextFunction, Request,Response } from "express";
import {check,param,query} from 'express-validator';
import { handleValidatons } from "../middelwares/validaitons.handle";

const saveNotificationValidations = [
    check('message')
    .exists()
    .notEmpty()
    .isString(),
    check('date_of_issue')
    .exists()
    .notEmpty()
    .isString(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)

    }
]

const getNotificationsValidations = [
    check('message')
    .exists()
    .notEmpty()
    .isString(),
    check('date_of_issue')
    .exists()
    .notEmpty()
    .isString(),
    (req:Request,res:Response,next:NextFunction) => {
        handleValidatons(req,res,next)

    }
]





export {saveNotificationValidations};