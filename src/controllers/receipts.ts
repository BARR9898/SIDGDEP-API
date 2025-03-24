import { Request,Response, query } from "express"
import { deleteAgent, insertAgent, selectAgent, selectAgents, updateAgent } from "../services/agents";
import { Res as ResponseInterface } from "../interfaces/response/response";
import { handleHttp } from "../middelwares/error.handle";
import { AgentsFilters,Agents } from "../interfaces/agents/agents.filters";
import { sendMonthlyPaymentReceipt } from "../services/receipts";

const sendMonthlyPaymentReceiptController = async ({params} : Request,res:Response) => {
    try {
        const {mensuality_id} = params
        const responseItem:ResponseInterface = await sendMonthlyPaymentReceipt(mensuality_id);
            res.status(responseItem.code!);
            res.send(responseItem); 

    } catch (error) {
        console.log('sendMonthlyPaymentReceiptController controller error',error);
        
        handleHttp(res,'An error ocurred trying to get the mensuality receipt')
    }
}






export {sendMonthlyPaymentReceiptController}