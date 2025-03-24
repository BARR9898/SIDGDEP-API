export interface MensualytiesReportFilter {
    status: string
    pay_date: string
    start_date: string
    end_date: string
    promotion: string
    payment_type: string
    user: string
    agent: string
}

export class MensualytiesReportFilterClass {

    constructor(){

    }

    createFilters(query:any){
    
        let filters:MensualytiesReportFilter = {
            status: "",
            pay_date: "",
            start_date: "",
            end_date: "",
            promotion: "",
            payment_type: '',
            user: '',
            agent: ''
        }
    
        switch (query.pay_date) {
            case '':
                break;
            default:
                filters.pay_date = `AND m.fecha_pago = '${query.pay_date}'`
                break;
        }
    
        switch (query.start_date) {
            case '':
                break;
            default:
                filters.start_date = `AND m.fecha_inicio >= '${query.start_date}'`
                break;
        }
    
        switch (query.end_date) {
            case '':
                break;
            default:
                filters.end_date = `AND m.fecha_fin <= '${query.end_date}'`
                break;
        }
    
        switch (query.status) {
            case 'true':
                filters.status = `AND m.estatus = 1`
                break;
            case 'false':
                filters.status = `AND m.estatus = 0`
                break;
            default:
                filters.status = ``
                break;
        }

        switch (query.promotion) {
            case 'true':
                filters.promotion = `AND m.promocion_id != 1`
                break;
            case 'false':
                filters.promotion = `AND m.promocion_id = 1`
                break;
            default:
                filters.promotion = ``
                break;
        }

        switch (query.payment_type) {
            case '1':
                filters.payment_type = `AND m.metodo_de_pago = 1`
                break;
            case '2':
                filters.payment_type = `AND m.metodo_de_pago = 2`
                break;
            default:
                filters.payment_type = ``
                break;
        }
        

        switch (query.user) {
            case '0':
                filters.user = ``
                break;
            default:
                filters.user = `AND m.usuario_id = ${query.user}`
                break;
        }


        switch (query.agent) {
            case '0':
                filters.agent = ``
                break;
            default:
                filters.agent = `AND m.agente_id = ${query.agent}`
                break;
        }

        
        return filters
    }


}