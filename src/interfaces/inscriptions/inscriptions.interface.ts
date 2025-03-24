export interface IInscription {
    id?:number,
    fecha_inscripcion:string,
    categorias:number[],
    usuario_id:number,
    monto:number,
    pagado:number,
    estatus_pago:boolean
}