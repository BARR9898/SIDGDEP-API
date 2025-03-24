
import { pool } from "../config/mysql_connection"
import { Res as ResponseInterface, ResClass, Res } from "../interfaces/response/response"
const newResClassInstance = new ResClass()
import { Event } from "../interfaces/events/events.interface"
import { EventFiltersInterface } from "../interfaces/events/events.filters.interface"
import moment, { min } from "moment"
import { EventPaymentInterface } from "../interfaces/events-payments/event-payment.interface"
import setPaymentMethod from "../utils/setPaymentMethod"
import { EventsPaymentsFiltersInterface } from "../interfaces/events-payments/events-payments-filters-interface"
import { filter } from "puppeteer-core/lib/esm/third_party/rxjs/rxjs.js"

const insertEvent = async (event: Event): Promise<ResponseInterface> => {

    let response: ResponseInterface = newResClassInstance.CreateNewResponse(false, [], false, '')

    try {
        const { 
            nombre, 
            fecha_de_creacion, 
            fecha_evento, 
            agente_id, 
            estatus, 
            costo, 
            calle, 
            municipio, 
            colonia, 
            codigo_postal, 
            numero_exterior, 
            numero_interior, 
            referencia, 
            ciudad ,
            descripcion
        } = event

        // Query para insertar un nuevo evento
        const [insert_event_result]: any = await pool.query(
            `INSERT INTO eventos (
                id,
                nombre, 
                fecha_de_creacion, 
                fecha_evento, 
                agente_id, 
                estatus, 
                costo, 
                calle, 
                municipio, 
                colonia, 
                codigo_postal, 
                numero_exterior, 
                numero_interior, 
                referencia, 
                ciudad,
                descripcion
            ) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`, 
            [
                null,
                nombre, 
                fecha_de_creacion, 
                fecha_evento, 
                agente_id, 
                estatus, 
                costo, 
                calle, 
                municipio, 
                colonia, 
                codigo_postal, 
                numero_exterior, 
                numero_interior, 
                referencia, 
                ciudad,
                descripcion
            ]
        )

        if (insert_event_result.insertId == 0) {
            response.error = false
            response.result = false
            response.message = 'Was not possible to create the event'
            response.code = 500
            return response
        }

        response.error = false
        response.result = true
        response.message = 'Event created successfuly'
        response.code = 200
        return response
    } catch (error) {
        console.log('error', error)
        response.result = false
        response.message = 'Something went wront while trying to create the event'
        response.data = error
        response.code = 500
        return response
    }
}




const selectEvent = async (id: string): Promise<ResponseInterface> => {

    let response: ResponseInterface = newResClassInstance.CreateNewResponse(false, [], false, '')

    try {
        const [select_Service_result]: any = await pool.query('SELECT * FROM mercancias WHERE id = ?', [id])
        if (select_Service_result.length == 0) {
            response.error = false
            response.result = false
            response.message = 'The Service do not exist'
            return response
        }
        response.error = false
        response.result = true
        response.message = 'Service found successfuly'
        response.data = select_Service_result
        return response
    } catch (error) {
        response.result = false
        response.message = 'An error occurred while trying to find the Service'
        response.data = error
        return response
    }
}

const selectEvents = async (filters: EventFiltersInterface): Promise<ResponseInterface> => {

    let response: ResponseInterface = newResClassInstance.CreateNewResponse(false, [], false, '')

    try {


        const [select_events_result]: any = await pool.query(`SELECT * FROM eventos`)
        if (select_events_result.length == 0) {
            response.error = false
            response.result = false
            response.code = 500
            response.message = 'Do not exist events'
            return response
        }


        select_events_result.forEach((event: Event) => {

            
        });

        response.error = false
        response.result = true
        response.message = 'Events found successfuly'
        response.data = select_events_result
        response.code = 200 

        return response
    } catch (error) {
        console.error('error', error);
        response.result = false
        response.message = 'An error occurred while trying to find the events'
        response.data = error
        response.code = 500
        return response
    }
}

const updateEvent = async (event: Event, event_id: string): Promise<ResponseInterface> => {
    let response: ResponseInterface = newResClassInstance.CreateNewResponse(false, [], false, '');

    try {
        const { 
            id, // Asegurar que el ID del evento venga en el objeto
            nombre, 
            fecha_de_creacion, 
            fecha_evento, 
            agente_id, 
            estatus, 
            costo, 
            calle, 
            municipio, 
            colonia, 
            codigo_postal, 
            numero_exterior, 
            numero_interior, 
            referencia, 
            ciudad ,
            descripcion
        } = event;

        // Validar que el ID del evento no sea nulo
        if (!id) {
            response.error = true;
            response.result = false;
            response.message = 'Event ID is required';
            response.code = 400;
            return response;
        }

        // Query para actualizar un evento existente
        const [update_event_result]: any = await pool.query(
            `UPDATE eventos 
             SET nombre = ?, 
                 fecha_de_creacion = ?, 
                 fecha_evento = ?, 
                 agente_id = ?, 
                 estatus = ?, 
                 costo = ?, 
                 calle = ?, 
                 municipio = ?, 
                 colonia = ?, 
                 codigo_postal = ?, 
                 numero_exterior = ?, 
                 numero_interior = ?, 
                 referencia = ?, 
                 ciudad = ?,
                 descripcion = ?
             WHERE id = ?`, 
            [
                nombre, 
                fecha_de_creacion, 
                fecha_evento, 
                agente_id, 
                estatus, 
                costo, 
                calle, 
                municipio, 
                colonia, 
                codigo_postal, 
                numero_exterior, 
                numero_interior, 
                referencia, 
                ciudad,
                descripcion,
                event_id
            ]
        );

        // Verificar si se actualizó alguna fila
        if (update_event_result.affectedRows === 0) {
            response.error = false;
            response.result = false;
            response.message = 'No event was updated, possibly the event does not exist';
            response.code = 404;
            return response;
        }

        response.error = false;
        response.result = true;
        response.message = 'Event updated successfully';
        response.code = 200;
        return response;
    } catch (error) {
        console.log('Error updating event:', error);
        response.result = false;
        response.message = 'Something went wrong while trying to update the event';
        response.data = error;
        response.code = 500;
        return response;
    }
};


const deleteEvent = async (id: string): Promise<ResponseInterface> => {

    let response: ResponseInterface = newResClassInstance.CreateNewResponse(false, [], false, '')

    try {

        //Delete from agents table
        const [delete_Service_result]: any = await pool.query('DELETE FROM eventos WHERE id = ?', [id])
        if (delete_Service_result.affectedRows == 0) {
            response.error = true
            response.result = false
            response.message = 'Event wasent removed'
            response.code = 500
            return response
        }
        response.error = false
        response.result = true
        response.code = 200
        response.message = 'Event removed successfuly'
        return response
    } catch (error) {
        response.code = 500
        response.result = false
        response.message = 'An error occurred while trying to remove the event'
        response.data = error
        return response
    }
}


//Events payments
const insertEventPayment = async (event: EventPaymentInterface): Promise<ResponseInterface> => {

    let response: ResponseInterface = newResClassInstance.CreateNewResponse(false, [], false, '')

    try {
        const { 
            agente_id,
            evento_id,
            fecha_pago,
            metodo_pago,
            monto,
            usuario_id
        } = event

        // Query para insertar un nuevo evento
        const [insert_event_result]: any = await pool.query(
            `INSERT INTO eventos_pagos (
                id,
                usuario_id, 
                fecha, 
                metodo_de_pago, 
                agente_id, 
                evento_id, 
                cantidad
            ) VALUES (?,?, ?, ?, ?, ?, ?)`, 
            [
                null,
                usuario_id,
                fecha_pago,
                metodo_pago,
                agente_id,
                evento_id,
                monto
            ]
        )

        if (insert_event_result.insertId == 0) {
            response.error = false
            response.result = false
            response.message = 'Was not possible to create the event payment'
            response.code = 500
            return response
        }

        response.error = false
        response.result = true
        response.message = 'Event payment created successfuly'
        response.code = 200
        return response
    } catch (error) {
        console.log('error', error)
        response.result = false
        response.message = 'Something went wront while trying to create the event payment'
        response.data = error
        response.code = 500
        return response
    }
}


const selectEventsPayments = async (filters:EventsPaymentsFiltersInterface): Promise<ResponseInterface> => {

    let response: ResponseInterface = newResClassInstance.CreateNewResponse(false, [], false, '')

    try {


        const [select_events_payments]: any = await pool.query(
            `SELECT ep.id,e.nombre,e.fecha_evento,e.costo,u.nombre as usuario_nombre ,u.apellido_paterno as usuario_apellido_paterno,u.apellido_materno as usuario_apellido_materno,ep.fecha as fecha_pago,ep.metodo_de_pago,ep.cantidad as monto FROM eventos_pagos ep INNER JOIN eventos e ON ep.evento_id = e.id INNER JOIN usuarios u ON ep.usuario_id = u.id WHERE ep.id > 0 ${filters.user} ${filters.start_date} ${filters.end_date} ${filters.offset} ORDER BY ep.id DESC`, 
            
        )

        if (select_events_payments.length == 0) {
            response.error = false
            response.result = false
            response.message = 'Was not possible to found the events payments'
            response.code = 500
            return response
        }

        select_events_payments.forEach((event: any) => {  
            event.fecha_evento = moment(event.fecha_evento).format('YYYY-MM-DD')
            event.fecha_pago = moment(event.fecha_pago).format('YYYY-MM-DD HH:mm:ss')
            event.metodo_de_pago =  setPaymentMethod(event.metodo_de_pago as number)
        })

        response.error = false
        response.result = true
        response.data = select_events_payments
        response.message = 'Events payments found successfuly'
        response.code = 200
        return response
    } catch (error) {
        console.log('error', error)
        response.result = false
        response.message = 'Something went wront while trying to get the events payments'
        response.data = error
        response.code = 500
        return response
    }
}


const deleteEventPayment = async (id: string): Promise<ResponseInterface> => {

    let response: ResponseInterface = newResClassInstance.CreateNewResponse(false, [], false, '')

    try {

        //Delete from agents table
        const [delete_event_payment_result]: any = await pool.query('DELETE FROM eventos_pagos WHERE id = ?', [id])
        if (delete_event_payment_result.affectedRows == 0) {
            response.error = true
            response.result = false
            response.message = 'Event payment wasent removed'
            response.code = 500
            return response
        }
        response.error = false
        response.result = true
        response.code = 200
        response.message = 'Event payment removed successfuly'
        return response
    } catch (error) {
        response.code = 500
        response.result = false
        response.message = 'An error occurred while trying to remove the event payment'
        response.data = error
        return response
    }
}



export { 
    insertEvent,
    updateEvent,
    selectEvents,
    deleteEvent,
    selectEvent,
    insertEventPayment,
    selectEventsPayments,
    deleteEventPayment
}