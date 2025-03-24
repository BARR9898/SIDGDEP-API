
import {pool} from "../config/mysql_connection"
import { CategoriesFilters } from "../interfaces/categories/categories.filters"
import { ICategory } from "../interfaces/categories/categories.interface"
import { Res as ResponseInterface, ResClass, Res} from "../interfaces/response/response"
import moment from "moment"
const newResClassInstance = new ResClass()


const selectCategories = async (filters:CategoriesFilters) : Promise<ResponseInterface> =>  {

    let response:ResponseInterface = newResClassInstance.CreateNewResponse(false,[],false,'')

    try {
        const [select_categories_result]:any = await pool.query(`SELECT * FROM categorias c WHERE c.id > 0 ${filters.start_date} ${filters.end_date} ${filters.status} ORDER BY c.id DESC ${filters.offset}`)
        if (select_categories_result.length == 0) {
            response.code = 500
            response.error = true
            response.result = false
            response.message = 'Do not exist categories'
            return response
        }

        select_categories_result.map((category:ICategory) => {
            category.fecha_creacion = moment(category.fecha_creacion).format('YYYY-MM-DD hh:mm:ss')
        })

        response.error = false
        response.code = 200
        response.result = true
        response.message = 'Categories found'
        response.data = select_categories_result
        return response 
    } catch (error) {
        response.code = 500
        response.result = false
        response.message = 'An error occurred while trying to find the categories'
        response.data = error
        return response 
    }
}

const insertCategory = async (category:ICategory) : Promise<ResponseInterface> =>  {

    let response:ResponseInterface = newResClassInstance.CreateNewResponse(false,[],false,'')

    try {

        const {nombre,costo,inscripcion,fecha_creacion,beneficio_academia,beneficio_instructor,estatus} =  category
        const [insert_category_result]:any = await pool.query(`INSERT INTO categorias (id,nombre,costo,inscripcion,beneficio_instructor,beneficio_academia,fecha_creacion,estatus) VALUES (?,?,?,?,?,?,?,?)`,[null,nombre,costo,inscripcion,beneficio_instructor,beneficio_academia,fecha_creacion,estatus])
        if (!insert_category_result.insertId) {
            response.error = true
            response.result = false
            response.code =  500
            response.message = 'Caategory was not inserted'
            return response
        }
        response.error = false
        response.result = true
        response.code =  200
        response.message = 'Category created successfuly'
        response.data = []
        return response 
    } catch (error) {
        response.result = false
        response.code =  500
        response.message = 'An error occurred while trying to insert the category'
        response.data = error
        return response 
    }
}

const updateCategory = async (category:ICategory,category_id:string) : Promise<ResponseInterface> =>  {

    let response:ResponseInterface = newResClassInstance.CreateNewResponse(false,[],false,'')

    try {

        const {nombre,costo,inscripcion,beneficio_academia,beneficio_instructor,estatus} =  category
        const [udpate_category_result]:any = await pool.query(`UPDATE categorias SET nombre = ? ,costo = ? ,inscripcion = ?, beneficio_instructor = ? , beneficio_academia = ? , estatus = ? WHERE id  = ? `,[nombre,costo,inscripcion,beneficio_instructor,beneficio_academia,estatus,category_id])
        
        if (udpate_category_result.affectedRows == 0) {
            response.error = true
            response.result = false
            response.code =  500
            response.message = 'Caategory was not updated'
            return response
        }
        response.error = false
        response.result = true
        response.code =  200
        response.message = 'Category updated successfuly'
        response.data = []
        return response 
    } catch (error) {
        response.result = false
        response.code =  500
        response.message = 'An error occurred while trying to update the category'
        response.data = error
        return response 
    }
}

const deleteCategory = async (category_id:string) : Promise<ResponseInterface> =>  {

    let response:ResponseInterface = newResClassInstance.CreateNewResponse(false,[],false,'')

    try {

        const [delete_category_result]:any = await pool.query(`DELETE FROM categorias WHERE id  = ? `,[category_id])
        
        if (delete_category_result.affectedRows == 0) {
            response.error = true
            response.result = false
            response.code =  500
            response.message = 'Caategory was not deleted'
            return response
        }
        response.error = false
        response.result = true
        response.code =  200
        response.message = 'Category deleted successfuly'
        response.data = []
        return response 
    } catch (error) {
        response.result = false
        response.code =  500
        response.message = 'An error occurred while trying to delete the category'
        response.data = error
        return response 
    }
}

const selectUserCaegoriesInscription = async (user_id:string) : Promise<ResponseInterface> =>  {

    let response:ResponseInterface = newResClassInstance.CreateNewResponse(false,[],false,'')

    try {

        let data = {
            result:false,
            categories: []
        }

        const [select_categories_inscription]:any = await pool.query(`SELECT c.* FROM usuarios_categorias uc INNER JOIN categorias c ON c.id = uc.categoria_id  WHERE usuario_id  = ? `,[user_id])
        
        if (select_categories_inscription.length > 0) {
            data.result = true
            data.categories = select_categories_inscription
        }


        response.error = false
        response.result = true
        response.code =  200
        response.message = 'User´s categories found successfuly'
        response.data = data
        return response 
    } catch (error) {
        response.result = false
        response.code =  500
        response.message = 'An error occurred while trying to get the user´s categories'
        response.data = error
        return response 
    }
}



export { 
    selectCategories,
    insertCategory,
    updateCategory,
    deleteCategory,
    selectUserCaegoriesInscription

}