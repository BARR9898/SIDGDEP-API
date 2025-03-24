import { log } from "console"

export interface ServicesReportFiltersInterface {
    name: string
    start_date: string,
    end_date: string
    periodicity: string
    agent: string,
    pay_date:string
}

export class ServicesReportFiltersClass {

    constructor(){

    }

    createFilters(query:any){
    
        let filters:ServicesReportFiltersInterface = {
            name: "",
            start_date: "",
            end_date: "",
            periodicity: "",
            agent: "",
            pay_date:''
        }
    
        switch (query.name) {
            case '':
                break;
            default:
                filters.name = `AND s.nombre = '${query.name}'`
                break;
        }

            
        switch (query.pay_date) {
            case '':
                break;
            default:
                filters.pay_date = `AND p.fecha_pago = '${query.pay_date}'`
                break;
        }

                    
        switch (query.start_date) {
            case '':
                break;
            default:
                filters.start_date = `AND p.fecha_pago >= '${query.start_date}'`
                break;
        }

        switch (query.end_date) {
            case '':
                break;
            default:
                filters.end_date = `AND p.fecha_pago <= '${query.end_date}'`
                break;
        }

        switch (query.periodicity) {
            case '1':
                filters.periodicity = `AND s.periodicidad = 1`
                break;
            case '2':
                filters.periodicity = `AND s.periodicidad = 2`
                break;
             case '3':
                    filters.periodicity = `AND s.periodicidad = 3`
                    break;
            case '3':
                    filters.periodicity = `AND s.periodicidad = 4`
                    break;
            default:
                filters.periodicity = ``
                break;
        }

        switch (query.agent) {
            case '0':
                filters.agent = ``
                break;
            default:
                filters.agent = `AND p.agente_id = ${query.agent}`
                break;
        }
    
        


        
        return filters
    }


}