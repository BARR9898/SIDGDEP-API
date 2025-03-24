import { Request,Response } from "express"
import { Res as ResponseInterface } from "../interfaces/response/response";
import { handleHttp } from "../middelwares/error.handle";
import { FinancesFiltersClass, FinancesFiltersInterface } from "../interfaces/finances/finances.filters";
import { selectBussinesServicesPayments, selectCashFlow, selectCommodityPayments, selectEarningsGroupedByCategories, selectMonthlyPaymentsDeposits, selectPayedMonthlyPayments, selectPendingMonthlyPayments } from "../services/finances";


const getPendingMonthlyPayments = async ({query} : Request,res:Response) => {
    
    try {
        let financesFilterClassInstance = new FinancesFiltersClass()
        let filters:FinancesFiltersInterface = financesFilterClassInstance.createFilters(query)
        const responseItem:ResponseInterface = await selectPendingMonthlyPayments(filters);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the pending monthly payments to report')
    }
}

const getPayedMonthlyPayments = async ({query} : Request,res:Response) => {
    
    try {
        let financesFilterClassInstance = new FinancesFiltersClass()
        let filters:FinancesFiltersInterface = financesFilterClassInstance.createFilters(query)
        const responseItem:ResponseInterface = await selectPayedMonthlyPayments(filters);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the pending monthly payments to report')
    }
}


const getBussinesServicesPayments = async ({query} : Request,res:Response) => {
    
    try {
        let financesFilterClassInstance = new FinancesFiltersClass()
        let filters:FinancesFiltersInterface = financesFilterClassInstance.createFilters(query)
        const responseItem:ResponseInterface = await selectBussinesServicesPayments(filters);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the bussines services payments to report')
    }
}

const getCommodityPayments = async ({query} : Request,res:Response) => {
    
    try {
        let financesFilterClassInstance = new FinancesFiltersClass()
        let filters:FinancesFiltersInterface = financesFilterClassInstance.createFilters(query)
        const responseItem:ResponseInterface = await selectCommodityPayments(filters);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the commodity paymenst to the flow cash report')
    }
}

const getMonthlyPaymentsDeposits = async ({query} : Request,res:Response) => {
    
    try {
        let financesFilterClassInstance = new FinancesFiltersClass()
        let filters:FinancesFiltersInterface = financesFilterClassInstance.createFilters(query)
        const responseItem:ResponseInterface = await selectMonthlyPaymentsDeposits(filters);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the monthly payments deposits to the flow cash report')
    }
}

const getPayableAccountsDeposits = async ({query} : Request,res:Response) => {
    
    try {
        let financesFilterClassInstance = new FinancesFiltersClass()
        let filters:FinancesFiltersInterface = financesFilterClassInstance.createFilters(query)
        const responseItem:ResponseInterface = await selectMonthlyPaymentsDeposits(filters);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the account payable deposits to the flow cash report')
    }
}

const getCashFlow = async ({query} : Request,res:Response) => {
    
    try {
        let financesFilterClassInstance = new FinancesFiltersClass()
        let filters:FinancesFiltersInterface = financesFilterClassInstance.createFilters(query)
        const responseItem:ResponseInterface = await selectCashFlow(filters);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get cash flow report')
    }
}

const getEarningsGroupedByCategories = async ({query} : Request,res:Response) => {
    
    try {
        let financesFilterClassInstance = new FinancesFiltersClass()
        let filters:FinancesFiltersInterface = financesFilterClassInstance.createFilters(query)
        const responseItem:ResponseInterface = await selectEarningsGroupedByCategories(filters);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get cash flow report')
    }
}
export {getPendingMonthlyPayments,getPayedMonthlyPayments,
    getBussinesServicesPayments,
    getCommodityPayments,
    getMonthlyPaymentsDeposits,
    getPayableAccountsDeposits,
    getCashFlow,
    getEarningsGroupedByCategories
}