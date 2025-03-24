export interface CommoditySaleInterface {
    date:string,
    products: any[],
    total: number,
    subtotal: number,
    iva:number,
    status:boolean
    agent:number
    user:number
    payment_method: number,
    payed:number
}

