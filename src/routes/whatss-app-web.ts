import { Router } from "express";
import { createAccountPayablePaymentValidations, createAccountPayableValidations, getAccountPayablePaymentsValidations, getAccountPayableValidations, getAccountsPayableValidations } from "../validators/accounts-payable";
import { createAccountsPayable, createAccountsPayablePayment, getAccountPayable, getAccountPayablePayments, getAccountsPayable } from "../controllers/accounts-payable";
import { checkJWT } from "../shared/checkJWT"
import { generateQR, getWhatssAppClientStatusController, sendMessage } from "../controllers/whatss-app-web";
const router = Router();

/*
    EXAMPPLE-MIDDELWARE
    router.get("/" , checkJWT ,getExpedientes);
*/

router.get("/generate-qr",checkJWT,generateQR);
router.post("/send-message",checkJWT,sendMessage);
router.get("/client-status",checkJWT,getWhatssAppClientStatusController);



export {router};