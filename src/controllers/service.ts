import { Request,Response, query } from "express"
import { deleteAgent, insertAgent, selectAgent, selectAgents, updateAgent } from "../services/agents";
import { Res as ResponseInterface } from "../interfaces/response/response";
import { handleHttp } from "../middelwares/error.handle";
import { UserFilters,UserFiltersClass } from "../interfaces/users/users.filters";
import { deleteUser, insertUser, selectUser, selectUsers, updateUser } from "../services/users";
import { deleteService, insertPaymentService, insertService, selectPaymentsServices, selectReportsServices, selectService, selectServices, updateService } from "../services/services";
import { ServiceFilters,ServicesFiltersClass } from "../interfaces/service/services.filters";
import { ServicesReportFiltersClass, ServicesReportFiltersInterface } from "../interfaces/reports/services.reports.filter.interface";
import { log } from "console";
import { ServicesPaymentsFiltersClass } from "../interfaces/service/services-payments.filters.interface";
const postService = async ({body} : Request,res:Response) => {
    try {
        const responseItem:ResponseInterface = await insertService(body);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to create the service')
    }
}

const getService = async ({params} : Request,res:Response) => {
    try {

        const {id} = params
        const responseItem:ResponseInterface = await selectService(id);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the servcie')
    }
}

const getServices = async ({body,query} : Request,res:Response) => {
    
    try {
        let newServiceFiltersInstance = new ServicesFiltersClass()
        let filters:ServiceFilters = newServiceFiltersInstance.createFilters(query)
        const responseItem:ResponseInterface = await selectServices(filters);
        res.status(responseItem.code!)
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the users')
    }
}

const getReportServices = async ({body,query} : Request,res:Response) => {
    
    try {        
        let newServiceFiltersReportsInstance = new ServicesReportFiltersClass()
        let filters:ServicesReportFiltersInterface = newServiceFiltersReportsInstance.createFilters(query)
        const responseItem:ResponseInterface = await selectReportsServices(filters);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the services report')
    }
}

const putService = async ({body,params} : Request,res:Response) => {
    try {
        const {id} = params
        const responseItem:ResponseInterface = await updateService(body,id);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to update the service')
    }
}

const removeService = async ({params} : Request,res:Response) => {
    try {
        const {id} = params
        const responseItem:ResponseInterface = await deleteService(id);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to delete the service')
    }
}

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



export {postService,
    getService,
    getServices,
    putService,
    removeService,
    getReportServices,
    postPaymentService,
    getServicesPayments
}