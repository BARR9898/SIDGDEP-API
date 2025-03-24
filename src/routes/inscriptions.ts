import { Router } from "express";
import {   createInscriptionValidations, deleteInscriptionValidations, getCateogiresAssignedValidations, getInscriptionsValidations, newDepositInscriptionValidations, updateCategoryValidations } from "../validators/inscriptions";
import {  getCategoriesAssigned, getInscriptions, postInscription, postNewInscriptionDeposit, putCategory, removeInscription } from "../controllers/inscriptions";
const router = Router();
import { checkJWT } from "../shared/checkJWT"

/*
    EXAMPPLE-MIDDELWARE
    router.get("/" , checkJWT ,getExpedientes);
*/

router.get("/:inscription_id/categories",checkJWT,getCateogiresAssignedValidations,getCategoriesAssigned);
router.post("/",checkJWT,createInscriptionValidations,postInscription);
router.get("/",checkJWT,getInscriptionsValidations,getInscriptions);
router.delete("/:inscription_id",checkJWT,deleteInscriptionValidations,removeInscription);
router.put("/:inscription_id/deposit",checkJWT,newDepositInscriptionValidations,postNewInscriptionDeposit);

/*
router.put("/:category_id",updateCategoryValidations,putCategory);
router.delete("/:category_id",deleteCategoryValidations,removeInscription);
*/



export {router};