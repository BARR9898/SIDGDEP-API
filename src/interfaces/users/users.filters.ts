export interface UserFilters {
    name: string
    lastname: string,
    second_lastname: string
    status: string,
    offset: string,

}

export class   UserFiltersClass {

    constructor(){

    }

    createFilters(query:any){
    
        let filters:UserFilters = {
            name: '',
            lastname: '',
            second_lastname: '',
            status: '',
            offset: ""
        }
    
        switch (query.name) {
            case '':
                break;
            default:
                filters.name = `AND u.nombre = '${query.name}'`
                break;
        }
    
        switch (query.lastname) {
            case '':
                break;
            default:
                filters.lastname = `AND u.apellido_paterno = '${query.lastname}'`
                break;
        }
    
        switch (query.second_lastname) {
            case '':
                break;
            default:
                filters.second_lastname = `AND u.apellido_materno = '${query.second_lastname}'`
                break;
        }
    
        switch (query.status) {
            case 'true':
                filters.status = `AND u.estatus = 1`
                break;
            case 'false':
                filters.status = `AND u.estatus = 0`
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
                query.pageIndex == '0' ? 
                    startIndex = '0' : 
                    startIndex = (parseInt(query.pageIndex) * parseInt(query.pageSize)).toString()
                filters.offset = `LIMIT ${query.pageSize} OFFSET ${startIndex}`
                break;
        }

        
        return filters
    }


}