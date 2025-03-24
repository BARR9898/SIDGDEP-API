export interface CategoriesFilters {
    start_date: string
    end_date: string,
    offset: string,
    status: string
}

export class CategoriesFiltersClass {

    constructor() {

    }

    createFilters(query: any) {

        let filters: CategoriesFilters = {
            start_date: "",
            end_date: "",
            offset: "",
            status: ""
        }

        switch (query.start_date) {
            case '':
                break;
            default:
                filters.start_date = `AND c.fecha_creacion >= '${query.start_date}'`
                break;
        }

        switch (query.end_date) {
            case '':
                break;
            default:
                filters.end_date = `AND c.fecha_creacion <= '${query.end_date}'`
                break;
        }

        switch (query.status) {
            case 'true':
                filters.status = `AND c.estatus  = ${query.status}`
                break;
            case 'false':
                filters.status = `AND c.estatus  = ${query.status}`
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
                query.pageIndex == '0' ? startIndex = '0' : startIndex = (parseInt(query.pageIndex) * parseInt(query.pageSize)).toString()
                filters.offset = `LIMIT ${query.pageSize} OFFSET ${startIndex}`
                break;
        }




        return filters
    }


}