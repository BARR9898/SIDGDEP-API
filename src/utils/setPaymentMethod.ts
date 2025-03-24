const setPaymentMethod = (paymentMethod: number) => {

    let method:string = ""

    switch (paymentMethod) {
        case 1:
            method = "Efectivo"
            break;
        case 1:
            method = "Transferencia"
            break;
    
        default:
            method = "Tarjeta"
            break;
    }

    return method
}  


export default setPaymentMethod