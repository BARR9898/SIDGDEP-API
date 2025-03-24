export interface ServiceFilters {
    name: string
    periodicity: string,
    offset: string,

}

export class   ServicesFiltersClass {

    constructor(){

    }

    createFilters(query:any){
    
        let filters:ServiceFilters = {
            name: '',
            periodicity: '',
            offset: ""
        }
    
        switch (query.name) {
            case '':
                break;
            default:
                filters.name = `AND s.nombre = '${query.name}'`
                break;
        }
    
        switch (query.periodicity) {
            case '1':
                filters.periodicity = `AND s.periodicidad = 1`
                break;
            case '2':
                filters.periodicity = `AND s.periodicidad = 2`
                break;
            case '3':
                    filters.periodicity = `AND s.periodicidad = 3`
                break;
            case '4':
                filters.periodicity = `AND s.periodicidad = 4`
                break;
            default:
                filters.periodicity = ``
                break;
        }

        switch (query.pageSize) {
            case '0':
                filters.offset = ''
                break;
            default:
                let startIndex
                query.pageIndex == '0' ? startIndex = 0 : 
                startIndex = (parseInt(query.pageIndex) * parseInt(query.pageSize))
                filters.offset = `LIMIT ${query.pageSize} OFFSET ${startIndex}`
                break;
        }

        return filters
    }


}