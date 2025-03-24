export interface AccountsPayableFilters {
    start_date:string,
    end_date:string,
    supplier:string,
    status:string
    offset:string,
    endIndex:string,
    pageSize:string,
    startIndex:string
}

export class AccountsPayableClass {

    constructor(){

    }

    createFilters(query:any){
    
        let filters:AccountsPayableFilters = {
            start_date: "",
            end_date: "",
            supplier: "",
            status: "",
            offset: "",
            endIndex: "",
            pageSize: "",
            startIndex: ""
        }
    
        switch (query.start_date) {
            case '':
                break;
            default:
                filters.start_date = `AND cpp.fecha >= '${query.start_date}'`
                break;
        }
    
        switch (query.end_date) {
            case '':
                break;
            default:
                filters.end_date = `AND cpp.fecha <= '${query.end_date}'`
                break;
        }
    
    
        switch (query.supplier) {
            case '0':
                filters.supplier = ``
                break;
            default:
                filters.supplier = `AND cpp.id_proveedor = ${query.supplier}`
                break;
        }


        switch (query.status) {
            case 'true':
                filters.status = `AND cpp.estatus = 1`
                break;
            case 'false':
                filters.status = `AND cpp.estatus = 0`
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
                query.pageIndex == '0' ? filters.startIndex = '0' : filters.startIndex = (parseInt(query.pageIndex)*parseInt(query.pageSize)).toString()
                filters.pageSize = query.pageSize
                filters.offset = `LIMIT ${filters.pageSize} OFFSET ${filters.startIndex}`
                break;
        }        
        return filters
    }


}