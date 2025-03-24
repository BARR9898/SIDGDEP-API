import { Request,Response, query } from "express"
import { Res as ResponseInterface } from "../interfaces/response/response";
import { handleHttp } from "../middelwares/error.handle";
import {  deleteCommoditySale, insertSaleCommodity, selectComoditySaleProducts, selectCommoditySaleDeposits, selectSalesCommoditys, selectCommoditySale} from "../services/commodity-sale";
import { CommoditySalesFiltersClass, CommoditySalesFiltersInterface } from "../interfaces/commoditys/commodity.sales.filters.interface";



const postSaleCommodity = async ({body} : Request,res:Response) => {
    try {
        const responseItem:ResponseInterface = await insertSaleCommodity(body);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to create the commodity sale')
    }
}

const removeCommoditySale = async ({params} : Request,res:Response) => {
    try {
        const {sale_id} = params
        const responseItem:ResponseInterface = await deleteCommoditySale(sale_id);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to delete the commodity sale')
    }
}

const getCommoditySales = async ({body,query,params} : Request,res:Response) => {
    
    try {
        

        let newCommoditySalesFiltersClassInstance = new CommoditySalesFiltersClass()
        let filters:CommoditySalesFiltersInterface = newCommoditySalesFiltersClassInstance.createFilters(query)

        
        const responseItem:ResponseInterface = await selectSalesCommoditys(filters);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the agent')
    }
}

const getCommoditySaleProducts = async ({params} : Request,res:Response) => {
    
    try {
        
        const {sale_id} = params
        const responseItem:ResponseInterface = await selectComoditySaleProducts(sale_id);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the commodity sale products')
    }
}

const getCommoditySaleDeposits = async ({params} : Request,res:Response) => {
    
    try {
        
        const {sale_id} = params
        const responseItem:ResponseInterface = await selectCommoditySaleDeposits(sale_id);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the commodity sale deposits')
    }
}

const getCommoditySale = async ({params} : Request,res:Response) => {
    
    try {
        
        const {sale_id} = params
        const responseItem:ResponseInterface = await selectCommoditySale(sale_id);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the commodity sale')
    }
}





export {
    postSaleCommodity,
    getCommoditySales,
    getCommoditySaleProducts,
    removeCommoditySale,
    getCommoditySaleDeposits,
    getCommoditySale
    
}