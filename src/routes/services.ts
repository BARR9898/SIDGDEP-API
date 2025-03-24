import { Router } from "express";
import {  createUserValidations, deleteUserValidations, getUserValidations, getUsersValidatons, updateUserValidations } from "../validators/users";
import { getUser, getUsers, postUser, putUser, removeUser } from "../controllers/users";
import { createServiceValidations, getServicePaymentsValidations, getServiceValidations, getServicesReportValidations, getServicesValidations, payServiceValidations, updateServiceValidations } from "../validators/services";
import { getReportServices, getService, getServices, getServicesPayments, postPaymentService, postService, putService, removeService } from "../controllers/service";
import { updateService } from "../services/services";
const router = Router();
import { checkJWT } from "../shared/checkJWT"

/*
    EXAMPPLE-MIDDELWARE
    router.get("/" , checkJWT ,getExpedientes);
*/

router.get("/payments",checkJWT,getServicePaymentsValidations,getServicesPayments);


router.get("/report_services",checkJWT,getServicesReportValidations,getReportServices);
router.put("/:id",checkJWT,updateServiceValidations,putService);
router.get("/",checkJWT,getServicesValidations,getServices);
router.get("/:id",checkJWT,getServiceValidations,getService);
router.post("/",checkJWT,createServiceValidations,postService);
router.delete("/:id",checkJWT,deleteUserValidations,removeService);
router.post("/pay/:service_id",checkJWT,payServiceValidations,postPaymentService);





export {router};