
import { pool } from "../config/mysql_connection"
import { Res as ResponseInterface, ResClass, Res } from "../interfaces/response/response"
import moment from "moment"
import { PaymentServiceInterface } from "../interfaces/service/payment.service.interface"
import { ServicesPaymentsFilters } from "../interfaces/service/services-payments.filters.interface"
const newResClassInstance = new ResClass()



const insertPaymentService = async (service: PaymentServiceInterface, service_id: string, agent_id: number): Promise<ResponseInterface> => {

    let response: ResponseInterface = newResClassInstance.CreateNewResponse(false, [], false, '')

    try {

        let { total, date ,payment_method } = service

        date = moment().format('YYYY-MM-DD hh:mm:ss')

        const [insert_payment_service_result]: any = await pool.query('INSERT INTO pagos (id,cantidad,fecha_pago,servicio_id,agente_id,metodo_de_pago) VALUES (?,?,?,?,?,?)', [null, total, date, service_id, agent_id,payment_method])
        if (!insert_payment_service_result.insertId) {
            response.error = true
            response.result = false
            response.message = 'Service can´t be payed'
            return response
        }
        response.error = false
        response.result = true
        response.message = 'Service payed successfuly'
        return response
    } catch (error) {
        response.result = false
        response.message = 'An error occurred while trying to pay the service'
        response.data = error
        return response
    }
}

const selectPaymentsServices = async (filters: ServicesPaymentsFilters): Promise<ResponseInterface> => {
    let response: ResponseInterface = newResClassInstance.CreateNewResponse(false, [], false, '')
    try {
        const [select_payments_services_result]: any = await pool.query(`SELECT p.*,s.nombre FROM pagos p INNER JOIN servicios s ON s.id = p.servicio_id WHERE p.id > 0  ${filters.start_date} ${filters.end_date} ${filters.status} ${filters.offset}`)
        if (select_payments_services_result.length == 0) {
            response.error = true
            response.result = false
            response.code = 500
            response.message = 'Do not exist payments services'
            return response
        }

        select_payments_services_result.map((payment: any) => {
            payment.fecha_pago = moment(payment.fecha_pago).format('YYYY-MM-DD hh:mm:ss')
            switch (payment.metodo_de_pago) {
                case 1:
                    payment.metodo_de_pago = 'Efectivo'
                    break;
                case 2:
                    payment.metodo_de_pago = 'Transferencia'
                    break;
                default:
                    payment.metodo_de_pago = 'Tarjeta'
                    break;
            }
        })

        response.error = false
        response.result = true
        response.code = 200
        response.message = 'Payments Services found'
        response.data = select_payments_services_result
        return response
    } catch (error) {
        console.log('error - ', error);
        response.result = false
        response.error = true
        response.code = 500
        response.message = 'An error occurred while trying to find the payments services'
        response.data = error
        return response
    }
}

const deletePaymentService = async (payment_id:string): Promise<ResponseInterface> => {
    let response: ResponseInterface = newResClassInstance.CreateNewResponse(false, [], false, '')
    try {
        const [delete_payment_service]: any = await pool.query(`DELETE FROM pagos WHERE id = ?`,[payment_id])
        if (delete_payment_service.affectedRows == 0) {
            response.error = true
            response.result = false
            response.code = 500
            response.message = 'Was not possible delete the payment service'
            return response
        }


        response.error = false
        response.result = true
        response.code = 200
        response.message = 'Payments Services delete successfuly'
        return response
    } catch (error) {
        console.log('error - ', error);
        response.result = false
        response.error = true
        response.code = 500
        response.message = 'An error occurred while trying to delete the payments services'
        response.data = error
        return response
    }
}


export {
    insertPaymentService,
    selectPaymentsServices,
    deletePaymentService
}