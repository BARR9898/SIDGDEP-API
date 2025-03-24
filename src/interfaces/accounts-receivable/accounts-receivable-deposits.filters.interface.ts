export interface AccountsReceivableDepositsFilters {
    start_date:string,
    end_date:string,
    user:string,
    agent:string,
    payment_method:string,
    offset:string,
}

export class AccountsReceivableDepositsFiltersClass {

    constructor(){

    }

    createFilters(query:any){
    
        let filters:AccountsReceivableDepositsFilters = {
            start_date: "",
            end_date: "",
            user: "",
            agent: "",
            payment_method: "",
            offset: ''
        }
    
        switch (query.start_date) {
            case '':
                break;
            default:
                filters.start_date = `AND avm.fecha >= '${query.start_date}'`
                break;
        }
    
        switch (query.end_date) {
            case '':
                break;
            default:
                filters.end_date = `AND avm.fecha <= '${query.end_date}'`
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
                filters.payment_method = `AND avm.metodo_de_pago = ${query.payment_method}`
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