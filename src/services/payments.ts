
import { pool } from "../config/mysql_connection"
import { Res as ResponseInterface, ResClass, Res } from "../interfaces/response/response"
import { Agents } from "../interfaces/agents/agents"
import { AgentsFilters } from "../interfaces/agents/agents.filters"
import { encrypt } from "../utils/bcrypt.handle"
import moment from "moment"
import { PaymentsFiltersInterface } from "../interfaces/payments/payments.filters.interface"
import { log } from "console"

const newResClassInstance = new ResClass()



const selectHistoryPayments = async (id: string): Promise<ResponseInterface> => {

    let response: ResponseInterface = newResClassInstance.CreateNewResponse(false, [], false, '')

    try {

        const [select_history_result]: any = await pool.query('SELECT ab.*,ag.nombre,ag.apellido_paterno,ag.apellido_materno FROM abonos ab INNER JOIN agentes ag ON ag.id = ab.agente_id WHERE mensualidad_id = ?', [id])
        if (select_history_result.length == 0) {
            response.error = false
            response.result = false
            response.message = 'Cant´t found mensuality´s payments'
            return response
        }

        const [selcet_total_mensuality]: any = await pool.query('SELECT total FROM mensualidades WHERE id = ?', [id])

        if (selcet_total_mensuality.length == 0) {
            response.error = false
            response.result = false
            response.message = 'Cant´t found mensuality´s total'
            return response
        }


        let total = selcet_total_mensuality[0].total

        let payed = 0
        select_history_result.forEach((payment: any) => {
            payment.fecha = moment(payment.fecha).format('YYYY-MM-DD hh:mm:ss')
            payed += payment.cantidad
            switch (payment.metodo_de_pago) {
                case 1:
                    payment.metodo_de_pago = 'Efectivo'
                    break;
                case 2:
                    payment.metodo_de_pago = 'Transferencia'
                    break;
                case 3:
                    payment.metodo_de_pago = 'Tarjeta'
                    break;

                default:
                    break;
            }

        })

        let data = {
            history_payments: select_history_result,
            payed: payed,
            rest_to_pay: total - payed
        }


        response.error = false
        response.result = true
        response.message = 'History payments found'
        response.data = data
        return response
    } catch (error) {
        response.result = false
        response.error = true
        response.message = 'An error occurred while trying to find the mensuality´s history payments'
        response.data = error
        return response
    }
}

const selectPayments = async (filters: PaymentsFiltersInterface): Promise<ResponseInterface> => {

    let response: ResponseInterface = newResClassInstance.CreateNewResponse(false, [], false, '')

    try {
        const [select_payments]: any = await pool.query(`SELECT u.nombre as usuario_nombre,u.apellido_paterno as usuario_apellido_paterno, u.apellido_materno as usuario_apellido_materno,ab.*,a.nombre as agente_nombre, a.apellido_paterno as agente_apellido_paterno,a.apellido_materno as agente_apellido_materno FROM abonos ab INNER JOIN mensualidades m ON m.id = ab.mensualidad_id INNER JOIN usuarios u ON u.id = m.usuario_id  INNER JOIN agentes a ON a.id = ab.agente_id ${filters.user} ${filters.start_date} ${filters.end_date} ${filters.payment_method} ORDER BY ab.id DESC ${filters.offset}`)
        if (select_payments.length == 0) {
            response.error = false
            response.result = false
            response.message = 'Cant´t found payments'
            return response
        }

        select_payments.forEach((payment: any) => {
            payment.fecha = moment(payment.fecha).format('YYYY-MM-DD hh:mm:ss')
            switch (payment.metodo_de_pago) {
                case 1:
                    payment.metodo_de_pago = 'Efectivo'
                    break;
                case 2:
                    payment.metodo_de_pago = 'Transferencia'
                    break;
                case 3:
                    payment.metodo_de_pago = 'Tarjeta'
                    break;
                default:
                    payment.metodo_de_pago = ''
                    break;
            }
        })

        response.error = false
        response.result = true
        response.message = 'Payments found'
        response.data = select_payments
        return response
    } catch (error) {

        response.result = false
        response.error = true
        response.message = 'An error occurred while trying to find the payments'
        response.data = error
        return response
    }
}

export { selectHistoryPayments, selectPayments }