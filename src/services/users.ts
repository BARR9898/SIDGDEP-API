
import {pool} from "../config/mysql_connection"
import { Res as ResponseInterface, ResClass, Res} from "../interfaces/response/response"
import { Agents } from "../interfaces/agents/agents"
import { AgentsFilters } from "../interfaces/agents/agents.filters"
import { encrypt } from "../utils/bcrypt.handle"
import { UserFilters } from "../interfaces/users/users.filters"
import { Users } from "../interfaces/users/users.interface"
import moment from "moment"
import { log } from "console"
const newResClassInstance = new ResClass()

const insertUser = async (agent: Users) : Promise<ResponseInterface> =>  {

    let response:ResponseInterface = newResClassInstance.CreateNewResponse(false,[],false,'')

    try {
        const {name,lastname,second_lastname,age,phone,status,registration_date,sex,email,birthdate} = agent

        const [select_user]:any = await pool.query('SELECT  id FROM usuarios WHERE correo = ?',[email])        
        if (select_user.length > 0) {
            response.error = true
            response.result = false
            response.message = 'There is already a user with this email'
            response.code = 500
            return response
        }


      
        const [insert_user_result]:any = await pool.query('INSERT INTO usuarios (id,nombre,apellido_paterno,apellido_materno,edad,fecha_registro,estatus,telefono,sexo,correo,fecha_de_nacimiento) VALUES (?,?,?,?,?,?,?,?,?,?,?)',[null,name,lastname,second_lastname,age,registration_date,status,phone,sex,email,birthdate])
        if (!insert_user_result.insertId) {
            response.error = true
            response.result = false
            response.message = 'User can´t be created'
            response.code = 500
            return response
        }
        response.error = false
        response.result = true
        response.code = 200
        response.data = {
            id:insert_user_result.insertId,
            registation_date: moment(registration_date).format('YYYY-MM-DD h:mm:ss')
        }
        response.message = 'User created successfuly'
        return response 
    } catch (error) {
        console.log('error',error);
        
        response.result = false
        response.message = 'An error occurred while trying to insert the user'
        response.data = error
        response.code = 500
        return response 
    }
}

const selectUser = async (id:string) : Promise<ResponseInterface> =>  {

    let response:ResponseInterface = newResClassInstance.CreateNewResponse(false,[],false,'')

    try {
        const [select_user_result]:any = await pool.query('SELECT * FROM usuarios WHERE id = ?',[id])
        if (select_user_result.length == 0) {
            response.error = false
            response.result = false
            response.message = 'The user do not exist'
            return response
        }

        select_user_result[0].fecha_registro = moment( select_user_result[0].fecha_registro).format('YYYY-MM-DD h:mm:ss')
        response.error = false
        response.result = true
        response.message = 'User found successfuly'
        response.data = select_user_result
        return response 
    } catch (error) {
        response.result = false
        response.message = 'An error occurred while trying to find the user'
        response.data = error
        return response 
    }
}

const selectUsers = async (filters:UserFilters) : Promise<ResponseInterface> =>  {

    let response:ResponseInterface = newResClassInstance.CreateNewResponse(false,[],false,'')

    try {
        const [select_users_result]:any = await pool.query(`SELECT * FROM usuarios u WHERE id > 0 ${filters.name} ${filters.lastname} ${filters.second_lastname} ${filters.status} ORDER BY u.id DESC ${filters.offset}`)
        if (select_users_result.length == 0) {
            response.error = false
            response.result = false
            response.message = 'Do not exist users'
            return response
        }
        response.error = false
        response.result = true
        response.message = 'Users found'
        response.data = select_users_result
        return response 
    } catch (error) {
        response.result = false
        response.message = 'An error occurred while trying to find the users'
        response.data = error
        return response 
    }
}

const updateUser = async (user: Users,id:string) : Promise<ResponseInterface> =>  {

    let response:ResponseInterface = newResClassInstance.CreateNewResponse(false,[],false,'')

    try {
        const {name,lastname,second_lastname,age,phone,status,sex} = user

        const [update_user_result]:any = await pool.query(`UPDATE usuarios SET nombre = ?,apellido_paterno = ?,apellido_materno = ?,estatus = ?,edad = ?, telefono = ?, sexo = ? WHERE id = ${id}`,[name,lastname,second_lastname,status,age,phone,sex])
        if (update_user_result.affectedRows == 0) {
            response.error = true
            response.result = false
            response.message = 'User can´t be updated'
            return response
        }
        response.error = false
        response.result = true
        response.message = 'User updated successfuly'
        return response 
    } catch (error) {
        response.result = true
        response.message = 'An error occurred while trying to update the user'
        response.data = error
        return response 
    }
}

const deleteUser = async (id:string) : Promise<ResponseInterface> =>  {

    let response:ResponseInterface = newResClassInstance.CreateNewResponse(false,[],false,'')

    
    try {

        //Delete from agents table
        const [delete_user_result]:any = await pool.query('DELETE FROM usuarios WHERE id = ?',[id])        
        if (delete_user_result.affectedRows == 0) {
            response.error = true
            response.result = false
            response.message = 'User wasent removed'
            return response
        }
        response.error = false
        response.result = true
        response.message = 'User removed successfuly'
        return response 
    } catch (error) {
        response.result = false
        response.message = 'An error occurred while trying to remove the user' + error
        response.data = error
        return response 
    }
}


export { insertUser,selectUser,selectUsers,updateUser,deleteUser}