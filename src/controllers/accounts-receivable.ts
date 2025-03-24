import { Request,Response, query } from "express"
import { Res as ResponseInterface } from "../interfaces/response/response";
import { handleHttp } from "../middelwares/error.handle";
import { AccountsReceivableFilters, AccountsReceivableFiltersClass } from "../interfaces/accounts-receivable/accounts-receivable.filters.interface";
import {createAccountReceivableDeposit, selectAccountReceivablePayments, selectAccountReceivableProducts, selectAccountsReceivable, selectAccountsReceivableDeposits, selectAllAccountsReceivablePayments } from "../services/accounts-receivable";
import { AccountsReceivableDepositsFilters, AccountsReceivableDepositsFiltersClass } from "../interfaces/accounts-receivable/accounts-receivable-deposits.filters.interface";

const getAccountsReceivablePayments = async ({params} : Request,res:Response) => {
    
    try {
        const {account_id} = params
        //let newInstanceAccountsReceivableFiltersClass = new AccountsReceivableFiltersClass()
        //let filters:AccountsReceivableFilters = newInstanceAccountsReceivableFiltersClass.createFilters(query)
        const responseItem:ResponseInterface = await selectAccountReceivablePayments(account_id);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the accounts receivable')
    }
}

const getAccountsReceivable = async ({body,query} : Request,res:Response) => {
    
    try {
        let newInstanceAccountsReceivableFiltersClass = new AccountsReceivableFiltersClass()
        let filters:AccountsReceivableFilters = newInstanceAccountsReceivableFiltersClass.createFilters(query)
        const responseItem:ResponseInterface = await selectAccountsReceivable(filters);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the accounts receivable')
    }
}

const getAccountReceivableProducts = async ({params} : Request,res:Response) => {
    
    try {
        let {account_id} = params
        
        const responseItem:ResponseInterface = await selectAccountReceivableProducts(account_id);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the accounts receivable')
    }
}

const postDepositAccountReceivable = async ({body} : Request,res:Response) => {
    
    try {
   
        const responseItem:ResponseInterface = await createAccountReceivableDeposit(body);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to create the accounts receivable deposit')
    }
}


const getPaymentsAccountReceivable = async ({params} : Request,res:Response) => {
    
    try {
        let {account_id} = params
        const responseItem:ResponseInterface = await selectAccountReceivablePayments(account_id);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the accounts receivable payments')
    }
}

const getAccountsReceivableDeposits = async ({query} : Request,res:Response) => {
    
    try {
        let newInstanceAccountsReceivableDepositsFiltersClass = new AccountsReceivableDepositsFiltersClass()
        let filters:AccountsReceivableDepositsFilters = newInstanceAccountsReceivableDepositsFiltersClass.createFilters(query)
        const responseItem:ResponseInterface = await selectAccountsReceivableDeposits(filters);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the accounts receivable deposits')
    }
}




export {getAccountsReceivablePayments,getAccountsReceivable,
    getAccountReceivableProducts,
    postDepositAccountReceivable,
    getPaymentsAccountReceivable,
    getAccountsReceivableDeposits
}