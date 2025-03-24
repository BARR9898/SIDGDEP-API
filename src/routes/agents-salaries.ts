import { Router } from "express";
import { deleteAgentSalaryPaymentValidations, getAgentsSalariesValidations } from "../validators/agent-salaries";
import { getAgentsSalariesPayments, postAgentsSalaryPayment, removeAgentSalariePayment } from "../controllers/agent-salaries"
const router = Router();
import { checkJWT } from "../shared/checkJWT"

/*
    EXAMPPLE-MIDDELWARE
    router.get("/" , checkJWT ,getExpedientes);
*/


router.delete("/:id",checkJWT,deleteAgentSalaryPaymentValidations,removeAgentSalariePayment);
router.get("/",checkJWT,getAgentsSalariesValidations,getAgentsSalariesPayments);
router.post("/",checkJWT,postAgentsSalaryPayment,postAgentsSalaryPayment);



export {router};