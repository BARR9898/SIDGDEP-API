import { Request,Response, query } from "express"
import { deleteAgent, insertAgent, selectAgent, selectAgents, updateAgent } from "../services/agents";
import { Res as ResponseInterface } from "../interfaces/response/response";
import { handleHttp } from "../middelwares/error.handle";
import { UserFilters,UserFiltersClass } from "../interfaces/users/users.filters";
import { deleteUser, insertUser, selectUser, selectUsers, updateUser } from "../services/users";
import { deleteMensuality, insertNewDeposit, insertPayMensuality, selectMensuality, selectMensualityes, selectMonthlyCategories, selectPendingPayments } from "../services/mensualities";
import { MensualitiesFiltersClass,MensualitiesFilters } from "../interfaces/mensualities/mensualities.filters";
import { log } from "console";



const getPendingPayments = async ({body,query} : Request,res:Response) => {
    
    try {
        let newMensualitiesInstanceClass = new MensualitiesFiltersClass()
        let filters:MensualitiesFilters = newMensualitiesInstanceClass.createFilters(query)
        const responseItem:ResponseInterface = await selectPendingPayments(filters);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the pending payments')
    }
}

const payMensuality = async ({body,query} : Request,res:Response) => {
    
    try {
                
        const responseItem:ResponseInterface = await insertPayMensuality(body);
        res.status(responseItem.code!)
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the users')
    }
}

const newDeposit = async ({body,query} : Request,res:Response) => {
    
    try {
        const responseItem:ResponseInterface = await insertNewDeposit(body);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to register the new deposit')
    }
}

const getMensualityes = async ({body,query} : Request,res:Response) => {
    
    try {
        
        let newMensualitiesInstanceClass = new MensualitiesFiltersClass()
        let filters:MensualitiesFilters = newMensualitiesInstanceClass.createFilters(query)
        const responseItem:ResponseInterface = await selectMensualityes(filters);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the pending payments')
    }
}


const getMonthlyCategories = async ({params} : Request,res:Response) => {
    
    try {
        
        const {mensuality_id} = params
        const responseItem:ResponseInterface = await selectMonthlyCategories(mensuality_id);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the monthly categories')
    }
}

const getMensuality = async ({params} : Request,res:Response) => {
    
    try {
        const {mensuality_id} = params
        const responseItem:ResponseInterface = await selectMensuality(mensuality_id);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the mensuality')
    }
}

const removeMensuality = async ({params} : Request,res:Response) => {
    
    try {
        const {mensuality_id} = params
        const responseItem:ResponseInterface = await deleteMensuality(mensuality_id);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to remove the mensuality')
    }
}


export {getPendingPayments,payMensuality,newDeposit,getMensualityes,
    getMonthlyCategories,
    getMensuality,
    removeMensuality

}