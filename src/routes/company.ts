import { Router } from "express";
import { createCompanyValidations } from "../validators/company";
import { getCompanyData, putCompanyData } from "../controllers/company"
const router = Router();
import { checkJWT } from "../shared/checkJWT"

/*
    EXAMPPLE-MIDDELWARE
    router.get("/" , checkJWT ,getExpedientes);
*/


router.post("/",checkJWT,createCompanyValidations,putCompanyData);
router.get("/",checkJWT,getCompanyData);



export {router};