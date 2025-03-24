
import { pool } from "../config/mysql_connection"
import { Res as ResponseInterface, ResClass, Res } from "../interfaces/response/response"
import { Agents } from "../interfaces/agents/agents"
import { AgentsFilters } from "../interfaces/agents/agents.filters"
import { encrypt } from "../utils/bcrypt.handle"
import { CommodityInterface } from "../interfaces/commoditys/commodity.interface"
import moment from "moment"
import { log } from "console"
import { CommodityFilters, CommodityFiltersInterface } from "../interfaces/commoditys/commodity.filters.interface"
import { CommoditySaleInterface } from "../interfaces/commoditys/commodity.sale.interface"
import { stat } from "fs"
import { CommoditySalesFiltersInterface } from "../interfaces/commoditys/commodity.sales.filters.interface"

const newResClassInstance = new ResClass()

const insertCommodity = async (commodity: CommodityInterface): Promise<ResponseInterface> => {

    let response: ResponseInterface = newResClassInstance.CreateNewResponse(false, [], false, '')


    try {
        const { name, price, size, amount, status, iva, registation_date, agent_id , category} = commodity


        const [insert_commodity_result]: any = await pool.query('INSERT INTO mercancias (id,nombre,precio,talla,cantidad,iva,id_agente,fecha_registro,estatus,categoria) VALUES (?,?,?,?,?,?,?,?,?,?)', [null, name, price, size, amount, iva, agent_id, registation_date, status,category])

        if (insert_commodity_result.insertId == 0) {
            response.error = false
            response.result = false
            response.message = 'Cant be posible create the commodity'
            return response
        }

        response.error = false
        response.result = true
        response.message = 'Commodity created successfuly'
        return response
    } catch (error) {
        console.log('error', error);
        response.result = false
        response.message = 'An error occurred while trying to insert the commodity'
        response.data = error
        return response
    }
}


const selectCommodity = async (id: string): Promise<ResponseInterface> => {

    let response: ResponseInterface = newResClassInstance.CreateNewResponse(false, [], false, '')

    try {
        const [select_commodity_result]: any = await pool.query('SELECT * FROM mercancias WHERE id = ?', [id])
        if (select_commodity_result.length == 0) {
            response.error = false
            response.result = false
            response.message = 'The commodity do not exist'
            return response
        }
        response.error = false
        response.result = true
        response.message = 'Commodity found successfuly'
        response.data = select_commodity_result
        return response
    } catch (error) {
        response.result = false
        response.message = 'An error occurred while trying to find the commodity'
        response.data = error
        return response
    }
}

const selectCommoditys = async (filters: CommodityFiltersInterface): Promise<ResponseInterface> => {

    let response: ResponseInterface = newResClassInstance.CreateNewResponse(false, [], false, '')

    try {


        const [select_commoditys_result]: any = await pool.query(`SELECT m.*,a.nombre as agente_nombre, a.apellido_paterno as agente_apellido_paterno, a.apellido_materno as agente_apellido_materno FROM mercancias m  INNER JOIN agentes a ON m.id_agente = a.id  WHERE m.id > 0  ${filters.name} ${filters.size} ${filters.agent_id} ${filters.status} ORDER BY m.id DESC ${filters.offset} `)
        if (select_commoditys_result.length == 0) {
            response.error = false
            response.result = false
            response.message = 'Do not exist commoditys'
            return response
        }


        select_commoditys_result.forEach((element: any) => {

            switch (element.talla) {

                case 'XS':
                    element.talla = 'Extra chica'
                    break;
                case 'S':
                    element.talla = 'Chica'
                    break;
                case 'M':
                    element.talla = 'Mediana'
                    break;
                case 'L':
                    element.talla = 'Grande'
                    break;
                case 'XL':
                    element.talla = 'Extra garande'
                    break;
                default:
                    element.talla = 'Sin talla'
                    break;


            }
        });

        response.error = false
        response.result = true
        response.message = 'Commoditys found'
        response.data = select_commoditys_result
        return response
    } catch (error) {
        console.error('error', error);
        response.result = false
        response.message = 'An error occurred while trying to find the comoditys'
        response.data = error
        return response
    }
}

const updateCommodity = async (commodity: CommodityInterface, id: string): Promise<ResponseInterface> => {

    let response: ResponseInterface = newResClassInstance.CreateNewResponse(false, [], false, '')

    try {
        const { name, size, price, amount, status, iva } = commodity


        const [update_commodity_result]: any = await pool.query(`UPDATE mercancias SET nombre = ?,precio = ?,talla = ?,cantidad = ?,estatus = ?,iva = ? WHERE id = ?`, [name, price, size, amount, status , iva , id])
        if (update_commodity_result.affectedRows == 0) {
            response.error = true
            response.result = false
            response.message = 'Commodity wasent updated'
            return response
        }
        response.error = false
        response.result = true
        response.message = 'Commodity updated successfuly'
        return response
    } catch (error) {
        response.result = false
        console.log('error', error);

        response.message = 'An error occurred while trying to update the commodity'
        response.data = error
        return response
    }
}

const deleteCommodity = async (id: string): Promise<ResponseInterface> => {

    let response: ResponseInterface = newResClassInstance.CreateNewResponse(false, [], false, '')

    try {

        //Delete from agents table
        const [delete_commodity_result]: any = await pool.query('DELETE FROM mercancias WHERE id = ?', [id])
        if (delete_commodity_result.affectedRows == 0) {
            response.error = true
            response.result = false
            response.message = 'Commodity wasent removed'
            return response
        }
        response.error = false
        response.result = true
        response.message = 'Commodity removed successfuly'
        return response
    } catch (error) {
        response.result = false
        response.message = 'An error occurred while trying to remove the commodity'
        response.data = error
        return response
    }
}


export { 
    insertCommodity, 
    selectCommodity, 
    selectCommoditys, 
    updateCommodity, 
    deleteCommodity
}