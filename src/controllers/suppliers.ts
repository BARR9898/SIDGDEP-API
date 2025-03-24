import { Request,Response, query } from "express"
import { Res as ResponseInterface } from "../interfaces/response/response";
import { handleHttp } from "../middelwares/error.handle";
import { deleteSupplier, insertSupplier, selectSuppliers, updateSupplier } from "../services/suppliers";
import { SuppliersFiltersClass, SuppliersFiltersInterface } from "../interfaces/suppliers/suppliers.filters.interface";

const postSupplier = async ({body} : Request,res:Response) => {
    try {
        const responseItem:ResponseInterface = await insertSupplier(body);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to create the supplier')
    }
}

const getSuppliers = async ({query} : Request,res:Response) => {

    try {
        const supplierFilterClass = new SuppliersFiltersClass()
        const filters:SuppliersFiltersInterface = supplierFilterClass.createFilters(query)
        const responseItem:ResponseInterface = await selectSuppliers(filters);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the suppliers')
    }
}


const removeSupplier = async ({params} : Request,res:Response) => {

    try {
        const {id_supplier} = params
        const responseItem:ResponseInterface = await deleteSupplier(id_supplier);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to delete the supplier')
    }
}

const putSupplier = async ({params,body} : Request,res:Response) => {

    try {
        const {id_supplier} = params
        const responseItem:ResponseInterface = await updateSupplier(id_supplier,body);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to update the supplier')
    }
}



export {postSupplier,getSuppliers,removeSupplier,putSupplier}