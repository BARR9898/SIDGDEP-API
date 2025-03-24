
export interface EventsPaymentsFiltersInterface {
    start_date: string,
    end_date: string,
    user:string
    offset: string
    startIndex:string,
    pageSize:string,
    endIndex:string
}


export class EventsPaymentsFiltersClass {




    constructor() {

    }

    createFilters(query: any) {



        let filters: EventsPaymentsFiltersInterface = {
            start_date: "",
            end_date: "",
            user: "",
            offset: "",
            startIndex: "",
            pageSize: "",
            endIndex: ""
        }



        switch (query.start_date) {
            case '':
                filters.start_date = ``
                break;
            default:
                filters.start_date = `AND ep.fecha >= '${query.start_date}'`
                break;
        }

        switch (query.end_date) {
            case '':
                filters.end_date = ``
                break;
            default:
                filters.end_date = `AND ep.fecha <= '${query.end_date}'`
                break;
        }

        switch (query.user) {
            case '0':
                filters.user = ``
                break;
            default:
                filters.user = `AND u.id = ${query.user}`
                break;
        }

        switch (query.pageSize) {
            case '0':
                filters.offset = ''
                break;
            default:
                query.pageIndex == '0' ? filters.startIndex = '0' : filters.startIndex = (parseInt(query.pageIndex) * parseInt(query.pageSize)).toString()
                filters.endIndex = (parseInt(filters.startIndex) + parseInt(query.pageSize)).toString()
                filters.pageSize = query.pageSize

                filters.offset = `LIMIT ${filters.pageSize} OFFSET ${filters.startIndex}`
                break;
        }







        return filters
    }


}