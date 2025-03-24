
import { log } from "console"
import { pool } from "../config/mysql_connection"
import { CategoriesFilters } from "../interfaces/categories/categories.filters"
import { ICategory } from "../interfaces/categories/categories.interface"
import { InscriptionsFilters } from "../interfaces/inscriptions/inscriptions.filters"
import { IInscription } from "../interfaces/inscriptions/inscriptions.interface"
import { Res as ResponseInterface, ResClass, Res } from "../interfaces/response/response"
import moment from "moment"
const newResClassInstance = new ResClass()


const selectInscriptions = async (filters: InscriptionsFilters): Promise<ResponseInterface> => {
    let response: ResponseInterface = newResClassInstance.CreateNewResponse(false, [], false, '')
    try {
        const [select_inscriptions_result]: any = await pool.query(`SELECT uc.*,u.nombre,u.apellido_paterno,u.apellido_materno, c.nombre as categoria_nombre FROM usuarios_categorias uc INNER JOIN usuarios u ON u.id = uc.usuario_id INNER JOIN categorias c ON c.id = uc.categoria_id WHERE uc.id > 0 ${filters.start_date} ${filters.end_date} ${filters.user} ${filters.category} ${filters.status} ORDER BY uc.id DESC ${filters.offset}`)
        if (select_inscriptions_result.length == 0) {
            response.code = 500
            response.error = true
            response.result = false
            response.message = 'Do not exist inscriptions'
            return response
        }

        select_inscriptions_result.map((inscription: IInscription) => {
            inscription.fecha_inscripcion = moment(inscription.fecha_inscripcion).format('YYYY-MM-DD hh:mm:ss')
        })

        response.error = false
        response.code = 200
        response.result = true
        response.message = 'Inscriptions found'
        response.data = select_inscriptions_result
        return response
    } catch (error) {
        console.log('error - ', error);
        
        response.code = 500
        response.result = false
        response.message = 'An error occurred while trying to find the inscriptions'
        response.data = error
        return response
    }
}

const selectCategoriesAssigned = async (inscription_id: string): Promise<ResponseInterface> => {


    let response: ResponseInterface = newResClassInstance.CreateNewResponse(false, [], false, '')

    try {

        
        const [select_categories_assigned]: any = await pool.query(`SELECT ic.*,c.nombre , c.costo , c.inscripcion FROM inscripciones_categorias ic INNER JOIN  categorias c ON c.id = ic.categoria_id WHERE ic.inscripcion_id = ? `, [inscription_id])
        if (select_categories_assigned.length == 0) {
            response.code = 500
            response.error = true
            response.result = false
            response.message = 'Do not exist categories assigned'
            return response
        }



        response.error = false
        response.code = 200
        response.result = true
        response.message = 'Categories assigned found'
        response.data = select_categories_assigned
        return response
    } catch (error) {
        console.log('error', error);

        response.code = 500
        response.result = false
        response.message = 'An error occurred while trying to find the categories asigned'
        response.data = error
        return response
    }
}

const insertInscriptions = async (inscription: IInscription): Promise<ResponseInterface> => {

    let response: ResponseInterface = newResClassInstance.CreateNewResponse(false, [], false, '')

    try {

        const { fecha_inscripcion, categorias, usuario_id , monto , pagado , estatus_pago } = inscription

        //Evaluate if the user is already registed on some one of the categories
        //If user is registed reutn an message with the categories on that the user is already registed
        const alredyIsRegisted = await userAlreadyRgistedOnCategory(categorias,usuario_id)

        if (alredyIsRegisted.result) {
            response.result = false,
            response.message = 'User alredy registed on someone of the categories'
            response.data = alredyIsRegisted
            response.code = 500
            response.error = true
            return response

        }

        

        
        let error: boolean = false
        
        categorias.map(async (category:any) => {
            try {
                const [insert_inscription_result]: any = await pool.query(`INSERT INTO usuarios_categorias (id,fecha_inscripcion,usuario_id,categoria_id,monto,pagado,estatus_de_pago) VALUES (?,?,?,?,?,?,?)`, [null, fecha_inscripcion, usuario_id,category.id, category.monto ,category.pagado , category.estatus_de_pago])
                if (!insert_inscription_result.insertId) {
                    error = true
                    response.error = true
                    response.result = false
                    response.code = 500
                    response.message = 'Caategory was not inserted'
                }
                
                if (category.pagado > 0) {

                    try {
                        const [insert_inscription_deposit]: any = await pool.query(`INSERT INTO usuarios_categorias_abonos (id,inscripcion_id,monto,metodo_de_pago,fecha) VALUES (?,?,?,?,?)`, [null, insert_inscription_result.insertId,category.pagado,category.metodo_de_pago,moment().format('YYYY-MM-DD hh:mm:ss')])
                        if (!insert_inscription_deposit.insertId) {
                            error = true
                            response.error = true
                            response.result = false
                            response.code = 500
                            response.message = 'Deposit category inscription was not inserted'
                            return response
                        }
                    } catch (error) {
                        console.log('error - ' , error);
                        error = true
                        response.error = true
                        response.result = false
                        response.code = 500
                        response.message = 'An error occurred while trying to inserte the cateogry inscription deposit '
                        return response
                    }
                    

                }

            } catch (error) {

                error = true
                console.log('error', error);

                response.result = false
                response.code = 500
                response.message = 'An error occurred while trying to insert the relation between user and categories'
                response.data = error

            }
        })

        if (!error) {
            response.error = false
            response.result = true
            response.code = 200
            response.message = 'Inscription created successfuly'
            response.data = []
        }
        


        return response

    } catch (error) {
        console.log('error - ',error);
        
        response.result = false
        response.code = 500
        response.message = 'An error occurred while trying to insert the inscription'
        response.data = error
        return response
    }
}

const updateCategory = async (category: ICategory, category_id: string): Promise<ResponseInterface> => {

    let response: ResponseInterface = newResClassInstance.CreateNewResponse(false, [], false, '')

    try {

        const { nombre, costo, inscripcion, beneficio_academia, beneficio_instructor, estatus } = category
        const [udpate_category_result]: any = await pool.query(`UPDATE categorias SET nombre = ? ,costo = ? ,inscripcion = ?, beneficio_instructor = ? , beneficio_academia = ? , estatus = ? WHERE id  = ? `, [nombre, costo, inscripcion, beneficio_instructor, beneficio_academia, estatus, category_id])

        if (udpate_category_result.affectedRows == 0) {
            response.error = true
            response.result = false
            response.code = 500
            response.message = 'Caategory was not updated'
            return response
        }
        response.error = false
        response.result = true
        response.code = 200
        response.message = 'Category updated successfuly'
        response.data = []
        return response
    } catch (error) {
        response.result = false
        response.code = 500
        response.message = 'An error occurred while trying to update the category'
        response.data = error
        return response
    }
}

const deleteInscription = async (inscription_id: string): Promise<ResponseInterface> => {

    let response: ResponseInterface = newResClassInstance.CreateNewResponse(false, [], false, '')

    try {

        const [delete_inscription_result]: any = await pool.query(`DELETE FROM usuarios_categorias WHERE id  = ? `, [inscription_id])

        if (delete_inscription_result.affectedRows == 0) {
            response.error = true
            response.result = false
            response.code = 500
            response.message = 'Inscription was not deleted'
            return response
        }
        response.error = false
        response.result = true
        response.code = 200
        response.message = 'Inscription deleted successfuly'
        response.data = []
        return response
    } catch (error) {
        response.result = false
        response.code = 500
        response.message = 'An error occurred while trying to delete the isncription'
        response.data = error
        return response
    }
}


const updatePayedInscription = async (inscription_id: string,payed:number,payed_status:number): Promise<ResponseInterface> => {

    let response: ResponseInterface = newResClassInstance.CreateNewResponse(false, [], false, '')

    try {

        const [insert_new_deposit]:any =  await pool.query('INSERT usuarios_categorias SET pagado = ? , estatus_de_pago = ?  WHERE id = ?',[payed,payed_status,inscription_id])        

        if (insert_new_deposit.affectedRows == 0) {
            response.error = true
            response.result = false
            response.code = 500
            response.message = 'Inscription deposit was not updated'
            response.data = []

            return response
        }
        

        response.error = false
        response.result = true
        response.code = 200
        response.message = 'Inscription deposit updated successfuly'
        response.data = []


        return response

    } catch (error) {
        console.log('error - ',error);
        
        response.result = false
        response.code = 500
        response.message = 'An error occurred while trying to insert the inscription deposit'
        response.data = error
        return response
    }
}


export {
    selectInscriptions,
    insertInscriptions,
    updateCategory,
    deleteInscription,
    selectCategoriesAssigned,
    updatePayedInscription

}

async function userAlreadyRgistedOnCategory(cateogries: number[],user_id:number) {

    let data = {
        result:false,
        categories:[]
    }

    const [select_categories_result]: any = await pool.query(`SELECT * FROM usuarios_categorias uc INNER JOIN categorias c ON c.id = uc.categoria_id WHERE uc.usuario_id = ? `, [user_id])
    if (select_categories_result.length > 0) {

        select_categories_result.map((registed_category:any) => {

            let alreadyExist:boolean = false

            cateogries.map((new_category:any) => {

                if (new_category.id == registed_category.categoria_id) {
                    
                    alreadyExist = true
    
                }


            })            

            if (alreadyExist) {
                data.result = true
                data.categories.push(registed_category as never)
            }

        })


    }

    return data


}


