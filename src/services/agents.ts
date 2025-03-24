
import {pool} from "../config/mysql_connection"
import { Res as ResponseInterface, ResClass, Res} from "../interfaces/response/response"
import { Agents } from "../interfaces/agents/agents"
import { AgentsFilters } from "../interfaces/agents/agents.filters"
import { encrypt } from "../utils/bcrypt.handle"

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
            response.error = true
            response.result = false
            response.code = 500
            response.message = 'Do not exist agents'
            return response
        }
        response.error = false
        response.result = true
        response.code = 200
        response.message = 'Agents found'
        response.data = select_agents_result
        return response 
    } catch (error) {
        response.result = false
        response.code = 500
        response.message = 'An error occurred while trying to find the agents'
        response.data = error
        return response 
    }
}

const updateAgent = async (agent: Agents,id:string) : Promise<ResponseInterface> =>  {

    let response:ResponseInterface = newResClassInstance.CreateNewResponse(false,[],false,'')

    try {
        const {name,lastname,second_lastname,email,password,rol,status} = agent

        const [update_agent_result]:any = await pool.query(`UPDATE agentes SET nombre = ?,apellido_paterno = ?,apellido_materno = ?,rol = ?,correo = ?,estatus = ? WHERE id = ${id}`,[name,lastname,second_lastname,rol,email,status])
        if (update_agent_result.affectedRows == 0) {
            response.error = true
            response.result = false
            response.message = 'Agent wasent updated'
            return response
        }
        response.error = false
        response.result = true
        response.message = 'Agent updated successfuly'
        return response 
    } catch (error) {
        response.result = true
        response.message = 'An error occurred while trying to update the agent'
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


export { insertAgent,selectAgent,selectAgents,updateAgent,deleteAgent}