3
import moment from "moment"
import {pool} from "../config/mysql_connection"
import { AccountsReceivableFilters } from "../interfaces/accounts-receivable/accounts-receivable.filters.interface"
import { Res as ResponseInterface, ResClass, Res} from "../interfaces/response/response"
import { AccountsPayableFilters } from "../interfaces/accounts-payable/acccounts-payable.interface.filters"
import { AccountsPayableInterface } from "../interfaces/accounts-payable/account-payable.interface"
import { log } from "console"
import { AccountPayablePaymentInterface } from "../interfaces/accounts-payable/account-payable-payment.interface"

const newResClassInstance = new ResClass()


const selectAccountsPayable = async (filters:AccountsPayableFilters) : Promise<ResponseInterface> =>  {
    let response:ResponseInterface = newResClassInstance.CreateNewResponse(false,[],false,'')
    try {
        const [select_accounts_payable_result]:any = await pool.query(`SELECT p.nombre_comercial,cpp.*,a.nombre,a.apellido_paterno,a.apellido_materno FROM cuentas_por_pagar cpp INNER JOIN proveedores p ON p.id = cpp.id_proveedor INNER JOIN agentes a ON a.id = cpp.id_agente  ${filters.status}  ${filters.start_date} ${filters.end_date} ${filters.supplier} ${filters.offset } `)
        if (select_accounts_payable_result.length == 0) {
            response.error = false
            response.result = false
            response.message = 'Do not exist accounts payables'
            return response
        }


        select_accounts_payable_result.forEach((element:any) => {
            element.fecha = moment(element.fecha).format('YYYY-MM-DD hh:mm:ss')
            switch (element.metodo_de_pago) {
                case 1:
                    element.metodo_de_pago = 'Efectivo'
                    break;
                case 2:
                    element.metodo_de_pago = 'Transferencia'
                    break;
                case 3:
                    element.metodo_de_pago = 'Tarjeta'
                    break;
                default:
                    break;
            }
        });

        response.error = false
        response.result = true
        response.message = 'Accounts payables found'
        response.data = select_accounts_payable_result
        return response 
    } catch (error) {
        response.result = false
        response.message = 'An error occurred while trying to find the accounts payables'
        response.data = error
        return response 
    }
}


const insertAccountPayable = async (accountPayable:AccountsPayableInterface) : Promise<ResponseInterface> =>  {
    let response:ResponseInterface = newResClassInstance.CreateNewResponse(false,[],false,'')
    try {

        const {supplier,date,iva,total,subtotal,agent,status,concept} = accountPayable
        const [insert_accounts_payable_result]:any = await pool.query(`INSERT INTO cuentas_por_pagar (id,id_proveedor,total,fecha,estatus,iva,subtotal,concepto,id_agente) VALUES (?,?,?,?,?,?,?,?,?) ` , [null,supplier,total,date,status,iva,subtotal,concept,agent])
        if (insert_accounts_payable_result.insertedId == 0) {
            response.error = false
            response.result = false
            response.message = 'Was not posible insert the payable account'
            return response
        }

        response.error = false
        response.result = true
        response.message = 'Payble account inserted successfuly'
        return response 
    } catch (error) {
        response.result = false
        response.message = 'An error occurred while trying to insert the payable account'
        response.data = error
        return response 
    }
}

const selectAccountPayablePayments = async (id:string) : Promise<ResponseInterface> =>  {
    let response:ResponseInterface = newResClassInstance.CreateNewResponse(false,[],false,'')
    try {

        const [selcet_accounts_payable_payments_result]:any = await pool.query(`SELECT acpp.*,a.nombre,a.apellido_paterno,a.apellido_materno FROM abonos_cuentas_por_pagar acpp  INNER JOIN cuentas_por_pagar cpp ON cpp.id = acpp.id_cuenta INNER JOIN agentes a  ON a.id = cpp.id_agente WHERE acpp.id_cuenta = ${id} ORDER BY acpp.fecha DESC`)
        
        if (selcet_accounts_payable_payments_result.length == 0) {
            response.error = false
            response.result = false
            response.message = 'Was not posible get the payable account payments'
            response.code = 500
            return response
        }


        selcet_accounts_payable_payments_result.forEach((data:any) => {
            data.fecha = moment(data.fecha).format('YYYY-MM-DD hh:mm:ss')
            switch (data.metodo_de_pago) {
                case 1:
                    data.metodo_de_pago = 'Efectivo'
                    break;
                case 2:
                    data.metodo_de_pago = 'Transferencia'
                    break;
                case 3:
                    data.metodo_de_pago = 'Tarjeta'
                    break;
                default:
                    break;
            }
        })

        response.error = false
        response.data = selcet_accounts_payable_payments_result
        response.result = true
        response.code = 200
        response.message = 'Payble account payments found successfuly'
        return response 
    } catch (error) {
        console.log('errror - ' , error);
        response.code = 500
        response.result = false
        response.message = 'An error occurred while trying to get the payable account payments'
        response.data = error
        return response 
    }
}

const insertAccountPayablePayment = async (accountPayablePayment:AccountPayablePaymentInterface) : Promise<ResponseInterface> =>  {
    let response:ResponseInterface = newResClassInstance.CreateNewResponse(false,[],false,'')
    try {

        const {agent,date,account,ammount,payment_method} = accountPayablePayment
        const [insert_account_payable_payment_result]:any = await pool.query(`INSERT INTO abonos_cuentas_por_pagar (id,id_agente,id_cuenta,cantidad,metodo_de_pago,fecha) VALUES (?,?,?,?,?,?) ` , [null,agent,account,ammount,payment_method,date])
        if (insert_account_payable_payment_result.insertedId == 0) {
            response.error = false
            response.result = false
            response.message = 'Was not posible insert the payable account payment' 
            return response
        }

        const [select_account_payable]:any = await pool.query(`SELECT total FROM cuentas_por_pagar WHERE id = ?`,[account])
        if (select_account_payable.length == 0) {
            response.error = false
            response.result = false
            response.message = 'Was not posible select the payable account' 
            return response
        }


        const [select_account_payable_payments]:any = await pool.query(`SELECT * FROM abonos_cuentas_por_pagar WHERE id_cuenta = ?`,[account])
        if (select_account_payable_payments.length == 0) {
            response.error = false
            response.result = false
            response.message = 'Was not posible select the payable account payments' 
            return response
        }

        let payed = 0
        select_account_payable_payments.forEach((data:any) => {
            payed += data.cantidad
        })



        if (select_account_payable[0].total == payed) {
            const [result_update_account_payable_status]:any = await pool.query(`UPDATE cuentas_por_pagar SET estatus = ? WHERE id = ?`,[1,account])
            if (result_update_account_payable_status.affectedRows == 0) {
                response.error = false
                response.result = false
                response.message = 'Was not posible update account payable status' 
                return response
            }
        }


        response.error = false
        response.result = true
        response.message = 'Payble account inserted successfuly'
        return response 
    } catch (error) {
        response.result = false
        response.message = 'An error occurred while trying to insert the payable account'
        response.data = error
        return response 
    }
}

const selectAccountPayable = async (id:string) : Promise<ResponseInterface> =>  {
    let response:ResponseInterface = newResClassInstance.CreateNewResponse(false,[],false,'')
    try {        

        const [selcet_account_payable]:any = await pool.query(`SELECT p.nombre_comercial,cpp.*,a.nombre,a.apellido_paterno,a.apellido_materno FROM cuentas_por_pagar cpp  INNER JOIN proveedores p ON p.id = cpp.id_proveedor INNER JOIN agentes a ON a.id = cpp.id_agente WHERE cpp.id = ?`,[id])
        if (selcet_account_payable.length == 0) {
            response.error = false
            response.result = false
            response.code = 500
            response.message = 'Was not posible get the payable account'
            return response
        }


        selcet_account_payable.forEach((data:any) => {
            data.fecha = moment(data.fecha).format('YYYY-MM-DD hh:mm:ss')
            switch (data.metodo_de_pago) {
                case 1:
                    data.metodo_de_pago = 'Efectivo'
                    break;
                case 2:
                    data.metodo_de_pago = 'Tarjeta'
                    break;
                case 3:
                    data.metodo_de_pago = 'Transferencia'
                    break;
                default:
                    break;
            }
        })

        response.error = false
        response.data = selcet_account_payable
        response.result = true
        response.code = 200
        response.message = 'Payble account found successfuly'
        return response 
    } catch (error) {
        console.log('errror - ' , error);
        response.code = 500
        response.result = false
        response.message = 'An error occurred while trying to get the payable account'
        response.data = error
        return response 
    }
}



export { selectAccountsPayable,insertAccountPayable,selectAccountPayablePayments,insertAccountPayablePayment,
    selectAccountPayable}