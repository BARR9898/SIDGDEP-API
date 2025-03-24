import { Request,response,Response } from "express";
import { loginService,sendEmailAuth,setPasswordService,verifyUserService } from "../services/auth";

const loginController = async ({body}: Request,res:Response) => {
    const {email,password} = body;
    const responseItem = await loginService({email,password});
    res.send(responseItem)
}

const verifyUser = async ({body}: Request,res:Response) => {
    const {email} = body;
    const responseItem = await verifyUserService(email);
    res.send(responseItem)
}

const restorePassword = async ({body,params}: Request,res:Response) => {
    const {password} = body;
    const {user_id} = params;
    const responseItem = await setPasswordService(password,user_id);
    res.send(responseItem)
}

const postEmailAuth = async ({body}: Request,res:Response) => {
    const {email} = body;
    const responseItem = await sendEmailAuth(email);
    res.status(responseItem.code!)
    res.send(responseItem)
}






export {loginController,verifyUser,restorePassword,postEmailAuth}