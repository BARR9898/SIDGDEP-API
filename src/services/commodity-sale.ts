
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

const insertSaleCommodity = async (commodity: CommoditySaleInterface): Promise<ResponseInterface> => {

    let response: ResponseInterface = newResClassInstance.CreateNewResponse(false, [], false, '')

    try {
        const { user, products, total, subtotal, agent, date, iva, status, payment_method, payed } = commodity



        const [insert_sale_commodity_result]: any = await pool.query('INSERT INTO ventas_mercancia (id,total,subtotal,iva,estatus,id_agente,id_usuario,fecha,metodo_pago) VALUES (?,?,?,?,?,?,?,?,?)', [null, total, subtotal, iva, status, agent, user, date, payment_method])

        if (insert_sale_commodity_result.insertId == 0) {
            response.error = false
            response.result = false
            response.message = 'Can´t be posible create the commodity sale'
            return response
        }

        const id_sale = insert_sale_commodity_result.insertId


        products.forEach(async (product: any) => {

            let [select_ammount_available]: any = await pool.query('SELECT cantidad FROM mercancias WHERE id = ?', [product.id])

            if (product.ammount > select_ammount_available[0].cantidad) {
                response.error = true
                response.data = select_ammount_available
                response.message = 'Do not exist enouhg merch to sell'
                response.result = false
            }

            let new_ammount_available = (select_ammount_available[0].cantidad - product.ammount)
            let [update_ammount_available]: any = await pool.query('UPDATE mercancias SET cantidad  = ?  WHERE id = ?', [new_ammount_available, product.id])

            if (update_ammount_available.affectedRows == 0) {
                response.error = true
                response.data = []
                response.message = 'Cant be possible update the available ammount'
                response.result = false
            }



            let [insert_sale_commodity_products_result]: any = await pool.query('INSERT INTO ventas_mercancias_productos (id,id_mercancia,cantidad,id_venta) VALUES (?,?,?,?)', [null, product.id, product.ammount, id_sale])

            if (insert_sale_commodity_products_result.insertId == 0) {
                response.error = false
                response.result = false
                response.message = 'Can´t be posible create the commodity sale on ventas_mercancias_productos'
                return response
            }


        })

        if (payed > 0) {

            let [result_insert_payment_counts_to_pay]: any = await pool.query('INSERT INTO abonos_ventas_mercancia (id,id_venta,cantidad,metodo_de_pago,id_agente,fecha) VALUES (?,?,?,?,?,?)', [null, id_sale, commodity.payed, commodity.payment_method, commodity.agent, moment().format('YYYY-MM-DD hh:mm:ss')])

            if (result_insert_payment_counts_to_pay.insertId == 0) {

                response.message == 'ERROR - WAS NOT POSSIBLE INSERT THE PAYMENT ON ACCOUNTS TO PAY'
                response.error = true
                response.result = false
                response.data = []
            }


        }




        response.error = false
        response.result = true
        response.message = 'Commodity sale created successfuly'
        return response
    } catch (error) {
        console.log('error', error);
        response.result = false
        response.message = 'An error occurred while trying to insert the commodity sale'
        response.data = error
        return response
    }
}

const selectSalesCommoditys = async (filters: CommoditySalesFiltersInterface): Promise<ResponseInterface> => {

    let response: ResponseInterface = newResClassInstance.CreateNewResponse(false, [], false, '')

    try {


        const [select_commoditys_sales_result]: any = await pool.query(`SELECT DISTINCT vm.*,a.nombre as agente_nombre, a.apellido_paterno as agente_apellido_paterno, a.apellido_materno as agente_apellido_materno,u.nombre as usuario_nombre, u.apellido_paterno as usuario_apellido_paterno, u.apellido_materno as usuario_apellido_materno FROM ventas_mercancia vm  INNER JOIN agentes a ON vm.id_agente = a.id INNER JOIN usuarios u ON u.id = vm.id_usuario INNER JOIN ventas_mercancias_productos vmp ON vmp.id_venta = vm.id  WHERE vm.id > 0  ${filters.agent}  ${filters.start_date} ${filters.end_date} ${filters.merchancy} ${filters.status} ${filters.user} ORDER BY vm.id DESC ${filters.offset}  `)
        if (select_commoditys_sales_result.length == 0) {
            response.error = false
            response.result = false
            response.message = 'Do not exist sales commodity'
            return response
        }


        select_commoditys_sales_result.forEach((element: any) => {
            element.fecha = moment(element.fecha).format('YYYY-MM-DD hh:mm:ss')
            switch (element.metodo_pago) {
                case 1:
                    element.metodo_pago = 'Efectivo'
                    break;
                case 2:
                    element.metodo_pago = 'Transferencia'
                    break;
                case 3:
                    element.metodo_pago = 'Tarjeta'
                    break;

                default:
                    break;
            }
        })


        response.error = false
        response.result = true
        response.message = 'Slaes Commodity found'
        response.data = select_commoditys_sales_result
        return response


    } catch (error) {
        console.error('error', error);
        response.result = false
        response.message = 'An error occurred while trying to find the sales comoditys'
        response.data = error
        return response
    }
}

const selectComoditySaleProducts = async (id: string): Promise<ResponseInterface> => {

    let response: ResponseInterface = newResClassInstance.CreateNewResponse(false, [], false, '')

    try {


        const [select_commoditys_sale_result]: any = await pool.query(`SELECT vmp.cantidad,vmp.id_mercancia,m.nombre,m.talla,m.precio from ventas_mercancias_productos vmp  INNER JOIN mercancias m ON m.id = vmp.id_mercancia WHERE vmp.id_venta = ${id}`)
        if (select_commoditys_sale_result.length == 0) {
            response.error = false
            response.result = false
            response.message = 'Do not exist the comodity sale products'
            return response
        }


        select_commoditys_sale_result.forEach((element: any) => {

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
                    element.talla = 'Otra'
                    break;


            }

            switch (element.metodo_de_pago) {

                case 1:
                    element.metodo_de_pago = 'Efectivo'
                    break;
                case 2:
                    element.metodo_de_pago = 'Transferencia'
                    break;
                case 3:
                    element.metodo_de_pago = 'Tarjeta'
                    break;


            }


        });


        response.error = false
        response.result = true
        response.message = 'Commodity sale´s products found'
        response.data = select_commoditys_sale_result
        return response

    } catch (error) {
        console.error('error', error);
        response.result = false
        response.message = 'An error occurred while trying to find the commodity sale products'
        response.data = error
        return response
    }
}

const deleteCommoditySale = async (id: string): Promise<ResponseInterface> => {

    let response: ResponseInterface = newResClassInstance.CreateNewResponse(false, [], false, '')

    try {
        
        //Delete from agents table
        const [delete_commodit_sale_result]: any = await pool.query('DELETE FROM ventas_mercancia WHERE id = ?', [id])
        if (delete_commodit_sale_result.affectedRows == 0) {
            response.error = true
            response.result = false
            response.message = 'Commodity sale wasent removed'
            return response
        }
        response.error = false
        response.result = true
        response.message = 'Commodity sale removed successfuly'
        return response
    } catch (error) {
        console.log('error', error);
        response.result = false
        response.message = 'An error occurred while trying to remove the commodity sale'
        response.data = error
        return response
    }
}

const selectCommoditySaleDeposits = async (sale_id: string): Promise<ResponseInterface> => {

    let response: ResponseInterface = newResClassInstance.CreateNewResponse(false, [], false, '')

    try {


        const [select_commodity_sale_deposits_result]: any = await pool.query(`SELECT * FROM abonos_ventas_mercancia WHERE id_venta = ?`, [sale_id])
        if (select_commodity_sale_deposits_result.length == 0) {
            response.error = false
            response.result = false
            response.message = 'Do not exist deposits'
            return response
        }


        select_commodity_sale_deposits_result.forEach((element: any) => {

            switch (element.metodo_de_pago) {

                case 1:
                    element.metodo_de_pago = 'Efectivo'
                    break;
                case 2:
                    element.metodo_de_pago = 'Tarjeta'
                    break;
                default:
                    element.metodo_de_pago = 'Transferencia'
                    break;


            }

            element.fecha = moment(element.fecha).format('YYYY-MM-DD hh:mm:ss')
        });

        response.error = false
        response.result = true
        response.message = 'Commodity sale deposits found'
        response.data = select_commodity_sale_deposits_result
        return response
    } catch (error) {
        console.error('error', error);
        response.result = false
        response.message = 'An error occurred while trying to find the commodity sale deposits'
        response.data = error
        return response
    }
}

const selectCommoditySale = async (id: string): Promise<ResponseInterface> => {

    let response: ResponseInterface = newResClassInstance.CreateNewResponse(false, [], false, '')

    try {

        const [select_commodit_sale_result]: any = await pool.query('SELECT vm.*,u.nombre as usuario_nombre, u.apellido_paterno as usuario_apellido_paterno, u.apellido_materno as usuario_apellido_materno  FROM ventas_mercancia vm INNER JOIN usuarios u ON vm.id_usuario = u.id INNER JOIN agentes a ON a.id = vm.id_agente WHERE vm.id = ?', [id])
        if (select_commodit_sale_result.affectedRows == 0) {
            response.error = true
            response.result = false
            response.message = 'Commodity sale was not found'
            return response
        }

        select_commodit_sale_result.map((sale:any) => {
            sale.fecha = moment(sale.fecha).format('YYYY-MM-DD hh:mm:ss')
            switch (sale.metodo_pago) {
                case 1:
                    sale.metodo_pago = 'Efectivo'
                    break;
                case 2:
                    sale.metodo_pago = 'Transferencia'
                    break;
                case 3:
                    sale.metodo_pago = 'Tarjeta'
                    break;
                default:
                    break;
            }
        })

        response.error = false
        response.result = true
        response.data = select_commodit_sale_result
        response.message = 'Commodity sale found successfuly'
        return response
    } catch (error) {
        console.log('error', error);
        response.result = false
        response.message = 'An error occurred while trying to find the commodity sale'
        response.data = error
        return response
    }
}


export { 
     insertSaleCommodity, 
    selectSalesCommoditys, 
    selectComoditySaleProducts, 
    deleteCommoditySale ,
    selectCommoditySaleDeposits,
    selectCommoditySale
}