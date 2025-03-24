import { log } from "console"
import moment from "moment"

export interface MensualitiesFilters {
    user:string,
    start_date:string,
    end_date:string | any,
    payment_status:string,
    agent:string,
    promotion_id:string,
    payment_date:string,
    pageIndex:string,
    pageSize: string,
    offset: string,
}

export class   MensualitiesFiltersClass {

    constructor(){

    }

    createFilters(query:any){

        
    
        let filters:MensualitiesFilters = {
            user:"",
            start_date: "",
            end_date: "",
            payment_status: "",
            agent: "",
            promotion_id: '',
            payment_date: "",
            pageIndex: '',
            pageSize: '',
            offset: ""
        }


        switch (query.user) {
            case '0':
                break;
            default:
                filters.user = `AND u.id = '${query.user}'`
                break;
        }

        switch (query.agent) {

            case '0':
                filters.agent = ``
                break;
            default:
                filters.agent = `AND m.agente_id = '${query.agent}'`
                break;
        }
    
        switch (query.payment_status) {
            case 'true':
                filters.payment_status = `AND m.estatus = 1`
                break;
            case 'false':
                filters.payment_status = `AND m.estatus = 0`
                break;
            default:
                filters.payment_status = ``
                break;
        }
        
        switch (query.start_date) {
            case '':
                filters.start_date = ``
                break;
            default:
                filters.start_date = `AND m.fecha_inicio >= '${query.start_date}' AND m.fecha_inicio <= '${moment(query.start_date).format('YYYY-MM-DD 23:59:59')}' `
                break;
        }

        switch (query.end_date) {
            case '':
                filters.end_date = ``
                break;
            default:
                filters.end_date = `AND m.fecha_fin >= '${moment(query.end_date).format('YYYY-MM-DD 00:00:00')}' AND m.fecha_fin <= '${query.end_date}' `
                break;
        }

        switch (query.promotion_id) {
            case '0':
                filters.promotion_id = ``
                break;
            default:
                filters.promotion_id = `AND m.promocion_id = ${query.promotion_id} `
                break;
        }

        switch (query.pageSize) {
            case '0':
                filters.offset = ''
                break;
            default:
                let startIndex
                query.pageIndex == '0' ? startIndex = 0 : startIndex = (parseInt(query.pageIndex)*parseInt(query.pageSize))
                filters.pageSize = query.pageSize
                filters.offset = `LIMIT ${filters.pageSize} OFFSET ${startIndex}`
                break;
        }
        
        return filters
    }


}