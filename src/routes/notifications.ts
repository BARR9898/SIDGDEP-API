import { Router } from "express";
import { createAccountPayablePaymentValidations, createAccountPayableValidations, getAccountPayablePaymentsValidations, getAccountPayableValidations, getAccountsPayableValidations } from "../validators/accounts-payable";
import { createAccountsPayable, createAccountsPayablePayment, getAccountPayable, getAccountPayablePayments, getAccountsPayable } from "../controllers/accounts-payable";
import { checkJWT } from "../shared/checkJWT"
import { generateQR, sendMessage } from "../controllers/whatss-app-web";
import { saveNotificationValidations } from "../validators/notifications";
import { postNotification,getNotifications } from "../controllers/notifications";
const router = Router();

/*
    EXAMPPLE-MIDDELWARE
    router.get("/" , checkJWT ,getExpedientes);
*/

router.post("/",saveNotificationValidations,postNotification);
//router.get("/",sendMessage);


export {router};