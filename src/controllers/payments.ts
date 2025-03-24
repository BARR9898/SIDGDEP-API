import { Request,Response, query } from "express"
import { deleteAgent, insertAgent, selectAgent, selectAgents, updateAgent } from "../services/agents";
import { Res as ResponseInterface } from "../interfaces/response/response";
import { handleHttp } from "../middelwares/error.handle";
import { AgentsFilters,Agents } from "../interfaces/agents/agents.filters";
import { selectHistoryPayments, selectPayments } from "../services/payments";
import { PaymentsFiltersClass,PaymentsFiltersInterface } from "../interfaces/payments/payments.filters.interface";
import { log } from "console";
import { FILE } from "dns";
const getHistoryPayments = async ({params} : Request,res:Response) => {
    try {
        const {mensuality_id} = params
        const responseItem:ResponseInterface = await selectHistoryPayments(mensuality_id);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the hisotry of mensuality´s payments')
    }
}

const getPayments = async ({query} : Request,res:Response) => {
    try {

        const newInstancePaymentsFiltersInterface = new PaymentsFiltersClass() 
        let filters:PaymentsFiltersInterface = newInstancePaymentsFiltersInterface.createFilters(query)
        
        const responseItem:ResponseInterface = await selectPayments(filters);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the payments')
    }
}






export {getHistoryPayments,getPayments}