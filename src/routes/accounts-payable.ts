import { Router } from "express";
import { createAccountPayablePaymentValidations, createAccountPayableValidations, getAccountPayablePaymentsValidations, getAccountPayableValidations, getAccountsPayableValidations } from "../validators/accounts-payable";
import { createAccountsPayable, createAccountsPayablePayment, getAccountPayable, getAccountPayablePayments, getAccountsPayable } from "../controllers/accounts-payable";
import { checkJWT } from "../shared/checkJWT"
const router = Router();

/*
    EXAMPPLE-MIDDELWARE
    router.get("/" , checkJWT ,getExpedientes);
*/

router.get("/",checkJWT,getAccountsPayableValidations,getAccountsPayable);
router.post("/",checkJWT,createAccountPayableValidations,createAccountsPayable);
router.get("/:account_id/payments",checkJWT,getAccountPayablePaymentsValidations,getAccountPayablePayments);
router.post("/pay/:account_id",checkJWT,createAccountPayablePaymentValidations,createAccountsPayablePayment);
router.get("/:account_id",checkJWT,getAccountPayableValidations,getAccountPayable);




export {router};