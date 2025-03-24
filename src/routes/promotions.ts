import { Router } from "express";
import { createAgentsValidations, deleteAgentValidations, getAgentValidations, getAgentsValidations, updateAgentValidations } from "../validators/agents";
import { getAgent, postAgent, getAgents, putAgent, removeAgent } from "../controllers/agents"
import { createPromotionValidations, deletePromotionValidation, getPromotionValidations, getPromotionsValidations, updatePromotions } from "../validators/promotions";
import { getPromotion, getPromotions, postPromotion, putPromotion, removePromotion } from "../controllers/promotions";
const router = Router();
import { checkJWT } from "../shared/checkJWT"

/*
    EXAMPPLE-MIDDELWARE
    router.get("/" , checkJWT ,getExpedientes);
*/


router.put("/:id",checkJWT,updatePromotions,putPromotion);
router.get("/",checkJWT,getPromotionsValidations,getPromotions);
router.get("/:id",checkJWT,getPromotionValidations,getPromotion);
router.post("/",checkJWT,createPromotionValidations,postPromotion);
router.delete("/:id",checkJWT,deletePromotionValidation,removePromotion);




export {router};