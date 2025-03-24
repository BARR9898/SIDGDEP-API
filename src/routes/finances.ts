import { Router } from "express";
import {getBussinesServicesPaymentsValidations, getCashFlowReportValidations, getEarningsGroupedByCategoriesValidations, getPayedMonthlyPaymentsValidations, getPendingMonthlyPaymentsValidations } from "../validators/finances";
import { getBussinesServicesPayments, getCashFlow, getCommodityPayments, getEarningsGroupedByCategories, getMonthlyPaymentsDeposits, getPayableAccountsDeposits, getPayedMonthlyPayments, getPendingMonthlyPayments } from "../controllers/finances";
const router = Router();
import { checkJWT } from "../shared/checkJWT"

/*
    EXAMPPLE-MIDDELWARE
    router.get("/" , checkJWT ,getExpedientes);
*/


router.get("/pendingMonthlyPayments",checkJWT,getPendingMonthlyPaymentsValidations,getPendingMonthlyPayments);
router.get("/payedMonthlyPayments",checkJWT,getPayedMonthlyPaymentsValidations,getPayedMonthlyPayments);
router.get("/bussinesServicesPayments",checkJWT,getBussinesServicesPaymentsValidations,getBussinesServicesPayments);
router.get("/getCommodityPayments",checkJWT,getCashFlowReportValidations,getCommodityPayments);
router.get("/getMonthlyPaymentsDeposits",checkJWT,getCashFlowReportValidations,getMonthlyPaymentsDeposits);
router.get("/getPayableAccountsDeposits",checkJWT,getCashFlowReportValidations,getPayableAccountsDeposits);
router.get("/cash-flow",checkJWT,getCashFlowReportValidations,getCashFlow);
router.get("/earnings-grouped-by-categories",checkJWT,getEarningsGroupedByCategoriesValidations,getEarningsGroupedByCategories);


export {router};