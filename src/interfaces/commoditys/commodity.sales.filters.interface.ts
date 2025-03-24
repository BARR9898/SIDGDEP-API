import { log } from "console";
import { param } from "express-validator";
import moment from "moment";

export interface CommoditySalesFiltersInterface{
    start_date:string,
    end_date:string,
    user: string,
    merchancy: string,
    status: string,
    agent:string,
    offset: string
}


export class CommoditySalesFiltersClass {




    constructor(){

    }

    createFilters(query:any){
        
        let filters:CommoditySalesFiltersInterface = {
            user: '',
            merchancy: "",
            status: "",
            agent: "",
            offset: "",
            start_date: "",
            end_date: ""
        }
    
        

        switch (query.start_date) {
            case '':
                filters.start_date = ``
                break;
            default:
                filters.start_date = `AND vm.fecha >= '${query.start_date}'`
                break;
        }

        switch (query.end_date) {
            case '':
                filters.end_date = ``
                break;
            default:
                filters.end_date = `AND vm.fecha <= '${query.end_date}'`
                break;
        }
    
        switch (query.merchancy) {
            case '':
                filters.merchancy = ``
                break;
            default:
                filters.merchancy = `AND vmp.id_mercancia = ${query.merchancy}`
                break;
        }
    
        switch (query.user) {
            case '0':
                filters.user = ``
                break;
            default:
                filters.user = `AND vm.id_usuario = ${query.user}`
                break;
        }

        switch (query.status) {
            case 'true':
                filters.status = `AND vm.estatus = ${query.status}`
                break;
            case 'false':
                filters.status = `AND vm.estatus = ${query.status}`
                break;
            default:
                filters.status = ``
                break;
        }

        switch (query.agent) {
            case '':
                filters.agent = ``
                break;
            default:
                filters.agent = `AND vm.id_agente = ${query.agent}`
                break;
        }

        switch (query.pageSize) {
            case '0':
                filters.offset = ''
                break;
            default:
                let startIndex
                query.pageIndex == '0' ? startIndex = '0' : startIndex = (parseInt(query.pageIndex) * parseInt(query.pageSize)).toString()
                filters.offset = `LIMIT ${query.pageSize} OFFSET ${startIndex}`
                break;
        }        


        return filters
    }


}