import { Router } from "express";
import {   deleteDepositInscriptionValidators, getDepositsInscriptionsValidations, newDepositInscriptionValidations } from "../validators/inscriptions-deposits";
import {  getInscriptionsDeposits, postNewInscriptionDeposit, removeInscriptionDeposit } from "../controllers/inscriptions-deposits";
const router = Router();
import { checkJWT } from "../shared/checkJWT"

/*
    EXAMPPLE-MIDDELWARE
    router.get("/" , checkJWT ,getExpedientes);
*/

router.get("/",checkJWT,getDepositsInscriptionsValidations,getInscriptionsDeposits);
router.delete("/:deposit_id",checkJWT,deleteDepositInscriptionValidators,removeInscriptionDeposit);
router.put("/:inscription_id",checkJWT,newDepositInscriptionValidations,postNewInscriptionDeposit);

/*
router.put("/:category_id",updateCategoryValidations,putCategory);
router.delete("/:category_id",deleteCategoryValidations,removeInscription);
*/



export {router};