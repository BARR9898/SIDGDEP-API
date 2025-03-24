import { Request,Response, query } from "express"
import { deleteAgent, insertAgent, selectAgent, selectAgents, updateAgent } from "../services/agents";
import { Res as ResponseInterface } from "../interfaces/response/response";
import { handleHttp } from "../middelwares/error.handle";
import { UserFilters,UserFiltersClass } from "../interfaces/users/users.filters";
import { deleteUser, insertUser, selectUser, selectUsers, updateUser } from "../services/users";
import { deleteService, insertService, selectService, selectServices, updateService } from "../services/services";
import { ServiceFilters,ServicesFiltersClass } from "../interfaces/service/services.filters";
import { PromotionsFiltersInterface,PromotionsFiltersClass } from "../interfaces/promotions/promotions.filters.interface";
import { deletePromotion, insertPromotion, selectPromotion, selectPromotions, updatePromotion } from "../services/promotions";
const postPromotion = async ({body} : Request,res:Response) => {
    try {
        const responseItem:ResponseInterface = await insertPromotion(body);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to create the promotion')
    }
}

const getPromotion = async ({params} : Request,res:Response) => {
    try {
        const {id} = params
        const responseItem:ResponseInterface = await selectPromotion(id);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the promotion')
    }
}

const getPromotions = async ({body,query} : Request,res:Response) => {
    
    try {
        let newPromotionFiltersClassInstance = new PromotionsFiltersClass()
        let filters:PromotionsFiltersInterface = newPromotionFiltersClassInstance.createFilters(query)
        const responseItem:ResponseInterface = await selectPromotions(filters);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the promotions')
    }
}

const putPromotion = async ({body,params} : Request,res:Response) => {
    try {
        const {id} = params
        const responseItem:ResponseInterface = await updatePromotion(body,id);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to update the service')
    }
}

const removePromotion = async ({params} : Request,res:Response) => {
    try {
        const {id} = params
        const responseItem:ResponseInterface = await deletePromotion(id);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to delete the service')
    }
}





export {postPromotion,getPromotion,getPromotions,putPromotion,removePromotion}