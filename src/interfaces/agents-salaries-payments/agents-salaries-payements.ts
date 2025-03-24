export interface AgentsSalaryPayment {
    fecha_de_pago: string,
    metodo_de_pago: number | string,
    cantidad: number,
    agente_id: number
}