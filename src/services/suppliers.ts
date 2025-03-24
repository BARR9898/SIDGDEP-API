
import moment from "moment"
import {pool} from "../config/mysql_connection"
import { Res as ResponseInterface, ResClass, Res} from "../interfaces/response/response"
import { SupplierInterface } from "../interfaces/suppliers/supplier"
import { SuppliersFiltersInterface } from "../interfaces/suppliers/suppliers.filters.interface"

const newResClassInstance = new ResClass()

const insertSupplier = async (supplier: SupplierInterface) : Promise<ResponseInterface> =>  {

    let response:ResponseInterface = newResClassInstance.CreateNewResponse(false,[],false,'')

    try {
        const {name,registation_date,status,rfc} = supplier

        const [insert_supplier_result]:any = await pool.query('INSERT INTO proveedores (id,nombre_comercial,rfc,fecha_registro,estatus) VALUES (?,?,?,?,?)',[null,name,rfc,registation_date,status])
        if (!insert_supplier_result.insertId) {
            response.error = true
            response.result = false
            response.message = 'Supplier wasent created'
            return response
        }
        response.error = false
        response.result = true
        response.message = 'Supplier created successfuly'
        return response 
    } catch (error) {
        response.result = false
        response.message = 'An error occurred while trying to insert the supplier'
        response.data = error
        return response 
    }
}


const selectSuppliers = async (filters: SuppliersFiltersInterface) : Promise<ResponseInterface> =>  {

    let response:ResponseInterface = newResClassInstance.CreateNewResponse(false,[],false,'')

    try {

        const [select_suppliers_result]:any = await pool.query(`SELECT * FROM proveedores  p WHERE p.id > 0 ${filters.end_date} ${filters.start_date} ${filters.status} ${filters.supplier} ${filters.offset}`)
        if (select_suppliers_result.length == 0) {
            response.error = false
            response.result = false
            response.message = 'The suppliers was not found'
            return response
        }

        select_suppliers_result.forEach((element:any) => {
            element.fecha_registro = moment(element.fecha_registro).format('YYYY-MM-DD hh:mm:ss')
        })


        response.error = false
        response.result = true
        response.data = select_suppliers_result
        response.message = 'Suppliers found successfuly'
        return response 
    } catch (error) {
        console.log('error' , error);
        
        response.result = false
        response.message = 'An error occurred while trying to search the suppliers'
        response.data = error
        return response 
    }
}

const deleteSupplier = async (id:string) : Promise<ResponseInterface> =>  {

    let response:ResponseInterface = newResClassInstance.CreateNewResponse(false,[],false,'')

    try {

        const [delete_suppliers_result]:any = await pool.query(`DELETE FROM proveedores WHERE id = ${id}`)
        if (delete_suppliers_result.affectedRows == 0) {
            response.error = false
            response.result = false
            response.message = 'The supplier was not deleted'
            return response
        }



        response.error = false
        response.result = true
        response.data = delete_suppliers_result
        response.message = 'Supplier deeted successfuly'
        return response 
    } catch (error) {
        console.log('error' , error);
        response.result = false
        response.message = 'An error occurred while trying to delete the supplier'
        response.data = error
        return response 
    }
}

const updateSupplier = async (supplier_id:string,supplier: SupplierInterface) : Promise<ResponseInterface> =>  {

    let response:ResponseInterface = newResClassInstance.CreateNewResponse(false,[],false,'')

    try {
        const {name,status,rfc} = supplier

        const [insert_supplier_result]:any = await pool.query('UPDATE proveedores SET  nombre_comercial = ?, rfc = ? , estatus = ? WHERE id = ?',[name,rfc,status,supplier_id])
        if (insert_supplier_result.affectedRows == 0) {
            response.error = true
            response.result = false
            response.message = 'Supplier wasent update'
            return response
        }
        response.error = false
        response.result = true
        response.message = 'Supplier updated successfuly'
        return response 
    } catch (error) {
        response.result = false
        response.message = 'An error occurred while trying to update the supplier'
        response.data = error
        return response 
    }
}

export { insertSupplier,selectSuppliers,deleteSupplier,updateSupplier}