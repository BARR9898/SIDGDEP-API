
import {pool} from "../config/mysql_connection"
import { Res as ResponseInterface, ResClass, Res} from "../interfaces/response/response"
import { Agents } from "../interfaces/agents/agents"
import { AgentsFilters } from "../interfaces/agents/agents.filters"
import { encrypt } from "../utils/bcrypt.handle"
import { MensualytiesReportFilter } from "../interfaces/reports/mensualyties.reports.filter.interface"
import { log } from "console"
import moment from "moment"

const newResClassInstance = new ResClass()

const insertAgent = async (agent: Agents) : Promise<ResponseInterface> =>  {

    let response:ResponseInterface = newResClassInstance.CreateNewResponse(false,[],false,'')

    try {
        const {name,lastname,second_lastname,email,password,rol,status} = agent

        //Evaluate if agents already exist
        const [select_agent]:any = await pool.query('SELECT * FROM agentes WHERE correo = ?',[email])
        if (select_agent.length > 0) {
            response.error = false
            response.result = false
            response.message = 'Agent already exist'
            return response
        }

        //Encrypt the password and insert into the database
        const passHash = await encrypt(password); //Encrypt the pass
        const [insert_agent_result]:any = await pool.query('INSERT INTO agentes (id,nombre,apellido_paterno,apellido_materno,rol,password,correo,estatus) VALUES (?,?,?,?,?,?,?,?)',[null,name,lastname,second_lastname,rol,passHash,email,status])
        if (!insert_agent_result.insertId) {
            response.error = true
            response.result = false
            response.message = 'Agent wasent created'
            return response
        }
        response.error = false
        response.result = true
        response.message = 'Agent created successfuly'
        return response 
    } catch (error) {
        response.result = false
        response.message = 'An error occurred while trying to insert the agent'
        response.data = error
        return response 
    }
}

const selectAgent = async (id:string) : Promise<ResponseInterface> =>  {

    let response:ResponseInterface = newResClassInstance.CreateNewResponse(false,[],false,'')

    try {
        const [select_agent_result]:any = await pool.query('SELECT * FROM agentes WHERE id = ?',[id])
        if (select_agent_result.length == 0) {
            response.error = false
            response.result = false
            response.message = 'The agent do not exist'
            return response
        }
        response.error = false
        response.result = true
        response.message = 'Agent found successfuly'
        response.data = select_agent_result
        return response 
    } catch (error) {
        response.result = false
        response.message = 'An error occurred while trying to find the agent'
        response.data = error
        return response 
    }
}

const selectAgents = async (filters:AgentsFilters) : Promise<ResponseInterface> =>  {

    let response:ResponseInterface = newResClassInstance.CreateNewResponse(false,[],false,'')

    try {
        const [select_agents_result]:any = await pool.query(`SELECT * FROM agentes a WHERE id > 0 ${filters.name} ${filters.lastname} ${filters.second_lastname} ${filters.status}`)
        if (select_agents_result.length == 0) {
            response.error = false
            response.result = false
            response.message = 'Do not exist agents'
            return response
        }
        response.error = false
        response.result = true
        response.message = 'Agents found'
        response.data = select_agents_result
        return response 
    } catch (error) {
        response.result = false
        response.message = 'An error occurred while trying to find the agents'
        response.data = error
        return response 
    }
}

const selectMensualytiesReport = async (filters:MensualytiesReportFilter) : Promise<ResponseInterface> =>  {

    let response:ResponseInterface = newResClassInstance.CreateNewResponse(false,[],false,'')

    try {

        const [selcet_mensualyties_report]:any = await pool.query(`SELECT m.*,u.nombre,u.apellido_paterno,u.apellido_materno,a.nombre as agente_nombre,a.apellido_paterno as agente_apellido_paterno,a.apellido_materno as agente_apellido_materno,p.id as promocion_id,p.nombre as promocion_nombre FROM mensualidades m  INNER JOIN usuarios u ON u .id = m.usuario_id INNER JOIN agentes a ON a.id = m.agente_id INNER JOIN promociones p ON p.id = m.promocion_id WHERE m.id > 0 ${filters.agent} ${filters.end_date} ${filters.pay_date} ${filters.payment_type} ${filters.promotion} ${filters.start_date} ${filters.status} ${filters.user}`)
       
        if (selcet_mensualyties_report.length == 0) {
            response.error = false
            response.result = false
            response.message = 'Report can´t be created'
            return response
        }

        selcet_mensualyties_report.forEach((data:any) => {
            data.fecha_inicio = moment(data.fecha_inicio).format('YYYY-MM-DD hh:mm:ss')
            data.fecha_fin = moment(data.fecha_fin).format('YYYY-MM-DD hh:mm:ss')
            data.fecha_pago = moment(data.fecha_pago).format('YYYY-MM-DD hh:mm:ss')
        })

        response.error = false
        response.result = true
        response.data = selcet_mensualyties_report
        response.message = 'Report created successfuly'
        return response 
    } catch (error) {
        response.result = false
        response.error = true
        response.message = 'An error occurred while trying to generate mensualyties report'
        response.data = error
        return response 
    }
}

const deleteAgent = async (id:string) : Promise<ResponseInterface> =>  {

    let response:ResponseInterface = newResClassInstance.CreateNewResponse(false,[],false,'')

    try {

        //Delete from agents table
        const [delete_agent_result]:any = await pool.query('DELETE FROM agentes WHERE id = ?',[id])
        if (delete_agent_result.affectedRows == 0) {
            response.error = true
            response.result = false
            response.message = 'Agent wasent removed'
            return response
        }
        response.error = false
        response.result = true
        response.message = 'Agent removed successfuly'
        return response 
    } catch (error) {
        response.result = false
        response.message = 'An error occurred while trying to remove the agent'
        response.data = error
        return response 
    }
}


export { insertAgent,selectAgent,selectAgents,selectMensualytiesReport,deleteAgent}