import { Router } from "express";
import {createAccountReceivableDepositValidations, getAccountReceivableDepositsValidations, getAccountReceivablePaymentsValidations, getAccountReceivableProductsValidations, getAccountsReceivablePaymentsValidations } from "../validators/accounts-receivable";
import { postDepositAccountReceivable, getAccountReceivableProducts, getAccountsReceivable, getAccountsReceivablePayments, getAccountsReceivableDeposits } from "../controllers/accounts-receivable";
const router = Router();
import { checkJWT } from "../shared/checkJWT"

/*
    EXAMPPLE-MIDDELWARE
    router.get("/" , checkJWT ,getExpedientes);
*/

router.get("/products/:account_id",checkJWT,getAccountReceivableProductsValidations,getAccountReceivableProducts);
router.get("/payments/:account_id",checkJWT,getAccountReceivablePaymentsValidations,getAccountsReceivablePayments);
router.get("/payments",checkJWT,getAccountReceivableDepositsValidations,getAccountsReceivableDeposits);

router.post("/",checkJWT,createAccountReceivableDepositValidations,postDepositAccountReceivable);
router.get("/",checkJWT,getAccountsReceivable);




export {router};