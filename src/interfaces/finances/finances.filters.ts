import moment from "moment";

export interface FinancesFiltersInterface {
    start_date:string,
    end_date:string,
    services_start_date:string,
    services_end_date:string,
    commodity_payments_start_date:string,
    commodity_payments_end_date:string,
    monthly_payments_deposits_start_date:string,
    monthly_payments_deposits_end_date:string,
    account_payable_start_date:string,
    account_payable_end_date:string,
    agents_salaries_start_date:string,
    agents_salaries_end_date:string,
    services_payments_start_date:string,
    services_payments_end_date:string,
    monthly_payments_start_date:string,
    monthly_payments_end_date:string,
    category:string
    inscription_deposit_start_date:string
    inscription_deposit_end_date:string,
    commodity_sales_start_date:string
    commodity_sales_end_date:string

}

export class   FinancesFiltersClass {

    constructor(){

    }

    createFilters(query:any){    
    
        let filters:FinancesFiltersInterface = {
            start_date: "",
            end_date: "",
            services_start_date: "",
            services_end_date: "",
            commodity_payments_start_date: "",
            commodity_payments_end_date: "",
            monthly_payments_deposits_start_date: "",
            monthly_payments_deposits_end_date: "",
            account_payable_end_date: '',
            account_payable_start_date: "",
            agents_salaries_end_date: '',
            agents_salaries_start_date: '',
            services_payments_start_date: "",
            services_payments_end_date: "",
            monthly_payments_start_date: "",
            monthly_payments_end_date: "",
            category: '',
            inscription_deposit_end_date: '',
            inscription_deposit_start_date: '',
            commodity_sales_end_date: '',
            commodity_sales_start_date: ''

        }


        switch (query.start_date) {
            case '':
                filters.start_date = ``
                filters.services_start_date = ``
                filters.commodity_payments_start_date
                filters.monthly_payments_deposits_start_date = ''
                filters.account_payable_start_date = ''
                filters.agents_salaries_start_date = ''
                filters.services_payments_start_date = ''
                filters.monthly_payments_start_date = ''
                filters.inscription_deposit_start_date = ''
                filters.commodity_sales_start_date = ''
                break;
            default:
                filters.start_date = `AND m.fecha_inicio >= '${query.start_date}'`
                filters.services_start_date = `AND ps.fecha_pago >= '${query.start_date}'`
                filters.commodity_payments_start_date = `AND avm.fecha >= '${query.start_date}'`
                filters.monthly_payments_deposits_start_date = `AND a.fecha >= '${query.start_date}'`
                filters.account_payable_start_date = `AND acpp.fecha >= '${query.start_date}'`
                filters.agents_salaries_start_date = `AND asp.fecha_de_pago >= '${query.start_date}'`
                filters.services_payments_start_date = `AND p.fecha_pago >= '${query.start_date}'`
                filters.monthly_payments_start_date = `AND m.fecha_inicio >= '${query.start_date}'`
                filters.inscription_deposit_start_date = `AND uca.fecha >= '${query.start_date}'`
                filters.commodity_sales_start_date = `AND v.fecha >= '${query.start_date}'`

                break;
        }

        switch (query.end_date) {
            case '':
                filters.end_date = ``
                filters.services_end_date = ``
                filters.commodity_payments_end_date
                filters.monthly_payments_deposits_end_date = ''
                filters.account_payable_end_date = ''
                filters.agents_salaries_end_date = ``
                filters.services_payments_end_date = ''
                filters.monthly_payments_end_date = ''
                filters.inscription_deposit_end_date = ''
                filters.commodity_sales_end_date = ''
                break;
            default:
                filters.end_date = `AND m.fecha_fin <= '${query.end_date}'`
                filters.services_end_date = `AND ps.fecha_pago <= '${query.end_date}'`
                filters.commodity_payments_end_date = `AND avm.fecha <= '${query.end_date}'`
                filters.monthly_payments_deposits_end_date = ` AND a.fecha <= '${query.end_date}'`
                filters.account_payable_end_date = `AND acpp.fecha <= '${query.end_date}'`
                filters.agents_salaries_end_date = `AND asp.fecha_de_pago <= '${query.end_date}'`
                filters.services_payments_end_date =  `AND p.fecha_pago <= '${query.end_date}'`
                filters.monthly_payments_end_date = `AND m.fecha_inicio <= '${query.end_date}'`
                filters.inscription_deposit_end_date = `AND uca.fecha <= '${query.end_date}'`
                filters.commodity_sales_end_date = `AND v.fecha <= '${query.end_date}'`


                break;
        }

        switch (query.category) {
            case '0':
                filters.category = ''
                break;
        
            default:
                filters.category = `AND c.id = ${query.category}`
                break;
        }
        
        
        return filters
    }


}