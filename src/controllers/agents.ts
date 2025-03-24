import { Request,Response, query } from "express"
import { deleteAgent, insertAgent, selectAgent, selectAgents, updateAgent } from "../services/agents";
import { Res as ResponseInterface } from "../interfaces/response/response";
import { handleHttp } from "../middelwares/error.handle";
import { AgentsFilters,Agents } from "../interfaces/agents/agents.filters";

const postAgent = async ({body} : Request,res:Response) => {
    try {
        const responseItem:ResponseInterface = await insertAgent(body);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to create the agent')
    }
}

const getAgent = async ({params} : Request,res:Response) => {
    try {
        const {id} = params
        const responseItem:ResponseInterface = await selectAgent(id);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the agent')
    }
}

const getAgents = async ({body,query} : Request,res:Response) => {
    
    try {
        let newAgentInstance = new Agents()
        let filters:AgentsFilters = newAgentInstance.createFilters(query)
        const responseItem:ResponseInterface = await selectAgents(filters);
        res.status(responseItem.code!)
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the agent')
    }
}

const putAgent = async ({body,params} : Request,res:Response) => {
    try {
        const {id} = params
        const responseItem:ResponseInterface = await updateAgent(body,id);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to update the agent')
    }
}

const removeAgent = async ({params} : Request,res:Response) => {
    try {
        const {id} = params
        const responseItem:ResponseInterface = await deleteAgent(id);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to update the agent')
    }
}





export {postAgent,getAgent,getAgents,putAgent,removeAgent}