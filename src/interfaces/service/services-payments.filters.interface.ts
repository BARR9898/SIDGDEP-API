export interface ServicesPaymentsFilters {
    start_date: string
    end_date: string,
    status: string,
    offset: string

}

export class ServicesPaymentsFiltersClass {

    constructor() {

    }

    createFilters(query: any) {

        let filters: ServicesPaymentsFilters = {
            start_date: "",
            end_date: "",
            status: "",
            offset: ""
        }

        switch (query.start_date) {
            case '':
                filters.start_date = ``
                break;
            default:
                filters.start_date = `AND p.fecha_pago >= '${query.start_date}'`
                break;
        }

        switch (query.end_date) {
            case '':
                filters.end_date = ``
                break;
            default:
                filters.end_date = `AND p.fecha_pago <= '${query.end_date}'`
                break;
        }

        switch (query.status) {
            case '':
                filters.status = ``
                break;
            default:
                filters.status = `AND s.estatus = ${query.status}`
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