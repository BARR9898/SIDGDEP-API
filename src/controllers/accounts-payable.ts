import { Request,Response, query } from "express"
import { Res as ResponseInterface } from "../interfaces/response/response";
import { handleHttp } from "../middelwares/error.handle";
import { insertAccountPayable, insertAccountPayablePayment, selectAccountPayable, selectAccountPayablePayments, selectAccountsPayable } from "../services/accounts-payable";
import { AccountsPayableClass, AccountsPayableFilters } from "../interfaces/accounts-payable/acccounts-payable.interface.filters";

const getAccountsPayable = async ({query} : Request,res:Response) => {
    
    try {
        let accountPayableClass = new AccountsPayableClass()
        let filters:AccountsPayableFilters = accountPayableClass.createFilters(query)
        const responseItem:ResponseInterface = await selectAccountsPayable(filters);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the accounts payable')
    }
}

const createAccountsPayable = async ({body} : Request,res:Response) => {
    
    try {
        const responseItem:ResponseInterface = await insertAccountPayable(body);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the accounts payable')
    }
}

const getAccountPayablePayments = async ({params} : Request,res:Response) => {
    
    try {
        const {account_id} = params
        const responseItem:ResponseInterface = await selectAccountPayablePayments(account_id);
        res.status(responseItem.code!)
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the account payable payments')
    }
}

const getAccountPayable = async ({params} : Request,res:Response) => {
    
    try {
        const {account_id} = params        
        const responseItem:ResponseInterface = await selectAccountPayable(account_id);
        res.status(responseItem.code!)
        res.send(responseItem); 
    } catch (error) {
        console.log('error - controller',error);
        
        handleHttp(res,'An error ocurred trying to get the account payable')
    }
}

const createAccountsPayablePayment = async ({body} : Request,res:Response) => {
    
    try {
        const responseItem:ResponseInterface = await insertAccountPayablePayment(body);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to create the account payable payment')
    }
}




export {getAccountsPayable,createAccountsPayable,
    getAccountPayablePayments,
    createAccountsPayablePayment,
    getAccountPayable
}