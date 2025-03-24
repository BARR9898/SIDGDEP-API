export interface PromotionsFiltersInterface {
    name: string
    status: string,
    offset:string,
    pageSize:string
}

export class   PromotionsFiltersClass {

    constructor(){

    }

    createFilters(query:any){
    
        let filters:PromotionsFiltersInterface = {
            name:'',
            status: '',
            offset: '',
            pageSize: ''
        }
    
        switch (query.name) {
            case '':
                break;
            default:
                filters.name = `AND p.nombre = '${query.name}'`
                break;
        }
    
    
        switch (query.status) {
            case 'true':
                filters.status = `AND p.estatus = 1`
                break;
            case 'false':
                filters.status = `AND p.estatus = 0`
                break;
            default:
                filters.status = ``
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