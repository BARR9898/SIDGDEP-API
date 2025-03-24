3
import moment from "moment"
import { pool } from "../config/mysql_connection"
import { AccountsReceivableFilters } from "../interfaces/accounts-receivable/accounts-receivable.filters.interface"
import { Res as ResponseInterface, ResClass, Res } from "../interfaces/response/response"
import { log } from "console"
import { AccountsReceivableDepositsFilters } from "../interfaces/accounts-receivable/accounts-receivable-deposits.filters.interface"

const newResClassInstance = new ResClass()


const selectAllAccountsReceivablePayments = async (filters: AccountsReceivableFilters): Promise<ResponseInterface> => {
    let response: ResponseInterface = newResClassInstance.CreateNewResponse(false, [], false, '')
    try {
        const [select_accounts_receivable_result]: any = await pool.query(`SELECT avm.*,a.nombre as a_n, a.apellido_paterno as a_ap, a.apellido_materno as a_am, u.nombre as u_n, u.apellido_paterno as u_ap, u.apellido_materno as u_am FROM abonos_ventas_mercancia avm INNER JOIN ventas_mercancia vm ON vm.id = avm.id_venta INNER JOIN agentes a ON a.id = avm.id_agente INNER JOIN usuarios u ON vm.id_usuario = u.id WHERE avm.id > 0 ${filters.agent} ${filters.payment_method} ${filters.start_date} ${filters.end_date} ${filters.user} `)
        if (select_accounts_receivable_result.length == 0) {
            response.error = false
            response.result = false
            response.message = 'Do not exist accounts receivables'
            return response
        }


        select_accounts_receivable_result.forEach((element: any) => {
            element.fecha = moment(element.fecha).format('YYYY-MM-DD hh:mm:ss')
            switch (element.metodo_pago) {
                case 1:
                    element.metodo_pago = 'Efectivo'
                    break;
                case 2:
                    element.metodo_pago = 'Transferencia'
                    break;
                case 3:
                    element.metodo_pago = 'Tarjeta'
                    break;
                default:
                    break;
            }
        });

        response.error = false
        response.result = true
        response.message = 'Accounts receivables found'
        response.data = select_accounts_receivable_result
        return response
    } catch (error) {
        response.result = false
        response.message = 'An error occurred while trying to find the accounts receivables'
        response.data = error
        return response
    }
}

const selectAccountsReceivable = async (filters: AccountsReceivableFilters): Promise<ResponseInterface> => {
    let response: ResponseInterface = newResClassInstance.CreateNewResponse(false, [], false, '')
    try {
        const [select_accounts_receivable_result]: any = await pool.query(`SELECT vm.*,a.nombre as a_n, a.apellido_paterno as a_ap, a.apellido_materno as a_am, u.nombre as u_n, u.apellido_paterno as u_ap, u.apellido_materno as u_am FROM ventas_mercancia vm INNER JOIN usuarios u ON vm.id_usuario = u.id INNER JOIN agentes a ON a.id = vm.id_agente WHERE vm.estatus = 0  ${filters.agent} ${filters.payment_method} ${filters.user} ${filters.start_date} ${filters.end_date} ORDER BY vm.id DESC ${filters.offset}`)
        if (select_accounts_receivable_result.length == 0) {
            response.error = false
            response.result = false
            response.message = 'Do not exist accounts receivables'
            return response
        }


        select_accounts_receivable_result.forEach((element: any) => {
            element.fecha = moment(element.fecha).format('YYYY-MM-DD hh:mm:ss')
            switch (element.metodo_pago) {
                case 1:
                    element.metodo_pago = 'Efectivo'
                    break;
                case 2:
                    element.metodo_pago = 'Transferencia'
                    break;
                case 3:
                    element.metodo_pago = 'Tarjeta'
                    break;
                default:
                    break;
            }
        });

        response.error = false
        response.result = true
        response.message = 'Accounts receivables found'
        response.data = select_accounts_receivable_result
        return response

    } catch (error) {
        response.result = false
        response.message = 'An error occurred while trying to find the accounts receivables'
        response.data = error
        return response
    }
}

const selectAccountReceivableProducts = async (id: string): Promise<ResponseInterface> => {
    let response: ResponseInterface = newResClassInstance.CreateNewResponse(false, [], false, '')
    try {
        const [select_account_receivable_result]: any = await pool.query(`SELECT vpm.*,m.nombre,m.talla,m.precio,u.nombre as usuario_nombre,u.apellido_paterno as usuario_apellido_paterno,u.apellido_materno as usuario_apellido_materno FROM ventas_mercancias_productos vpm  INNER JOIN mercancias m ON m.id = vpm.id_mercancia INNER JOIN ventas_mercancia vm ON vm.id = vpm.id_venta INNER JOIN usuarios u ON u.id = vm.id_usuario WHERE vpm.id_venta = ? `, [id])
        if (select_account_receivable_result.length == 0) {
            response.error = false
            response.result = false
            response.message = 'Do not exist the account receivable'
            return response
        }

        select_account_receivable_result.map((product:any) => {
            switch (product.talla) {
                case 'XS':
                    product.talla = 'Extra chica'
                    break;
                case 'S':
                    product.talla = 'Chica'
                    break;
                case 'M':
                    product.talla = 'Mediana'
                    break;
                case 'L':
                    product.talla = 'Grande'
                    break;
                default:
                    product.talla = 'Extra grande'
                    break;
            }
        })


        response.error = false
        response.result = true
        response.message = 'Account receivables found'
        response.data = select_account_receivable_result
        return response
    } catch (error) {
        response.result = false
        response.message = 'An error occurred while trying to find the account receivable'
        response.data = error
        return response
    }
}

const createAccountReceivableDeposit = async (deposit: any): Promise<ResponseInterface> => {
    let response: ResponseInterface = newResClassInstance.CreateNewResponse(false, [], false, '')
    try {

        const { account, agent, ammount, date, payment_method } = deposit
        const [create_account_receivable__despoit_result]: any = await pool.query(`INSERT INTO abonos_ventas_mercancia (id,id_venta,cantidad,fecha,metodo_de_pago,id_agente) VALUES (?,?,?,?,?,?) `, [null, account, ammount, date, payment_method, agent])
        if (create_account_receivable__despoit_result.insertedId == 0) {
            response.error = false
            response.result = false
            response.message = 'Was not posible create the new deposit'
            return response
        }


        //EVALUATE IF THE ACCOUNT IS PAYED
        const [select_account_receivable_result]: any = await pool.query(`SELECT cantidad FROM abonos_ventas_mercancia WHERE id_venta = ?  `, [account])

        let payed = 0
        select_account_receivable_result.forEach((element: any) => {
            payed += element.cantidad
        })


        const [select_total_account_receivable_result]: any = await pool.query(`SELECT total FROM ventas_mercancia vm WHERE vm.id = ?  `, [account])
        let total = select_total_account_receivable_result[0].total

        if (payed == total) {
            const [update_status_account_receivable_result]: any = await pool.query(`UPDATE ventas_mercancia vm SET estatus = ?  WHERE vm.id = ?  `, [1, account])
            if (update_status_account_receivable_result.affectedRows == 0) {
                response.error = false
                response.result = false
                response.message = 'Was not posible update the status account'
                return response
            }
        }


        response.error = false
        response.result = true
        response.message = 'Deposit crated successfuly'
        response.data = create_account_receivable__despoit_result
        return response
    } catch (error) {
        response.result = false
        response.message = 'An error occurred while trying to find the account receivable'
        response.data = error
        return response
    }
}

const selectAccountReceivablePayments = async (id: string): Promise<ResponseInterface> => {
    let response: ResponseInterface = newResClassInstance.CreateNewResponse(false, [], false, '')
    try {

        const [select_account_receivable]: any = await pool.query(`SELECT total FROM ventas_mercancia WHERE id = ? `, [id])
        if (select_account_receivable.length == 0) {
            response.error = false
            response.result = false
            response.message = 'Can´t select the account receivable'
            return response
        }

        let total = select_account_receivable[0].total

        const [select_payments_account_receivable_result]: any = await pool.query(`SELECT avm.*, a.nombre,a.apellido_paterno, a.apellido_materno FROM abonos_ventas_mercancia avm INNER JOIN agentes a ON a.id = avm.id_agente WHERE avm.id_venta = ?  `, [id])

        let payed = 0
        if (select_payments_account_receivable_result.length > 0) {
            select_payments_account_receivable_result.forEach((element: any) => {
                payed += element.cantidad
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
            })
        }

        let rest_to_pay = total - payed
        let data = {
            account_receivable_deposits: select_payments_account_receivable_result,
            payed: payed,
            rest_to_pay: rest_to_pay
        }

        response.error = false
        response.result = true
        response.message = 'Payments found'
        response.data = data
        return response
    } catch (error) {
        response.result = false
        response.message = 'An error occurred while trying to find the account receivable payments'
        response.data = error
        return response
    }
}

const selectAccountsReceivableDeposits = async (filters: AccountsReceivableDepositsFilters): Promise<ResponseInterface> => {
    let response: ResponseInterface = newResClassInstance.CreateNewResponse(false, [], false, '')
    try {
        const [select_accounts_receivable_deposits_result]: any = await pool.query(`SELECT avm.*,a.nombre as agente_nombre, a.apellido_paterno as agente_apellido_paterno , a.apellido_materno as agente_apellido_paterno , u.nombre as usuario_nombre , u.apellido_paterno as usuario_apellido_paterno, u.apellido_materno as usuario_apellido_materno FROM abonos_ventas_mercancia avm INNER JOIN agentes a ON a.id = avm.id_agente INNER JOIN ventas_mercancia v ON v.id = avm.id_venta INNER JOIN usuarios u ON u.id = v.id_usuario WHERE avm.id > 0 ${filters.start_date} ${filters.start_date} ${filters.payment_method} ${filters.user} ${filters.agent} ORDER BY avm.id DESC ${filters.offset}`)
        if (select_accounts_receivable_deposits_result.length == 0) {
            response.error = false
            response.result = false
            response.message = 'Do not exist accounts receivables deposits'
            return response
        }


        select_accounts_receivable_deposits_result.forEach((element: any) => {
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
        response.message = 'Accounts receivables deposits found'
        response.data = select_accounts_receivable_deposits_result
        return response

    } catch (error) {
        response.result = false
        response.message = 'An error occurred while trying to find the accounts receivables deposits'
        response.data = error
        return response
    }
}


export {
    selectAccountsReceivable, selectAllAccountsReceivablePayments,
    selectAccountReceivableProducts,
    createAccountReceivableDeposit,
    selectAccountReceivablePayments,
    selectAccountsReceivableDeposits
}