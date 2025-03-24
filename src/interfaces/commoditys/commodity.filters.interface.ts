import { log } from "console"

export interface CommodityFiltersInterface {
    name: string
    size: string,
    status: string
    agent_id: string,
        length?: string,
        startIndex?: string,
        endIndex?: string,
        previousPageIndex?:string,
        pageSize?:string,
    offset: string
}


export class CommodityFilters {




    constructor(){

    }

    createFilters(query:any){


    
        let filters:CommodityFiltersInterface = {
            name: "",
            size: "",
            status: "",
            agent_id: "",
            offset: ''

        }

        
    
        
        switch (query.name) {
            case '':
                filters.name = ``
                break;
            default:
                filters.name = `AND m.nombre = '${query.name}'`
                break;
        }
    
        switch (query.size) {
            case '':
                filters.size = ``

                break;
            default:
                filters.size = `AND m.talla = '${query.size}'`
                break;
        }
    
        switch (query.status) {
            case 'true':
                filters.status = `AND m.estatus = 1`
                break;
            case 'false':
                filters.status = `AND m.estatus = 0`
                break;
            default:
                filters.status = ``
                break;
        }

        switch (query.agent_id) {
            case '':
                filters.agent_id = ``
                break;
            default:
                filters.agent_id = `AND a.id = ${query.agent_id}`
                break;
        }

        switch (query.pageSize) {
            case '0':
                filters.offset = ''
                break;
            default:
                query.pageIndex == '0' ? filters.startIndex = '0' : filters.startIndex = (parseInt(query.pageIndex)*parseInt(query.pageSize)).toString()
                filters.endIndex = ( parseInt(filters.startIndex) + parseInt(query.pageSize) ).toString()
                filters.pageSize = query.pageSize

                filters.offset = `LIMIT ${filters.pageSize} OFFSET ${filters.startIndex}`
                break;
        }




    
        return filters
    }


}