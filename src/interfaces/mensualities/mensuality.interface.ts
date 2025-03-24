import { ICategory } from "../categories/categories.interface"

export interface Mensuality {
    id?:number,
    start_date:string
    end_date:string,
    pay_date:string
    subtotal:string
    total:string,
    payed: number,
    user_id:string,
    agent_id:boolean,
    status:boolean,
    promotion_id:number,
    rest_to_pay:number,
    payment_method:number,
    additional_descent:number,
    categories:ICategory[],
    renewd:boolean
}