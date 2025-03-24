
export interface SuppliersFiltersInterface {
    supplier: string
    start_date: string,
    end_date:string,
    status:string,
    startIndex?: string,
    endIndex?: string,
    previousPageIndex?:string,
    pageSize?:string,
    offset: string

}

export class   SuppliersFiltersClass {

    constructor(){

    }

    createFilters(query:any){

        
    
        let filters:SuppliersFiltersInterface = {
            supplier: "",
            start_date: "",
            end_date: "",
            status: "",
            offset: ""
        }
    
        switch (query.supplier) {
            case '0':
                filters.supplier = ``
                break;
            default:
                filters.supplier = `AND p.id = '${query.supplier}'`
                break;
        }
    

        switch (query.start_date) {
            case '':
                filters.start_date = ``
                break;
            default:
                filters.start_date = `AND p.fecha_registro >= '${query.start_date}' `
                break;
        }

        switch (query.end_date) {
            case '':
                filters.end_date = ``
                break;
            default:
                filters.end_date = `AND p.fecha_registro <= '${query.end_date}' `
                break;
        }

        switch (query.status) {
            case 'true':
                filters.status = `AND p.estatus = 1 ` 
                break;
            case 'false':
                filters.status = `AND p.estatus = 0 `
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
                filters.endIndex = ( parseInt(filters.startIndex) + parseInt(query.pageSize) ).toString()
                filters.pageSize = query.pageSize

                filters.offset = `LIMIT ${filters.pageSize} OFFSET ${filters.startIndex}`
                break;
        }
        
        return filters
    }


}