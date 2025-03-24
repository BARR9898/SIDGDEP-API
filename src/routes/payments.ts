import { Router } from "express";
import { createAgentsValidations, deleteAgentValidations, getAgentValidations, getAgentsValidations, updateAgentValidations } from "../validators/agents";
import { getAgent, postAgent, getAgents, putAgent, removeAgent } from "../controllers/agents"
import { getHistoryPaymentsValidations, getPaymentsValidations } from "../validators/payments";
import { getHistoryPayments, getPayments } from "../controllers/payments";
const router = Router();
import { checkJWT } from "../shared/checkJWT"

/*
    EXAMPPLE-MIDDELWARE
    router.get("/" , checkJWT ,getExpedientes);
*/


router.get("/history/:mensuality_id",checkJWT,getHistoryPaymentsValidations,getHistoryPayments);
router.get("/",checkJWT,getPaymentsValidations,getPayments);




export {router};