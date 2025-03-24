import { Request,Response, query } from "express"
import { Res as ResponseInterface } from "../interfaces/response/response";
import { handleHttp } from "../middelwares/error.handle";
import { deletePaymentService, insertPaymentService, selectPaymentsServices } from "../services/services-payments";
import { ServicesPaymentsFiltersClass } from "../interfaces/service/services-payments.filters.interface";


const postPaymentService = async ({body,params} : Request,res:Response) => {
    try {
        const {service_id} = params
        const {agent_id} = body
    
        const responseItem:ResponseInterface = await insertPaymentService(body,service_id,agent_id);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to create the service')
    }
}

const getServicesPayments = async ({query} : Request,res:Response) => {
    try {
        const servicesPaymentsFiltersClass = new ServicesPaymentsFiltersClass()   
        const filters = servicesPaymentsFiltersClass.createFilters(query)     
        const responseItem:ResponseInterface = await selectPaymentsServices(filters);
        res.status(responseItem.code!)
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the payments services')
    }
}

const removeServicePyment = async ({params} : Request,res:Response) => {
    try {
        const {payment_id} = params
        const responseItem:ResponseInterface = await deletePaymentService(payment_id);
        res.status(responseItem.code!)
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to delete the payments services')
    }
}




export {
    getServicesPayments,
    postPaymentService,
    removeServicePyment
}