import { Request,Response, query, response } from "express"
import { Res as ResponseInterface } from "../interfaces/response/response";
import { handleHttp } from "../middelwares/error.handle";
import { InscriptionsFilters,InscriptionsFiltersClass } from "../interfaces/inscriptions/inscriptions.filters";
import {deletInscriptionDeposit, updatePayedInscription,selectInscriptionDeposits } from "../services/inscriptions-deposits";
import { param } from "express-validator";
import { InscriptionsDepositsFilters,InscriptionsDepositsFiltersFiltersClass } from "../interfaces/inscriptions-deposits/inscriptions-deposits.filters.interface";


const getInscriptionsDeposits = async ({query} : Request,res:Response) => {
    try {
        let newInscriptionsFiltersClass = new InscriptionsDepositsFiltersFiltersClass()
        let filters:InscriptionsDepositsFilters = newInscriptionsFiltersClass.createFilters(query)
        const responseItem:ResponseInterface = await selectInscriptionDeposits(filters);
        res.status(responseItem.code!)
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the inscriptions')
    }
}

const removeInscriptionDeposit = async ({params} : Request,res:Response) => {
    try {
        const {deposit_id} = params
        const responseItem:ResponseInterface = await deletInscriptionDeposit(deposit_id);
        res.status(responseItem.code!)
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to remove the inscriptions')
    }
}

const postNewInscriptionDeposit = async ({body,params} : Request,res:Response) => {
    
    try {
        const {inscription_id} = params
        const responseItem:ResponseInterface = await updatePayedInscription(inscription_id,body);
        res.status(responseItem.code!)
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to post the inscription deposit')
    }
}







export {
    getInscriptionsDeposits,
    removeInscriptionDeposit,
    postNewInscriptionDeposit

}