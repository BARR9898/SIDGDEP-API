
import { log } from "console"
import { pool } from "../config/mysql_connection"
import { CategoriesFilters } from "../interfaces/categories/categories.filters"
import { ICategory } from "../interfaces/categories/categories.interface"
import { InscriptionsFilters } from "../interfaces/inscriptions/inscriptions.filters"
import { IInscription } from "../interfaces/inscriptions/inscriptions.interface"
import { Res as ResponseInterface, ResClass, Res } from "../interfaces/response/response"
import moment from "moment"
import { body } from "express-validator"
import { InscriptionsDepositsFilters } from "../interfaces/inscriptions-deposits/inscriptions-deposits.filters.interface"
const newResClassInstance = new ResClass()


const selectInscriptionDeposits = async (filters: InscriptionsDepositsFilters): Promise<ResponseInterface> => {

    let response: ResponseInterface = newResClassInstance.CreateNewResponse(false, [], false, '')

    try {

        const [select_inscriptions_result]: any = await pool.query(`SELECT uca.*,u.nombre,u.apellido_paterno,u.apellido_materno, c.nombre as categoria_nombre FROM usuarios_categorias_abonos uca INNER JOIN usuarios_categorias uc ON uc.id = uca.inscripcion_id INNER JOIN usuarios u ON u.id = uc.usuario_id INNER JOIN categorias c ON c.id = uc.categoria_id WHERE uca.id > 0 ${filters.start_date} ${filters.end_date} ${filters.user} ${filters.payment_method} ORDER BY uca.id DESC  ${filters.offset}`)

        if (select_inscriptions_result.length == 0) {
            response.code = 500
            response.error = true
            response.result = false
            response.message = 'Do not exist inscriptions'
            return response
        }

        select_inscriptions_result.map((deposit: any) => {
            deposit.fecha = moment(deposit.fecha).format('YYYY-MM-DD hh:mm:ss')
            switch (deposit.metodo_de_pago) {
                case 1:
                    deposit.metodo_de_pago = 'Efectivo'

                    break;
                case 2:
                    deposit.metodo_de_pago = 'Transferencia'

                    break;

                default:
                    deposit.metodo_de_pago = 'Tarjeta'

                    break;
            }
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

const deletInscriptionDeposit = async ( deposit_id : string ): Promise<ResponseInterface> => {

    let response: ResponseInterface = newResClassInstance.CreateNewResponse(false, [], false, '')

    try {

        const [delete_inscription_deposit]: any = await pool.query(`DELETE FROM usuarios_categorias_abonos WHERE id  = ?` , [deposit_id])

        if (delete_inscription_deposit.affectedRows == 0) {
            response.code = 500
            response.error = true
            response.result = false
            response.message = 'Deposit was not remove'
            return response
        }

        response.error = false
        response.code = 200
        response.result = true
        response.message = 'Deposit remove successfuly'
        return response
    } catch (error) {
        console.log('error - ', error);
        response.code = 500
        response.result = false
        response.message = 'An error occurred while trying to remove the inscriptions'
        response.data = error
        return response
    }
}

const updatePayedInscription = async (inscription_id: string,deposit:any): Promise<ResponseInterface> => {

    let response: ResponseInterface = newResClassInstance.CreateNewResponse(false, [], false, '')

    try {

        const {payed,amount,payed_status,payment_method} = deposit
        const [update_payed_inscription]:any =  await pool.query('UPDATE usuarios_categorias SET pagado = ? , estatus_de_pago = ?  WHERE id = ?',[payed,payed_status,inscription_id])
                

        if (update_payed_inscription.affectedRows == 0) {
            response.error = true
            response.result = false
            response.code = 500
            response.message = 'Inscription deposit was not updated'
            response.data = []

            return response
        }
        
        const [insert_new_deposit]:any =  await pool.query('INSERT INTO usuarios_categorias_abonos (id,inscripcion_id,monto,metodo_de_pago,fecha) VALUES (?,?,?,?,?)' , [null,inscription_id,amount,payment_method,moment().format('YYYY-MM-DD hh:mm:ss')])
        

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
    selectInscriptionDeposits,
    deletInscriptionDeposit,
    updatePayedInscription
}


