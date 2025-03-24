import { Request,Response, query } from "express"
import { Res as ResponseInterface } from "../interfaces/response/response";
import { handleHttp } from "../middelwares/error.handle";
import { AgentsFilters,Agents } from "../interfaces/agents/agents.filters";
import { insertAgentSalaryPayment, selectAgentsSalariesPayments,deleteAgentSalaryPayment } from "../services/agent-salaries";
import { AgentsSalariesPaymentsFiltersClass } from "../interfaces/agents-salaries-payments/agents-salaries-payements.filters";


const removeAgentSalariePayment = async ({params} : Request,res:Response) => {
    try {
        const {id} = params
        const responseItem:ResponseInterface = await deleteAgentSalaryPayment(id);
        res.status(responseItem.code!)
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to delete the agent salary payment')
    }
}

const getAgentsSalariesPayments = async ({query} : Request,res:Response) => {
    try {
        const agentsSalariesPaymentsFilters = new AgentsSalariesPaymentsFiltersClass()
        const filters =  agentsSalariesPaymentsFilters.createFilters(query)
        const responseItem:ResponseInterface = await selectAgentsSalariesPayments(filters);
        res.status(responseItem.code!)
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the agents salaries payments')
    }
}

const postAgentsSalaryPayment = async ({body} : Request,res:Response) => {
    try {
        const responseItem:ResponseInterface = await insertAgentSalaryPayment(body);
        res.status(responseItem.code!)
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to create the agent salary payment')
    }
}






export {
    removeAgentSalariePayment,
    getAgentsSalariesPayments,
    postAgentsSalaryPayment
}