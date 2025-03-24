import { Router } from "express";
import { deleteCommoditySaleValidations, getCommoditySaleDepositsValidations, getCommoditySaleProductsValidations, getCommoditySaleValidations, getCommoditySalesValidators, newCommoditySaleValidations } from "../validators/commodity-sales";
import {  postSaleCommodity,getCommoditySales, getCommoditySaleProducts, removeCommoditySale, getCommoditySaleDeposits, getCommoditySale } from "../controllers/commodity-sale";
const router = Router();
import { checkJWT } from "../shared/checkJWT"

/*
    EXAMPPLE-MIDDELWARE
    router.get("/" , checkJWT ,getExpedientes);
*/

router.delete("/:sale_id",checkJWT,deleteCommoditySaleValidations,removeCommoditySale);
router.get("/:sale_id/deposits",checkJWT,getCommoditySaleDepositsValidations,getCommoditySaleDeposits);
router.post("/",checkJWT,newCommoditySaleValidations,postSaleCommodity);
router.get("/",checkJWT,getCommoditySalesValidators,getCommoditySales);
router.get("/:sale_id/products",checkJWT,getCommoditySaleProductsValidations,getCommoditySaleProducts);
router.get("/:sale_id",checkJWT,getCommoditySaleValidations,getCommoditySale);






export {router};