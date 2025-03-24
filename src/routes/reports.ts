import { Router } from "express";
import { createAgentsValidations, deleteAgentValidations, getAgentValidations, getAgentsValidations, updateAgentValidations } from "../validators/agents";
import { getAgent, postAgent, getAgents, putAgent, removeAgent } from "../controllers/agents"
import { generateMensualytiesReport } from "../controllers/reports";
import { generateReportMensualytiesValidations } from "../validators/reports";
const router = Router();
import { checkJWT } from "../shared/checkJWT"

/*
    EXAMPPLE-MIDDELWARE
    router.get("/" , checkJWT ,getExpedientes);
*/


router.get("/mensualyties",checkJWT,generateReportMensualytiesValidations,generateMensualytiesReport);
router.get("/",checkJWT,getAgentsValidations,getAgents);
router.get("/:id",checkJWT,getAgentValidations,getAgent);
router.post("/",checkJWT,createAgentsValidations,postAgent);
router.delete("/:id",checkJWT,deleteAgentValidations,removeAgent);




export {router};