
import {pool} from "../config/mysql_connection"
import { Res as ResponseInterface, ResClass, Res} from "../interfaces/response/response"
import { Agents } from "../interfaces/agents/agents"
import { AgentsFilters } from "../interfaces/agents/agents.filters"
import { encrypt } from "../utils/bcrypt.handle"
import { ICompany } from "../interfaces/company/company"
import { decrypt } from "dotenv"
import { env } from "process"

const newResClassInstance = new ResClass()

const insertCompanyData = async (company: ICompany) : Promise<ResponseInterface> =>  {

    let response:ResponseInterface = newResClassInstance.CreateNewResponse(false,[],false,'')

    try {
        const {name,address,email,gmail_key,rfc} = company

        //Encrypt the password and insert into the database
        const [select_company_result]:any = await pool.query('SELECT * FROM empresa')
        if (select_company_result.length > 0) {

            const [update_company_result]:any = await pool.query('UPDATE empresa SET nombre = ? , direccion = ? , rfc = ? , gmail_key = ? ,correo = ?',[name,address,rfc,gmail_key,email])
            
            if (update_company_result.affectedRows == 0) {
                response.error = true
                response.result = false
                response.message = 'Company data was not updated'
                return response
            }
            
            response.error = false
            response.result = true
            response.message = 'Company data updated'
            return response
        }

        const [insert_company_result]:any = await pool.query('INSERT INTO empresa (nombre,direccion,rfc,gmail_key,correo) VALUES (?,?,?,?,?)',[name,address,rfc,gmail_key,email])
        if (!insert_company_result.insertId) {
            response.error = true
            response.result = false
            response.message = 'Company data was not inserted'
            return response
        }
        response.error = false
        response.result = true
        response.message = 'Company data inserted successfuly'
        return response 
    } catch (error) {
        response.result = false
        response.message = 'An error occurred while trying to insert the company data'
        response.data = error
        return response 
    }
}

const selectCompanyData = async () : Promise<ResponseInterface> =>  {

    let response:ResponseInterface = newResClassInstance.CreateNewResponse(false,[],false,'')

    try {

        //Encrypt the password and insert into the database
        const [select_company_result]:any = await pool.query('SELECT * FROM empresa')
        if (select_company_result.length == 0) {
            response.error = true
            response.result = false
            response.message = 'Company not found'
            return response
        }


        response.data = select_company_result
        response.error = false
        response.result = true
        response.message = 'Company data found successfuly'
        return response 
    } catch (error) {
        response.result = false
        response.message = 'An error occurred while trying to found the company data'
        response.data = error
        return response 
    }
}

export { insertCompanyData,selectCompanyData}