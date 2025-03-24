
import { pool } from "../config/mysql_connection"
import { Res as ResponseInterface, ResClass, Res } from "../interfaces/response/response"
import { Agents } from "../interfaces/agents/agents"
import { AgentsFilters } from "../interfaces/agents/agents.filters"
import { encrypt } from "../utils/bcrypt.handle"
import { AgentsSalariesPaymentsFilters } from "../interfaces/agents-salaries-payments/agents-salaries-payements.filters"
import { FILE } from "dns"
import { AgentsSalaryPayment } from "../interfaces/agents-salaries-payments/agents-salaries-payements"
import moment from "moment"

const newResClassInstance = new ResClass()



const deleteAgentSalaryPayment = async (id:string) : Promise<ResponseInterface> =>  {

    let response:ResponseInterface = newResClassInstance.CreateNewResponse(false,[],false,'')

    try {

        const [delete_salary_agent_payemnt]:any = await pool.query(`DELETE FROM agentes_salarios WHERE id  = ?`,[id])
        if (delete_salary_agent_payemnt.affectedRows == 0) {
            response.error = true
            response.result = false
            response.code = 500
            response.message = 'Agent was not deleted'
            return response
        }
        response.error = false
        response.result = true
        response.code = 200
        response.message = 'Agent deleted successfuly'
        return response 
    } catch (error) {
        console.log('ERROR - ',error);
        response.code = 500
        response.result = true
        response.message = 'An error occurred while trying to delete the agent'
        response.data = error
        return response 
    }
}


const selectAgentsSalariesPayments = async (filters: AgentsSalariesPaymentsFilters): Promise<ResponseInterface> => {

    let response: ResponseInterface = newResClassInstance.CreateNewResponse(false, [], false, '')

    try {

        const [selcect_agent_salaries_payments]: any = await pool.query(`SELECT asp.*,a.nombre,a.apellido_materno,a.apellido_paterno from agentes_salarios asp  INNER JOIN agentes a ON a.id = asp.agente_id WHERE asp.id > 0 ${filters.start_date} ${filters.end_date} ${filters.payment_method} ${filters.agent}`)
        if (selcect_agent_salaries_payments.length == 0) {
            response.error = true
            response.result = false
            response.code = 500
            response.message = 'Agent salaries payments was not found'
            return response
        }

        selcect_agent_salaries_payments.map((payment: AgentsSalaryPayment) => {
            payment.fecha_de_pago = moment(payment.fecha_de_pago).format('YYYY-MM-DD hh:mm:ss')
            switch (payment.metodo_de_pago) {
                case 1:
                    payment.metodo_de_pago = 'Efectivo'
                    break;
                case 1:
                    payment.metodo_de_pago = 'Tarjeta'
                    break;
                default:
                    payment.metodo_de_pago = 'Transferencia'
                    break;
            }
        })

        response.error = false
        response.result = true
        response.data = selcect_agent_salaries_payments
        response.code = 200
        response.message = 'Agent salaries payments found successfuly'
        return response
    } catch (error) {
        console.log('error - ', error);

        response.result = true
        response.code = 500
        response.error = true
        response.message = 'An error occurred while trying to get the agent salaries payments '
        response.data = error
        return response
    }
}

const insertAgentSalaryPayment = async (payment: AgentsSalaryPayment): Promise<ResponseInterface> => {

    let response: ResponseInterface = newResClassInstance.CreateNewResponse(false, [], false, '')

    try {

        const { metodo_de_pago, fecha_de_pago, cantidad, agente_id } = payment

        const [insert_agent_salary_payment]: any = await pool.query(`INSERT INTO agentes_salarios (id,fecha_de_pago,metodo_de_pago,cantidad,agente_id) VALUES (?,?,?,?,?)`, [null, fecha_de_pago, metodo_de_pago, cantidad, agente_id])
        if (!insert_agent_salary_payment.insertId) {
            response.error = true
            response.result = false
            response.code = 500
            response.message = 'Agent salary payment was not inserted'
            return response
        }
        response.error = false
        response.result = true
        response.code = 200
        response.message = 'Agent salary payment inserted successfuly'
        return response
    } catch (error) {
        console.log('error - ', error);
        response.result = true
        response.code = 500
        response.error = true
        response.message = 'An error occurred while trying to insert the agent salary payment '
        response.data = error
        return response
    }
}

export {
    deleteAgentSalaryPayment,
    selectAgentsSalariesPayments,
    insertAgentSalaryPayment
}