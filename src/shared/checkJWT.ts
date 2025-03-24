import { NextFunction,Response,Request } from "express"
import { JwtPayload } from "jsonwebtoken";
import { log } from "console";
import { verifyToken } from "../utils/jwt.handle";

interface RequestExtend extends Request{
    user?: string | JwtPayload
}

const checkJWT = (req:RequestExtend,res:Response,next:NextFunction) => {

    try {
        
            const jwtUser = req.headers.authorization || 'null';
            const jwt = jwtUser.split(' ').pop();
            const isUser = verifyToken(`${jwt}`);

            

            
            if (!isUser) {
                res.status(401);
                res.send("INVLAID_TOKEN")
                
            }else{

                req.user = isUser;
                next();
            }


        
    } catch (e) {
        console.log(e);
        
        res.status(400);
        res.send("INVALID_SESSION")
    }
}

export {checkJWT}

