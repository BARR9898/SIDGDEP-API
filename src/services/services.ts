
import {pool} from "../config/mysql_connection"
import { Res as ResponseInterface, ResClass, Res} from "../interfaces/response/response"
import { Agents } from "../interfaces/agents/agents"
import { AgentsFilters } from "../interfaces/agents/agents.filters"
import { encrypt } from "../utils/bcrypt.handle"
import { UserFilters } from "../interfaces/users/users.filters"
import { Users } from "../interfaces/users/users.interface"
import moment from "moment"
import { log } from "console"
import { Service } from "ts-node"
import { ServiceInterface } from "../interfaces/service/service.interface"
import { ServiceFilters } from "../interfaces/service/services.filters"
import { ServicesReportFiltersInterface } from "../interfaces/reports/services.reports.filter.interface"
import { PaymentServiceInterface } from "../interfaces/service/payment.service.interface"
import { ServicesPaymentsFilters } from "../interfaces/service/services-payments.filters.interface"
const newResClassInstance = new ResClass()

const insertService = async (service: ServiceInterface) : Promise<ResponseInterface> =>  {

    let response:ResponseInterface = newResClassInstance.CreateNewResponse(false,[],false,'')

    try {
        const {name,periodicity} = service


      
        const [insert_service_result]:any = await pool.query('INSERT INTO servicios (id,nombre,periodicidad) VALUES (?,?,?)',[null,name,periodicity])
        if (!insert_service_result.insertId) {
            response.error = true
            response.result = false
            response.message = 'Service can´t be created'
            return response
        }
        response.error = false
        response.result = true
        response.message = 'Service created successfuly'
        return response 
    } catch (error) {
        response.result = false
        response.message = 'An error occurred while trying to insert the service'
        response.data = error
        return response 
    }
}

const selectService = async (id:string) : Promise<ResponseInterface> =>  {

    let response:ResponseInterface = newResClassInstance.CreateNewResponse(false,[],false,'')

    try {
        const [select_service_result]:any = await pool.query('SELECT * FROM servicios WHERE id = ?',[id])
        if (select_service_result.length == 0) {
            response.error = false
            response.result = false
            response.message = 'The service do not exist'
            return response
        }

        response.error = false
        response.result = true
        response.message = 'Service found successfuly'
        response.data = select_service_result
        return response 
    } catch (error) {
        response.result = false
        response.message = 'An error occurred while trying to find the service'
        response.data = error
        return response 
    }
}

const selectServices = async (filters:ServiceFilters) : Promise<ResponseInterface> =>  {
    let response:ResponseInterface = newResClassInstance.CreateNewResponse(false,[],false,'')
    try {
        const [select_services_result]:any = await pool.query(`SELECT * FROM servicios s WHERE s.id > 0 ${filters.name} ${filters.periodicity} ${filters.offset}`)
        if (select_services_result.length == 0) {
            response.error = true
            response.result = false
            response.code = 500
            response.message = 'Do not exist services'
            return response
        }
        response.error = false
        response.result = true
        response.code = 200
        response.message = 'Services found'
        response.data = select_services_result
        return response 
    } catch (error) {
        response.result = false
        response.error = true
        response.code = 500
        response.message = 'An error occurred while trying to find the services'
        response.data = error
        return response 
    }
}

const selectReportsServices = async (filters:ServicesReportFiltersInterface) : Promise<ResponseInterface> =>  {
    let response:ResponseInterface = newResClassInstance.CreateNewResponse(false,[],false,'')
    try {
        
        const [select_services_result]:any = await pool.query(`SELECT s.*,a.nombre as agente_nombre,a.apellido_paterno,a.apellido_materno,p.cantidad,p.fecha_pago FROM servicios s INNER JOIN pagos p ON p.servicio_id = s.id INNER JOIN agentes a ON a.id = p.agente_id WHERE s.id > 0 ${filters.name} ${filters.periodicity} ${filters.start_date} ${filters.end_date} ${filters.agent} ${filters.pay_date}`)
        if (select_services_result.length == 0) {
            response.error = false
            response.result = false
            response.message = 'Do not exist results'
            return response
        }

        


        response.error = false
        response.result = true
        response.message = 'Report found'
        response.data = select_services_result
        return response 
    } catch (error) {
        console.log('error',error);
        response.result = false
        response.message = 'An error occurred while trying to find the services to report'
        response.data = error
        return response 
    }
}

const updateService = async (service: ServiceInterface,id:string) : Promise<ResponseInterface> =>  {

    let response:ResponseInterface = newResClassInstance.CreateNewResponse(false,[],false,'')

    try {
        const {name,periodicity} = service

        const [update_service_result]:any = await pool.query(`UPDATE servicios SET nombre = ?,periodicidad = ? WHERE id = ${id}`,[name,periodicity])
        if (update_service_result.affectedRows == 0) {
            response.error = true
            response.result = false
            response.message = 'Servcie can´t be updated'
            return response
        }
        response.error = false
        response.result = true
        response.message = 'Servcie updated successfuly'
        return response 
    } catch (error) {
        response.result = true
        response.message = 'An error occurred while trying to update the Servcie'
        response.data = error
        return response 
    }
}

const deleteService = async (id:string) : Promise<ResponseInterface> =>  {

    let response:ResponseInterface = newResClassInstance.CreateNewResponse(false,[],false,'')

    
    try {        

        //Delete from agents table
        const [delete_service_result]:any = await pool.query('DELETE FROM servicios WHERE id = ?',[id])        
        if (delete_service_result.affectedRows == 0) {
            response.error = true
            response.result = false
            response.message = 'Service wasent removed'
            return response
        }
        response.error = false
        response.result = true
        response.message = 'Service removed successfuly'
        return response 
    } catch (error) {
        response.result = false
        response.message = 'An error occurred while trying to remove the service' + error
        response.data = error
        return response 
    }
}

const insertPaymentService = async (service: PaymentServiceInterface,service_id:string,agent_id:number) : Promise<ResponseInterface> =>  {

    let response:ResponseInterface = newResClassInstance.CreateNewResponse(false,[],false,'')

    try {

        let {total,date} = service

        date = moment().format('YYYY-MM-DD hh:mm:ss')
      
        const [insert_payment_service_result]:any = await pool.query('INSERT INTO pagos (id,cantidad,fecha_pago,servicio_id,agente_id) VALUES (?,?,?,?,?)',[null,total,date,service_id,agent_id])
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

const selectPaymentsServices = async (filters:ServicesPaymentsFilters) : Promise<ResponseInterface> =>  {
    let response:ResponseInterface = newResClassInstance.CreateNewResponse(false,[],false,'')
    try {
        const [select_payments_services_result]:any = await pool.query(`SELECT p.*,s.nombre FROM pagos p INNER JOIN servicios s ON s.id = p.servicio_id WHERE p.id > 0  ${filters.start_date} ${filters.end_date} ${filters.status}`)
        if (select_payments_services_result.length == 0) {
            response.error = true
            response.result = false
            response.code = 500
            response.message = 'Do not exist payments services'
            return response
        }
        response.error = false
        response.result = true
        response.code = 200
        response.message = 'Payments Services found'
        response.data = select_payments_services_result
        return response 
    } catch (error) {
        console.log('error - ',error);
        response.result = false
        response.error = true
        response.code = 500
        response.message = 'An error occurred while trying to find the payments services'
        response.data = error
        return response 
    }
}


export { insertService,
    selectService,
    selectServices,
    updateService,
    deleteService,
    selectReportsServices,
    insertPaymentService,
    selectPaymentsServices
}