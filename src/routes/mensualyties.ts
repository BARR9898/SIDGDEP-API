import { Router } from "express";
import {  createUserValidations, deleteUserValidations, getUserValidations, getUsersValidatons, updateUserValidations } from "../validators/users";
import { getUser, getUsers, postUser, putUser, removeUser } from "../controllers/users";
import { deleteMonthlyCategoriesValidations, getMensualityesValidations, getMnesualityValidaitons, getMonthlyCategoriesValidations, getPendingPaymentsValidations, newDepositValidations, payMensualityValidations } from "../validators/mensualities";
import { getMensuality, getMensualityes, getMonthlyCategories, getPendingPayments, newDeposit, payMensuality, removeMensuality } from "../controllers/mensualities";
const router = Router();
import { checkJWT } from "../shared/checkJWT"

/*
    EXAMPPLE-MIDDELWARE
    router.get("/" , checkJWT ,getExpedientes);
*/

router.get("/",checkJWT,getMensualityesValidations,getMensualityes);
router.post("/pay",checkJWT,payMensualityValidations,payMensuality);
router.post("/deposit",checkJWT,newDepositValidations,newDeposit);
router.get("/pending-payments",checkJWT,getPendingPaymentsValidations,getPendingPayments);
router.get("/:mensuality_id/categories",getMonthlyCategoriesValidations,getMonthlyCategories);
router.get("/:mensuality_id",getMnesualityValidaitons,getMensuality);
router.delete("/:mensuality_id",deleteMonthlyCategoriesValidations,removeMensuality);



export {router};