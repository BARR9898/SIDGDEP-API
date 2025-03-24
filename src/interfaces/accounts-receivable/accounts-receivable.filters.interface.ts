export interface AccountsReceivableFilters {
    start_date:string,
    end_date:string,
    user:string,
    agent:string,
    payment_method:string,
    offset:string,
    endIndex:string,
    pageSize:string,
    startIndex:string
}

export class AccountsReceivableFiltersClass {

    constructor(){

    }

    createFilters(query:any){
    
        let filters:AccountsReceivableFilters = {
            start_date: "",
            end_date: "",
            user: "",
            agent: "",
            payment_method: "",
            offset: '',
            endIndex:'',
            pageSize:'',
            startIndex:''
        }
    
        switch (query.start_date) {
            case '':
                break;
            default:
                filters.start_date = `AND vm.fecha >= '${query.start_date}'`
                break;
        }
    
        switch (query.end_date) {
            case '':
                break;
            default:
                filters.end_date = `AND vm.fecha <= '${query.end_date}'`
                break;
        }
    
        switch (query.user) {
            case '0':
                break;
            default:
                filters.user = `AND u.id = '${query.user}'`
                break;
        }
    
        switch (query.agent) {
            case '0':
                filters.agent = ``
                break;
            default:
                filters.agent = `AND a.id = ${query.agent}`
                break;
        }


        switch (query.payment_method) {
            case '0':
                filters.payment_method = ``
                break;
            default:
                filters.payment_method = `AND vm.metodo_pago = ${query.payment_method}`
                break;
        }
        
        switch (query.pageSize) {
            case '0':
                filters.offset = ''
                break;
            default:
                query.pageIndex == '0' ? filters.startIndex = '0' : filters.startIndex = (parseInt(query.pageIndex)*parseInt(query.pageSize)).toString()
                filters.pageSize = query.pageSize
                filters.offset = `LIMIT ${filters.pageSize} OFFSET ${filters.startIndex}`
                break;
        }
        
        return filters
    }


}