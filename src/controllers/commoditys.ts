import { Request,Response, query } from "express"
import { Res as ResponseInterface } from "../interfaces/response/response";
import { handleHttp } from "../middelwares/error.handle";
import { deleteCommodity, insertCommodity, selectCommodity, selectCommoditys,updateCommodity } from "../services/commoditys";
import { CommodityFilters, CommodityFiltersInterface } from "../interfaces/commoditys/commodity.filters.interface";

const postCommodity = async ({body} : Request,res:Response) => {
    try {
        const {agent_id} = body
        const responseItem:ResponseInterface = await insertCommodity(body);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to create the commodity')
    }
}

const getCommodity = async ({params} : Request,res:Response) => {
    try {
        const {commodity_id} = params
        const responseItem:ResponseInterface = await selectCommodity(commodity_id);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the commodity')
    }
}

const getCommoditys = async ({body,query,params} : Request,res:Response) => {
    
    try {
        
 
        
        let newCommodityInstance = new CommodityFilters()
        let filters:CommodityFiltersInterface = newCommodityInstance.createFilters(query)

        
        const responseItem:ResponseInterface = await selectCommoditys(filters);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the agent')
    }
}

const putCommodity = async ({body,params} : Request,res:Response) => {
    try {
        const {commodity_id} = params
        const responseItem:ResponseInterface = await updateCommodity(body,commodity_id);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to update the commodity')
    }
}

const removeCommodity = async ({params} : Request,res:Response) => {
    try {
        const {commodity_id} = params
        const responseItem:ResponseInterface = await deleteCommodity(commodity_id);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to delete the commodity')
    }
}





export {postCommodity,
    getCommodity,
    getCommoditys,
    putCommodity,
    removeCommodity
}