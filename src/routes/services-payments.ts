import { Router } from "express";
import { deleteServicePaymentValidations, getServicePaymentsValidations,payServiceValidations } from "../validators/services_payments";
import { getServicesPayments, postPaymentService, removeServicePyment} from "../controllers/services-payments";
const router = Router();
import { checkJWT } from "../shared/checkJWT"

/*
    EXAMPPLE-MIDDELWARE
    router.get("/" , checkJWT ,getExpedientes);
*/

router.get("/",checkJWT,getServicePaymentsValidations,getServicesPayments);
router.post("/:service_id",checkJWT,payServiceValidations,postPaymentService);
router.delete("/:payment_id",checkJWT,deleteServicePaymentValidations,removeServicePyment);




export {router};