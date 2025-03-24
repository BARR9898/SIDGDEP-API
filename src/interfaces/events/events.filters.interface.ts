
export interface EventFiltersInterface {
    start_date: string,
    end_date: string,
    startIndex?: string,
    endIndex?: string,
    pageSize?: string,
    offset: string
}


export class EventsFiltersClass {




    constructor() {

    }

    createFilters(query: any) {



        let filters: EventFiltersInterface = {
            start_date: "",
            end_date: "",
            offset: ""
        }



        switch (query.start_date) {
            case '':
                filters.start_date = ``
                break;
            default:
                filters.start_date = `AND e.start_date >= '${query.start_date}'`
                break;
        }

        switch (query.end_date) {
            case '':
                filters.end_date = ``
                break;
            default:
                filters.end_date = `AND e.end_date <= '${query.end_date}'`
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