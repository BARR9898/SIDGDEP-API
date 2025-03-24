import { NextFunction, Request, Response } from "express";
import { check, param, query } from "express-validator";
import { handleValidatons } from "../middelwares/validaitons.handle";


const createEventValidations = [
    check("nombre")
        .exists().withMessage("El nombre es requerido")
        .notEmpty().withMessage("El nombre no puede estar vacío")
        .isString().withMessage("El nombre debe ser una cadena de texto"),
    check("descripcion")
        .exists().withMessage("La descripción es requerida")
        .notEmpty().withMessage("La descripción no puede estar vacía")
        .isString().withMessage("La descripción debe ser una cadena de texto"),
    check("estatus")
        .exists().withMessage("El estatus es requerido")
        .notEmpty().withMessage("El estatus no puede estar vacío")
        .isBoolean().withMessage("El estatus debe ser un booleano"),
    check("fecha_evento")
        .exists().withMessage("La fecha del evento es requerida")
        .notEmpty().withMessage("La fecha del evento no puede estar vacía")
        .isString().withMessage("La fecha del evento debe ser una cadena de texto"),
    check("fecha_de_creacion")
        .exists().withMessage("La fecha de creacion es requerida")
        .notEmpty().withMessage("La fecha de creacion no puede estar vacía")
        .isString().withMessage("La fecha de creacion debe ser una cadena de texto"),
    check("costo")
        .exists().withMessage("El costo es requerido")
        .notEmpty().withMessage("El costo no puede estar vacío")
        .isNumeric().withMessage("El costo debe ser un número"),
    check("calle")
        .exists().withMessage("La calle es requerida")
        .isString().withMessage("La calle debe ser una cadena de texto"),
    check("municipio")
        .exists().withMessage("El municipio es requerido")
        .isString().withMessage("El municipio debe ser una cadena de texto"),
    check("codigo_postal")
        .exists().withMessage("El código postal es requerido")
        .isString().withMessage("El código postal debe ser una cadena de texto"),
    check("numero_exterior")
        .exists().withMessage("El número exterior es requerido")
        .isString().withMessage("El número exterior debe ser una cadena de texto"),
    check("numero_interior")
        .exists().withMessage("El número interior debe existir")
        .isString().withMessage("El número interior debe ser una cadena de texto"),
    check("colonia")
        .exists().withMessage("La colonia es requerida")
        .isString().withMessage("La colonia debe ser una cadena de texto"),
    check("ciudad")
        .exists().withMessage("La ciudad es requerida")
        .isString().withMessage("La ciudad debe ser una cadena de texto"),
    check("agente_id")
        .exists().withMessage("El agente es requerido")
        .isString().withMessage("El agente debe ser una cadena de texto"),
    check("referencia")
        .optional()
        .isString().withMessage("La referencia debe ser una cadena de texto"),
    (req: Request, res: Response, next: NextFunction) => {
        handleValidatons(req, res, next);
    }
];

const getEventsValidations = [
    query("pageSize")
        .exists().withMessage("El tamaño de pagina debe existir")
        .notEmpty().withMessage("El tamaño de pagina no pude estar vacio")
        .isNumeric().withMessage("El tamaño de pagina debe de ser un número"),
    query("pageIndex")
        .exists().withMessage("El indice de pagina debe existir")
        .notEmpty().withMessage("El indice de pagina no pude estar vacio")
        .isNumeric().withMessage("El idice de pagina debe de ser un número"),
    (req: Request, res: Response, next: NextFunction) => {
        handleValidatons(req, res, next);
    }
];

const updateEventValidations = [
    param("event_id")
        .exists().withMessage("El ID del evento es requerido")
        .notEmpty().withMessage("El ID del evento no puede estar vacío")
        .isNumeric().withMessage("El ID del evento debe ser un número"),
    ...createEventValidations
];

const deleteEventValidations = [
    param("event_id")
        .exists().withMessage("El ID del evento es requerido")
        .notEmpty().withMessage("El ID del evento no puede estar vacío")
        .isNumeric().withMessage("El ID del evento debe ser un número"),
    (req: Request, res: Response, next: NextFunction) => {
        handleValidatons(req, res, next);
    }
];

const postEventPaymentValidations = [
    param("event_id")
        .exists().withMessage("El ID del evento es requerido")
        .notEmpty().withMessage("El ID del evento no puede estar vacío")
        .isNumeric().withMessage("El ID del evento debe ser un número"),
    check("agente_id")
        .exists().withMessage("Es necesario el agente")
        .notEmpty().withMessage("El agente no puede estar vacío")
        .isNumeric().withMessage("El agente debe ser un número"),
    check("evento_id")
        .exists().withMessage("Es necesario el evento")
        .notEmpty().withMessage("El  evento no puede estar vacío")
        .isNumeric().withMessage("El evento debe ser un número"),
    check("fecha_pago")
        .exists().withMessage("Fecha de pago es requerida")
        .notEmpty().withMessage("La fecha de pago no puede estar vacía")
        .isString().withMessage("La fecha de pago debe ser una cadena de texto"),
    check('metodo_de_pago')
        .exists().withMessage("El metodo de pago es requerido")
        .notEmpty().withMessage("El metodo de pago no puede estar vacío")
        .isNumeric().withMessage("El metodo de pago debe ser un valor numérico"),
    check('monto')
        .exists().withMessage("El monto es requerido")
        .notEmpty().withMessage("El monto no puede estar vacío")
        .isNumeric().withMessage("El monto debe ser un valor numérico"),
    check('usuario_id')
        .exists().withMessage("El usuario es requerido")
        .notEmpty().withMessage("El usuario no puede estar vacío")
        .isNumeric().withMessage("El usuario debe ser un valor numérico"),
];


const getEventsPaymentsValidations = [
    query("pageSize")
        .exists().withMessage("El tamaño de pagina debe existir")
        .notEmpty().withMessage("El tamaño de pagina no pude estar vacio")
        .isNumeric().withMessage("El tamaño de pagina debe de ser un número"),
    query("pageIndex")
        .exists().withMessage("El indice de pagina debe existir")
        .notEmpty().withMessage("El indice de pagina no pude estar vacio")
        .isNumeric().withMessage("El idice de pagina debe de ser un número"),
    query("user")
        .exists().withMessage("El usuario  debe existir")
        .isNumeric().withMessage("El usuario debe de ser un número"),
    query("event")
        .exists().withMessage("El evento  debe existir")
        .isNumeric().withMessage("El evento debe de ser un número"),

    (req: Request, res: Response, next: NextFunction) => {
        handleValidatons(req, res, next);
    }
];

const deleteEventPayementValidations = [
    param("payment_id")
        .exists().withMessage("El ID del pago es requerido")
        .notEmpty().withMessage("El ID del pago no puede estar vacío")
        .isNumeric().withMessage("El ID del pago debe ser un número"),
];



export {
    createEventValidations,
    getEventsValidations,
    updateEventValidations,
    deleteEventValidations,
    postEventPaymentValidations,
    getEventsPaymentsValidations,
    deleteEventPayementValidations
};
