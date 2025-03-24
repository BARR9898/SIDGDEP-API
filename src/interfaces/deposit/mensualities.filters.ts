export interface MensualitiesFilters {
    name: string
    lastname: string,
    second_lastname: string
    status: string
}

export class   MensualitiesFiltersClass {

    constructor(){

    }

    createFilters(query:any){
    
        let filters:MensualitiesFilters = {
            name:'',
            lastname: '',
            second_lastname: '',
            status: ''
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

        
        return filters
    }


}