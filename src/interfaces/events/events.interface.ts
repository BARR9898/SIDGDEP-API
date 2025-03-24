export interface Event {
    id?:number,
    nombre: string,
    descripcion: string,
    fecha_de_creacion: string,
    estatus: boolean;
    fecha_evento:string,
    costo: number,
    calle: string,
    municipio:string,
    codigo_postal: string,
    numero_exterior: string,
    numero_interior: string,
    colonia: string,
    ciudad: string,
    referencia: string,
    agente_id?:number
    
}