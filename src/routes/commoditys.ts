import { Router } from "express";
import { createCommodityValidations, deleteCommodityValidations, getCommodityValidations, getCoommoditysValidations, updateCommodityValidations } from "../validators/commoditys";
import { getCommodity, getCommoditys, postCommodity, putCommodity, removeCommodity } from "../controllers/commoditys";
const router = Router();
import { checkJWT } from "../shared/checkJWT"

/*
    EXAMPPLE-MIDDELWARE
    router.get("/" , checkJWT ,getExpedientes);
*/

router.post("/",checkJWT,createCommodityValidations,postCommodity);
router.put("/:commodity_id",checkJWT,updateCommodityValidations,putCommodity);
router.get("/",checkJWT,getCoommoditysValidations,getCommoditys);
router.get("/:commodity_id",checkJWT,getCommodityValidations,getCommodity);
router.delete("/:commodity_id",checkJWT,deleteCommodityValidations,removeCommodity);







export {router};