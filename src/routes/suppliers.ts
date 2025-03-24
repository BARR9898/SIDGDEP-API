import { Router } from "express";
import { createSupplierValidation, deleteSupplierValidations, getSuppliersValidations, updateSupplierValidations } from "../validators/supplier";
import { getSuppliers, postSupplier, putSupplier, removeSupplier } from "../controllers/suppliers";
import { verifyToken}  from "../utils/jwt.handle"
const router = Router();
import { checkJWT } from "../shared/checkJWT"

/*
    EXAMPPLE-MIDDELWARE
    router.get("/" , checkJWT ,getExpedientes);
*/


router.post("/",checkJWT,createSupplierValidation,postSupplier);
router.get("/",checkJWT,getSuppliersValidations,getSuppliers);
router.delete("/:id_supplier",checkJWT,deleteSupplierValidations,removeSupplier);
router.put("/:id_supplier",checkJWT,updateSupplierValidations,putSupplier);
export {router}