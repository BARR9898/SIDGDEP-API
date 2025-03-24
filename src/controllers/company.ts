import { Request,Response, query } from "express"
import { Res as ResponseInterface } from "../interfaces/response/response";
import { handleHttp } from "../middelwares/error.handle";
import { AgentsFilters,Agents } from "../interfaces/agents/agents.filters";
import { insertCompanyData, selectCompanyData } from "../services/company";

const putCompanyData = async ({body} : Request,res:Response) => {
    try {
        const responseItem:ResponseInterface = await insertCompanyData(body);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to insert the company data')
    }
}

const getCompanyData = async ({body} : Request,res:Response) => {
    try {
        const responseItem:ResponseInterface = await selectCompanyData();
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the company data')
    }
}






export {putCompanyData,getCompanyData}