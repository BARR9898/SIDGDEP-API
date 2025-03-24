export interface InscriptionsDepositsFilters {
    start_date: string
    end_date: string,
    offset: string,
    payment_method: string,
    user: string,
    category: string,

}

export class InscriptionsDepositsFiltersFiltersClass {

    constructor() {

    }

    createFilters(query: any) {

        let filters: InscriptionsDepositsFilters = {
            start_date: "",
            end_date: "",
            offset: "",
            payment_method: "",
            user: '',
            category: ''
        }

        switch (query.start_date) {
            case '':
                break;
            default:
                filters.start_date = `AND uca.fecha >= '${query.start_date}'`
                break;
        }

        switch (query.end_date) {
            case '':
                break;
            default:
                filters.end_date = `AND uca.fecha <= '${query.end_date}'`
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

        switch (query.payment_method) {
            case '':
                filters.payment_method = ``
                break;
            default:
                filters.payment_method = `AND uca.metodo_de_pago = ${query.payment_method}`
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