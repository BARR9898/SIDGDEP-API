export interface AgentsFilters {
    name: string
    lastname: string,
    second_lastname: string
    status: string
}

export class Agents {

    constructor(){

    }

    createFilters(query:any){
    
        let filters:AgentsFilters = {
            name:'',
            lastname: '',
            second_lastname: '',
            status: ''
        }
    
        switch (query.name) {
            case '':
                break;
            default:
                filters.name = `AND a.nombre = '${query.name}'`
                break;
        }
    
        switch (query.lastname) {
            case '':
                break;
            default:
                filters.lastname = `AND a.apellido_paterno = '${query.lastname}'`
                break;
        }
    
        switch (query.second_lastname) {
            case '':
                break;
            default:
                filters.second_lastname = `AND a.apellido_materno = '${query.second_lastname}'`
                break;
        }
    
        switch (query.status) {
            case 'true':
                filters.status = `AND a.estatus = 1`
                break;
            case 'false':
                filters.status = `AND a.estatus = 0`
                break;
            default:
                filters.status = ``
                break;
        }
        return filters
    }


}