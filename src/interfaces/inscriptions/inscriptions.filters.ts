export interface InscriptionsFilters {
    start_date: string
    end_date: string,
    offset: string,
    status: string,
    user: string,
    category: string,
}

export class InscriptionsFiltersClass {

    constructor() {

    }

    createFilters(query: any) {

        let filters: InscriptionsFilters = {
            start_date: "",
            end_date: "",
            offset: "",
            status: "",
            user: '',
            category: ''
        }

        switch (query.start_date) {
            case '':
                break;
            default:
                filters.start_date = `AND uc.fecha_inscripcion >= '${query.start_date}'`
                break;
        }

        switch (query.end_date) {
            case '':
                break;
            default:
                filters.end_date = `AND uc.fecha_inscripcion <= '${query.end_date}'`
                break;
        }

        switch (query.category_id) {
            case '0':
                break;
            default:
                filters.category = `AND uc.categoria_id = '${query.category_id}'`
                break;
        }

        switch (query.user) {
            case '0':
                break;
            default:
                filters.user = `AND uc.usuario_id = '${query.user}'`
                break;
        }

        switch (query.status) {
            case '0':
                filters.status = `AND uc.estatus_de_pago = 0`
                break;
            case '1':
                filters.status = `AND uc.estatus_de_pago = 1`
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