import { Router } from "express";
import { createAgentsValidations, deleteAgentValidations, getAgentValidations, getAgentsValidations, updateAgentValidations } from "../validators/agents";
import { getAgent, postAgent, getAgents, putAgent, removeAgent } from "../controllers/agents"
const router = Router();
import { checkJWT } from "../shared/checkJWT"
import { sendMonthlyPaymentReceipValidations } from "../validators/receipts";
import { sendMonthlyPaymentReceiptController } from "../controllers/receipts";

/*
    EXAMPPLE-MIDDELWARE
    router.get("/" , checkJWT ,getExpedientes);
*/


router.get("/mensuality/:mensuality_id",checkJWT,sendMonthlyPaymentReceipValidations,sendMonthlyPaymentReceiptController);





export {router};