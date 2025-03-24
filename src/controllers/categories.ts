import { Request,Response, query } from "express"
import { Res as ResponseInterface } from "../interfaces/response/response";
import { handleHttp } from "../middelwares/error.handle";
import { CategoriesFilters,CategoriesFiltersClass } from "../interfaces/categories/categories.filters";
import { deleteCategory, insertCategory, selectCategories, selectUserCaegoriesInscription, updateCategory } from "../services/categories";
import { param } from "express-validator";


const getCategories = async ({body,query} : Request,res:Response) => {
    
    try {
        let newCategoriesFiltersClass = new CategoriesFiltersClass()
        let filters:CategoriesFilters = newCategoriesFiltersClass.createFilters(query)
        const responseItem:ResponseInterface = await selectCategories(filters);
        res.status(responseItem.code!)
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the categories')
    }
}

const postCategory = async ({body,query} : Request,res:Response) => {
    
    try {
        const responseItem:ResponseInterface = await insertCategory(body);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to post the category')
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

const removeCategory = async ({body,params} : Request,res:Response) => {
    
    try {
        
        const {category_id} =  params
        const responseItem:ResponseInterface = await deleteCategory(category_id);
        res.status(responseItem.code!)
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to remove the category')
    }
}


//GET THE CAEGORIES IN THAT AN USER IS SUBCRIBE
const getUserCategoriesInscription = async ({body,params} : Request,res:Response) => {
    
    try {
        
        const {user_id} =  params
        const responseItem:ResponseInterface = await selectUserCaegoriesInscription(user_id);
        res.status(responseItem.code!)
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the user categories')
    }
}







export {
    getCategories,
    postCategory,
    putCategory,
    removeCategory,
    getUserCategoriesInscription

}