import { Router } from "express";
import {   createCategoryValidations, deleteCategoryValidations, getCategoriesValidators, getUserCategoriesInscriptionValidations, updateCategoryValidations } from "../validators/categories";
import {  getCategories, postCategory, putCategory, removeCategory , getUserCategoriesInscription } from "../controllers/categories";
const router = Router();
import { checkJWT } from "../shared/checkJWT"
/*
    EXAMPPLE-MIDDELWARE
    router.get("/" , checkJWT ,getExpedientes);
*/


router.get("/",checkJWT,getCategoriesValidators,getCategories);
router.post("/",checkJWT,createCategoryValidations,postCategory);
router.put("/:category_id",checkJWT,updateCategoryValidations,putCategory);
router.delete("/:category_id",checkJWT,deleteCategoryValidations,removeCategory);
router.get("/inscriptions/:user_id",checkJWT,getUserCategoriesInscriptionValidations,getUserCategoriesInscription);



export {router};