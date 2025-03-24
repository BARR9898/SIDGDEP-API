import { Request,Response, query, response } from "express"
import { Res as ResponseInterface } from "../interfaces/response/response";
import { handleHttp } from "../middelwares/error.handle";
import { InscriptionsFilters,InscriptionsFiltersClass } from "../interfaces/inscriptions/inscriptions.filters";
import {deleteInscription, insertInscriptions, selectCategoriesAssigned, selectInscriptions, updateCategory, updatePayedInscription } from "../services/inscriptions";
import { param } from "express-validator";


const getInscriptions = async ({query} : Request,res:Response) => {
    try {
        let newInscriptionsFiltersClass = new InscriptionsFiltersClass()
        let filters:InscriptionsFilters = newInscriptionsFiltersClass.createFilters(query)
        const responseItem:ResponseInterface = await selectInscriptions(filters);
        res.status(responseItem.code!)
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the inscriptions')
    }
}

const postInscription = async ({body,query} : Request,res:Response) => {
    
    try {
        const responseItem:ResponseInterface = await insertInscriptions(body);
        res.status(responseItem.code!)
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to post the inscription')
    }
}

const getCategoriesAssigned = async ({params} : Request,res:Response) => {
    
    try {        
        const {inscription_id} = params
        const responseItem:ResponseInterface = await selectCategoriesAssigned(inscription_id);
        res.status(responseItem.code!)
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the categories assigned to the inscription')
    }
}

const putCategory = async ({body,params} : Request,res:Response) => {
    
    try {        
        const {category_id} =  params
        const responseItem:ResponseInterface = await updateCategory(body,category_id);
        res.status(responseItem.code!)
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to put the category')
    }
}

const removeInscription = async ({params} : Request,res:Response) => {
    
    try {
        
        const {inscription_id} =  params
        const responseItem:ResponseInterface = await deleteInscription(inscription_id);
        res.status(responseItem.code!)
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to remove the inscription')
    }
}

const postNewInscriptionDeposit = async ({body,params} : Request,res:Response) => {
    
    try {
        const {inscription_id} = params
        const {payed,payed_status} = body
        const responseItem:ResponseInterface = await updatePayedInscription(inscription_id,payed,payed_status);
        res.status(responseItem.code!)
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to post the inscription deposit')
    }
}







export {
    getInscriptions,
    postInscription,
    putCategory,
    removeInscription,
    getCategoriesAssigned,
    postNewInscriptionDeposit

}