import { Router } from "express";
const router = Router();
import { checkJWT } from "../shared/checkJWT"
import { createEventValidations,deleteEventValidations,updateEventValidations,getEventsValidations,postEventPaymentValidations,getEventsPaymentsValidations, deleteEventPayementValidations } from "../validators/events.validators";
import { postEvent,getEvent,getEvents,removeEvent,putEvent,postEventPayment,getEventsPayments, removeEventPayment } from "../controllers/events.controller";

//Events payment routes
router.post("/:event_id/payment",checkJWT,postEventPaymentValidations,postEventPayment);
router.get("/payments",checkJWT,getEventsPaymentsValidations,getEventsPayments);
router.delete("/payments/:payment_id",checkJWT,deleteEventPayementValidations,removeEventPayment);

//Events routes
router.delete("/:event_id",checkJWT,deleteEventValidations,removeEvent);
router.post("/",checkJWT,createEventValidations,postEvent);
router.get("/",checkJWT,getEventsValidations,getEvents);
router.post("/",checkJWT,createEventValidations,postEvent);




export {router};