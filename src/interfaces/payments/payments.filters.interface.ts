

export interface PaymentsFiltersInterface {
    name: string
    lastname: string,
    second_lastname: string
    payment_method: string
    start_date: string,
    end_date: string
    pageIndex: string,
    pageSize: string,
    offset: string,
    user: string

}

export class PaymentsFiltersClass {

    constructor() {

    }

    createFilters(query: any) {



        let filters: PaymentsFiltersInterface = {
            name: '',
            lastname: '',
            second_lastname: '',
            payment_method: "",
            start_date: "",
            end_date: "",
            pageIndex: "",
            pageSize: "",
            offset: "",
            user: ""
        }



        switch (query.user) {
            case '0':
                filters.user = ``
                break;
            default:
                filters.user = `AND u.id = ${query.user}`
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



        switch (query.payment_method) {
            case '0':
                filters.payment_method = ``
                break;
            default:
                filters.payment_method = `AND ab.metodo_de_pago = ${query.payment_method}`
                break;
        }




        switch (query.start_date) {
            case '':
                filters.start_date = ``
                break;
            default:
                filters.start_date = `AND ab.fecha >= '${query.start_date}' `
                break;
        }

        switch (query.end_date) {
            case '':
                filters.end_date = ``
                break;
            default:
                filters.end_date = `AND ab.fecha <= '${query.end_date}' `
                break;
        }

        switch (query.pageSize) {
            case '0':
                filters.offset = ''
                break;
            default:
                let startIndex
                query.pageIndex == '0' ? startIndex = 0 : startIndex = (parseInt(query.pageIndex) * parseInt(query.pageSize))
                filters.pageSize = query.pageSize
                filters.offset = `LIMIT ${filters.pageSize} OFFSET ${startIndex}`
                break;
        }


        return filters
    }


}