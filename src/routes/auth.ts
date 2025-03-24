import { Router } from "express";
import { loginController, postEmailAuth, restorePassword, verifyUser } from "../controllers/auth";
import { restorePasswordValidations, sendAuthEmailValidations, verifyUserValidations } from "../validators/auth";
const router = Router();

/*
    EXAMPPLE-MIDDELWARE
    router.get("/" , checkJWT ,getExpedientes);
*/


router.post("/login",loginController);
router.post("/verify-user",verifyUserValidations,verifyUser);
router.post("/restore-password/:user_id",restorePasswordValidations,restorePassword);
router.post("/send-auth-email",sendAuthEmailValidations,postEmailAuth);





export {router};