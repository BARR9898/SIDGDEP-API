
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
import { Promotions } from "../interfaces/promotions/promotions.interface"
import { PromotionsFiltersInterface } from "../interfaces/promotions/promotions.filters.interface"
const newResClassInstance = new ResClass()

const insertPromotion = async (promotion: Promotions) : Promise<ResponseInterface> =>  {

    let response:ResponseInterface = newResClassInstance.CreateNewResponse(false,[],false,'')
    
    try {
        const {name,status,description,discount,creation_date,discount_percent} = promotion


      
        const [insert_service_result]:any = await pool.query('INSERT INTO promociones (id,nombre,estatus,descuento,fecha_creacion,descripcion,descuento_porcentaje) VALUES (?,?,?,?,?,?,?)',[null,name,status,discount,creation_date,description,discount_percent])
        if (!insert_service_result.insertId) {
            response.error = true
            response.result = false
            response.message = 'Promotion can´t be created'
            return response
        }
        response.error = false
        response.result = true
        response.message = 'Promotion created successfuly'
        return response 
    } catch (error) {
        response.result = false
        response.message = 'An error occurred while trying to insert the promotion'
        response.data = error
        return response 
    }
}

const selectPromotion = async (id:string) : Promise<ResponseInterface> =>  {

    let response:ResponseInterface = newResClassInstance.CreateNewResponse(false,[],false,'')

    try {
        const [select_service_result]:any = await pool.query('SELECT * FROM promociones WHERE id = ?',[id])
        if (select_service_result.length == 0) {
            response.error = false
            response.result = false
            response.message = 'The promotion do not exist'
            return response
        }

        response.error = false
        response.result = true
        response.message = 'Promotion found successfuly'
        response.data = select_service_result
        return response 
    } catch (error) {
        response.result = false
        response.message = 'An error occurred while trying to find the promotion'
        response.data = error
        return response 
    }
}

const selectPromotions = async (filters:PromotionsFiltersInterface) : Promise<ResponseInterface> =>  {
    let response:ResponseInterface = newResClassInstance.CreateNewResponse(false,[],false,'')
    try {
        const [select_services_result]:any = await pool.query(`SELECT * FROM promociones p WHERE id > 0 ${filters.name} ${filters.status} ${filters.offset}`)
        if (select_services_result.length == 0) {
            response.error = false
            response.result = false
            response.message = 'Do not exist promotions'
            return response
        }

        select_services_result.forEach((promotion:any) => {
            promotion.fecha_creacion =  moment(promotion.fecha_creacion).format('YYYY-MM-DD hh:mm:ss')
        })
    
        response.error = false
        response.result = true
        response.message = 'Promotion found'
        response.data = select_services_result
        return response 
    } catch (error) {
        response.result = false
        response.message = 'An error occurred while trying to find the promotions'
        response.data = error
        return response 
    }
}

const updatePromotion = async (promotion: Promotions,id:string) : Promise<ResponseInterface> =>  {

    let response:ResponseInterface = newResClassInstance.CreateNewResponse(false,[],false,'')

    try {
        const {name,status,discount,description,discount_percent} = promotion

        const [update_promotion_result]:any = await pool.query(`UPDATE promociones SET nombre = ?,estatus = ?,descuento = ?,descripcion = ?,descuento_porcentaje = ? WHERE id = ${id}`,[name,status,discount,description,discount_percent])
        if (update_promotion_result.affectedRows == 0) {
            response.error = true
            response.result = false
            response.message = 'Promotion can´t be updated'
            return response
        }
        response.error = false
        response.result = true
        response.message = 'Promotion updated successfuly'
        return response 
    } catch (error) {
        response.result = false
        response.error = true
        response.message = 'An error occurred while trying to update the promotion' + error
        response.data = error
        return response 
    }
}

const deletePromotion = async (id:string) : Promise<ResponseInterface> =>  {

    let response:ResponseInterface = newResClassInstance.CreateNewResponse(false,[],false,'')

    
    try {

        //Delete from agents table
        const [delete_service_result]:any = await pool.query('DELETE FROM promociones WHERE id = ?',[id])        
        if (delete_service_result.affectedRows == 0) {
            response.error = true
            response.result = false
            response.message = 'Pormotion wasent removed'
            return response
        }
        response.error = false
        response.result = true
        response.message = 'Promotion removed successfuly'
        return response 
    } catch (error) {
        response.result = false
        response.message = 'An error occurred while trying to remove the promotion' + error
        response.data = error
        return response 
    }
}


export { insertPromotion,selectPromotion,selectPromotions,updatePromotion,deletePromotion}