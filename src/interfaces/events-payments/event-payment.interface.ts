import { Event } from "../events/events.interface"

export interface EventPaymentInterface extends Partial<Event> {

agente_id: number
evento_id : number
fecha_pago:string
metodo_pago:number | string
monto:number
usuario_id:number
}