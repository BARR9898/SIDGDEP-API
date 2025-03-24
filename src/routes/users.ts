import { Router } from "express";
import {  createUserValidations, deleteUserValidations, getUserValidations, getUsersValidatons, updateUserValidations } from "../validators/users";
import { getUser, getUsers, postUser, putUser, removeUser } from "../controllers/users";

const router = Router();
import { checkJWT } from "../shared/checkJWT"

/*
    EXAMPPLE-MIDDELWARE
    router.get("/" , checkJWT ,getExpedientes);
*/


router.put("/:id",checkJWT,updateUserValidations,putUser);
router.get("/",checkJWT,getUsersValidatons,getUsers);
router.get("/:id",checkJWT,getUserValidations,getUser);
router.post("/",checkJWT,createUserValidations,postUser);
router.delete("/:id",checkJWT,deleteUserValidations,removeUser);




export {router};