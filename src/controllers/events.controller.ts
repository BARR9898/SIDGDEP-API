import { Request, Response } from "express";
import { Res as ResponseInterface } from "../interfaces/response/response";
import { handleHttp } from "../middelwares/error.handle";
import { deleteEvent, insertEvent, insertEventPayment, selectEvent, selectEvents, updateEvent,selectEventsPayments, deleteEventPayment } from "../services/event.service";
import { EventFiltersInterface, EventsFiltersClass } from "../interfaces/events/events.filters.interface";
import { EventsPaymentsFiltersClass } from "../interfaces/events-payments/events-payments-filters-interface";
//import { EventFilters, EventFiltersInterface } from "../interfaces/events/event.filters.interface";

const postEvent = async ({ body }: Request, res: Response) => {
    try {
        const responseItem: ResponseInterface = await insertEvent(body);
        res.status(responseItem.code!);
        res.send(responseItem);
    } catch (error) {
        handleHttp(res, "An error occurred trying to create the event");
    }
};


const getEvent = async ({ params }: Request, res: Response) => {
    try {
        const { event_id } = params;
        const responseItem: ResponseInterface = await selectEvent(event_id);
        res.send(responseItem);
    } catch (error) {
        handleHttp(res, "An error occurred trying to get the event");
    }
};

const getEvents = async ({ query }: Request, res: Response) => {
    try {
        let newEventInstance = new EventsFiltersClass();
        let filters: EventFiltersInterface = newEventInstance.createFilters(query);
        const responseItem: ResponseInterface = await selectEvents(filters);
        res.status(responseItem.code!);
        res.send(responseItem);
    } catch (error) {
        handleHttp(res, "An error occurred trying to get the events");
    }
};

const putEvent = async ({ body, params }: Request, res: Response) => {
    try {
        const { event_id } = params;
        const responseItem: ResponseInterface = await updateEvent(body, event_id);
        res.send(responseItem);
    } catch (error) {
        handleHttp(res, "An error occurred trying to update the event");
    }
};

const removeEvent = async ({ params }: Request, res: Response) => {
    try {
        const { event_id } = params;
        const responseItem: ResponseInterface = await deleteEvent(event_id);
        res.status(responseItem.code!);
        res.send(responseItem);
    } catch (error) {
        handleHttp(res, "An error occurred trying to delete the event");
    }
};


//Events payments
const postEventPayment = async ({ body }: Request, res: Response) => {
    try {
        const responseItem: ResponseInterface = await insertEventPayment(body);
        res.status(responseItem.code!);
        res.send(responseItem);
    } catch (error) {
        handleHttp(res, "An error occurred trying to create the event payment");
    }
};

const getEventsPayments = async ({ query }: Request, res: Response) => {
    try {

        const eventsPaymentsFiltersClass =  new EventsPaymentsFiltersClass()
        const filters = eventsPaymentsFiltersClass.createFilters(query);
        const responseItem: ResponseInterface = await selectEventsPayments(filters);
        res.status(responseItem.code!);
        res.send(responseItem);
    } catch (error) {
        handleHttp(res, "An error occurred trying to create the event payment");
    }
};

const removeEventPayment = async ({ params }: Request, res: Response) => {
    try {
        const { payment_id } = params;
        const responseItem: ResponseInterface = await deleteEventPayment(payment_id);
        res.status(responseItem.code!);
        res.send(responseItem);
    } catch (error) {
        handleHttp(res, "An error occurred trying to delete the event payment");
    }
};



export {
    postEvent,
    getEvent,
    getEvents,
    putEvent,
    removeEvent,
    postEventPayment,
    getEventsPayments,
    removeEventPayment
};
