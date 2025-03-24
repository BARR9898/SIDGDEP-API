export interface AgentsSalariesPaymentsFilters {
    agent: string
    start_date: string
    end_date: string,
    payment_method:string

}

export class AgentsSalariesPaymentsFiltersClass {

    constructor(){

    }

    createFilters(query:any){
    
        let filters:AgentsSalariesPaymentsFilters = {
            agent: "",
            start_date: "",
            end_date: "",
            payment_method: ""
        }
    
        switch (query.agent) {
            case '0':
                filters.agent = ``
                break;
            default:
                filters.agent = `AND asp.agente_id = '${query.agent}'`
                break;
        }
    
        switch (query.start_date) {
            case '':
                break;
            default:
                filters.start_date = `AND asp.fecha_de_pago >= '${query.start_date}'`
                break;
        }
    
        switch (query.end_date) {
            case '':
                break;
            default:
                filters.end_date = `AND asp.fecha_de_pago <= '${query.end_date}'`
                break;
        }
    
        switch (query.payment_method) {
            case '':
                filters.payment_method = ``
                break;
            default:
                filters.payment_method = `AND asp.metodo_de_pago = ${query.payment_method}`
                break;
        }
        
        return filters
    }


}