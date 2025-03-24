import { pool } from "../config/mysql_connection";
import {
  Res as ResponseInterface,
  ResClass,
} from "../interfaces/response/response";
import moment from "moment";
import { MensualitiesFilters } from "../interfaces/mensualities/mensualities.filters";
import { Mensuality } from "../interfaces/mensualities/mensuality.interface";
import { DepositInterface } from "../interfaces/deposit/deposit.intrface";
import { ICategory } from "../interfaces/categories/categories.interface";

const newResClassInstance = new ResClass();

const selectPendingPayments = async (
  filters: MensualitiesFilters
): Promise<ResponseInterface> => {
  let response: ResponseInterface = newResClassInstance.CreateNewResponse(
    false,
    [],
    false,
    ""
  );
  try {
    const [select_pending_payments_result]: any =
      await pool.query(`SELECT m.*,u.nombre,u.apellido_paterno,u.apellido_materno FROM mensualidades m
        INNER JOIN usuarios u on u.id = m.usuario_id
        WHERE m.id > 0  ${filters.user} ${filters.payment_status} AND m.estatus = 0`);
    if (select_pending_payments_result.length == 0) {
      response.error = false;
      response.result = false;
      response.message = "Do not exist pending mensualities";
      return response;
    }

    //Formating dates
    select_pending_payments_result.forEach((mensuality: any) => {
      mensuality.fecha_inicio = moment(mensuality.fecha_inicio).format(
        "YYYY-MM-DD hh:mm:ss"
      );
      mensuality.fecha_fin = moment(mensuality.fecha_fin).format(
        "YYYY-MM-DD hh:mm:ss"
      );
      mensuality.fecha_pago = moment(mensuality.fecha_pago).format(
        "YYYY-MM-DD hh:mm:ss"
      );
    });

    response.error = false;
    response.result = true;
    response.message = "Pending mensualities found";
    response.data = select_pending_payments_result;
    return response;
  } catch (error) {
    response.result = false;
    response.message = "An error occurred while trying to find the services";
    response.data = error;
    return response;
  }
};

const insertPayMensuality = async (
  mensuality: Mensuality
): Promise<ResponseInterface> => {
  let response: ResponseInterface = newResClassInstance.CreateNewResponse(
    false,
    [],
    false,
    ""
  );

  try {
    let {
      id,
      start_date,
      end_date,
      subtotal,
      total,
      payed,
      user_id,
      agent_id,
      status,
      promotion_id,
      rest_to_pay,
      payment_method,
      categories,
      additional_descent,
    } = mensuality;

    let [select_mensuality]: any = await pool.query(
      "SELECT id FROM mensualidades m WHERE m.usuario_id = ? AND m.fecha_inicio >= ? AND m.fecha_fin <= ?",
      [
        user_id,
        moment(start_date).format("YYYY-MM-DD 00:00:00"),
        moment(end_date).format("YYYY-MM-DD 23:59:59"),
      ]
    );
    if (select_mensuality.length > 0) {
      response.error = true;
      response.result = false;
      response.code = 500;
      response.message =
        "A monthly payment is already registered in this period of time";
      return response;
    }

    if (promotion_id == 0) {
      let [select_neutral_promotion]: any = await pool.query(
        'SELECT id FROM promociones p WHERE p.nombre = "Sin promocion"'
      );
      if (select_neutral_promotion.length == 0) {
        response.error = true;
        response.result = false;
        response.code = 500;
        response.message =
          "An error occurred while trying to obtain the neutral promotion";
        return response;
      }

      promotion_id = select_neutral_promotion[0].id;
    }

    let [insert_mensuality_result]: any = await pool.query(
      "INSERT INTO mensualidades (id,fecha_inicio,fecha_fin,subtotal,total,pagado,usuario_id,agente_id,estatus,promocion_id,por_pagar,metodo_de_pago,descuento_adicional,isNotified) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        null,
        start_date,
        end_date,
        subtotal,
        total,
        payed,
        user_id,
        agent_id,
        status,
        promotion_id,
        rest_to_pay,
        payment_method,
        additional_descent,
        false,
      ]
    );


    if (!insert_mensuality_result.insertId) {
      response.error = true;
      response.result = false;
      response.code = 500;
      response.message = "Mensuality can´t be payed";
      return response;
    }

    //Get the mensuality's id
    const mensuality_id = insert_mensuality_result.insertId;


    //Insert categories assigned to the monthly payment
    categories.map(async (category: ICategory) => {

      let [insert_mensuality_category]: any = await pool.query(
        "INSERT INTO mensualidades_categorias (id,categoria_id,mensualidad_id,pagado,descuento) VALUES (?,?,?,?,?)",
        [null, category.id, mensuality_id, category.pagado, category.descuento]
      );

      if (!insert_mensuality_category.insertId) {
        response.error = true;
        response.result = false;
        response.code = 500;
        response.message =
          "The relationship between monthly payment and categories could not be registered ";
        return response;
      }
    });

    const date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

    //Insert subcription on payments
    if (payed > 0) {
      const [insert_payment_result]: any = await pool.query(
        "INSERT INTO abonos (id,fecha,cantidad,metodo_de_pago,mensualidad_id,agente_id) VALUES (?,?,?,?,?,?)",
        [null, date, payed, payment_method, mensuality_id, agent_id]
      );
      if (!insert_payment_result.insertId) {
        response.error = true;
        response.result = false;
        response.code = 500;
        response.message = "Deposit can´t be registed";
        return response;
      }
    }


    response.error = false;
    response.result = true;
    response.code = 200;
    response.message = "Mensuality payed successfuly";
    return response;
  } catch (error) {
    console.log("error", error);

    response.result = false;
    response.error = true;
    response.message = "An error occurred while trying to pay the mensuality";
    response.data = error;
    return response;
  }
};

const insertNewDeposit = async (
  deposit: DepositInterface
): Promise<ResponseInterface> => {
  let response: ResponseInterface = newResClassInstance.CreateNewResponse(
    false,
    [],
    false,
    ""
  );

  try {
    const { date, total, mensuality_id, agent_id, pay_method } = deposit;

    if (total > 0) {
      const [insert_deposit_result]: any = await pool.query(
        "INSERT INTO abonos (id,fecha,cantidad,metodo_de_pago,mensualidad_id,agente_id) VALUES (?,?,?,?,?,?)",
        [null, date, total, pay_method, mensuality_id, agent_id]
      );
      if (!insert_deposit_result.insertId) {
        response.error = true;
        response.result = false;
        response.message = "Deposit can´t be registed";
        return response;
      }
    }

    //Update the total that resto pay of the mensuality
    const [selcet_rest_to_pay_mensuality_result]: any = await pool.query(
      "SELECT * FROM mensualidades WHERE id = ?",
      [mensuality_id]
    );
    if (selcet_rest_to_pay_mensuality_result.length == 0) {
      response.error = false;
      response.result = false;
      response.message =
        "Can´t select the mensuality to update the rest to pay";
      return response;
    }

    let total_mensuality = selcet_rest_to_pay_mensuality_result[0].total;
    let payed_mensuality = selcet_rest_to_pay_mensuality_result[0].pagado;
    let rest_to_pay = selcet_rest_to_pay_mensuality_result[0].por_pagar;

    payed_mensuality = payed_mensuality + total;
    rest_to_pay = rest_to_pay - total;

    if (payed_mensuality == total_mensuality) {
      selcet_rest_to_pay_mensuality_result[0].estatus = 1;
    }

    const [update_mensuality_aboned_result]: any = await pool.query(
      "UPDATE mensualidades SET  estatus = ? , por_pagar = ?, pagado = ? WHERE id = ?",
      [
        selcet_rest_to_pay_mensuality_result[0].estatus,
        rest_to_pay,
        payed_mensuality,
        mensuality_id,
      ]
    );
    if (update_mensuality_aboned_result.affectedRows == 0) {
      response.error = false;
      response.result = false;
      response.message =
        "Can´t updated the data of the mensuality that recive the deposit";
      return response;
    }


    response.error = false;
    response.result = true;
    response.message = "Deposit registed successfuly";
    return response;
  } catch (error) {
    response.result = false;
    response.error = true;
    response.message = "An error occurred while trying to pay the mensuality";
    response.data = error;
    return response;
  }
};

const selectMensualityes = async (
  filters: MensualitiesFilters
): Promise<ResponseInterface> => {
  let response: ResponseInterface = newResClassInstance.CreateNewResponse(
    false,
    [],
    false,
    ""
  );
  try {
    const [select_mensualityes_result]: any =
      await pool.query(`SELECT m.*,u.id as user_id,u.nombre,u.apellido_paterno,u.apellido_materno,p.nombre as promocion_nombre,p.descuento as promocion_descuento,p.descuento_porcentaje  as promocion_descuento_porcentaje,a.nombre as a_nombre,a.apellido_paterno as a_apellido_paterno,a.apellido_materno as a_apellido_materno FROM mensualidades m
        INNER JOIN usuarios u on u.id = m.usuario_id
        INNER JOIN promociones p on p.id = m.promocion_id
        INNER JOIN agentes a ON a.id = m.agente_id
        WHERE m.id > 0 ${filters.user} ${filters.agent} ${filters.payment_status} ${filters.start_date} ${filters.end_date} ${filters.promotion_id} ORDER BY m.id DESC ${filters.offset} `);

    if (select_mensualityes_result.length == 0) {
      response.error = false;
      response.result = false;
      response.message = "Do not exist mensualities";
      return response;
    }

    //Formating dates
    select_mensualityes_result.forEach((mensuality: any) => {
      mensuality.fecha_inicio = moment(mensuality.fecha_inicio).format(
        "YYYY-MM-DD hh:mm:ss"
      );
      mensuality.fecha_fin = moment(mensuality.fecha_fin).format(
        "YYYY-MM-DD hh:mm:ss"
      );
      mensuality.fecha_pago = moment(mensuality.fecha_pago).format(
        "YYYY-MM-DD hh:mm:ss"
      );
      switch (mensuality.metodo_de_pago) {
        case 1:
          mensuality.metodo_de_pago = "Efectivo";
          break;
        case 2:
          mensuality.metodo_de_pago = "Transferencia";
          break;
        case 3:
          mensuality.metodo_de_pago = "Tarjeta";
          break;

        default:
          break;
      }
    });

    response.error = false;
    response.result = true;
    response.message = "Mensualityes found";
    response.data = select_mensualityes_result;
    return response;
  } catch (error) {
    console.log("error", error);

    response.result = false;
    response.message =
      "An error occurred while trying to find the mensualityes";
    response.data = error;
    return response;
  }
};

const selectMonthlyCategories = async (
  mensuality_id: string
): Promise<ResponseInterface> => {
  let response: ResponseInterface = newResClassInstance.CreateNewResponse(
    false,
    [],
    false,
    ""
  );
  try {
    const [select_monthly_categories]: any = await pool.query(
      `SELECT c.* FROM mensualidades_categorias mc INNER JOIN categorias c  ON mc.categoria_id = c.id  INNER JOIN mensualidades m ON m.id = mc.mensualidad_id WHERE mc.mensualidad_id  = ? `,
      [mensuality_id]
    );

    if (select_monthly_categories.length == 0) {
      response.error = false;
      response.result = false;
      response.message = "Do not exist categories assigend to the mensuality";
      return response;
    }

    response.error = false;
    response.result = true;
    response.message = "Monthly payment categories found successfully";
    response.data = select_monthly_categories;
    return response;
  } catch (error) {
    response.result = false;
    response.message =
      "An error occurred while trying to find monthly payment categories found successfullyy";
    response.data = error;
    return response;
  }
};

const selectMensuality = async (
  mensuality_id: string
): Promise<ResponseInterface> => {
  let response: ResponseInterface = newResClassInstance.CreateNewResponse(
    false,
    [],
    false,
    ""
  );
  try {
    const [select_mennsuality]: any = await pool.query(
      `SELECT m.*,a.nombre as a_nombre,a.apellido_paterno as a_apellido_paterno,a.apellido_materno as a_apellido_materno FROM mensualidades m  INNER JOIN agentes a ON a.id = m.agente_id  WHERE m.id = ? `,
      [mensuality_id]
    );

    if (select_mennsuality.length == 0) {
      response.error = false;
      response.result = false;
      response.message = "Was not possible select the mensuality";
      return response;
    }

    select_mennsuality.map((mensuality: any) => {
      mensuality.fecha_inicio = moment(mensuality.fecha_inicio).format(
        "YYYY-MM-DD hh:mm:ss"
      );
      mensuality.fecha_fin = moment(mensuality.fecha_fin).format(
        "YYYY-MM-DD hh:mm:ss"
      );
    });

    response.error = false;
    response.result = true;
    response.message = "Mensuality found successfully";
    response.data = select_mennsuality;
    return response;
  } catch (error) {
    response.result = false;
    response.message = "An error occurred while trying to find the mensuality";
    response.data = error;
    return response;
  }
};

const deleteMensuality = async (
  mensuality_id: string
): Promise<ResponseInterface> => {
  let response: ResponseInterface = newResClassInstance.CreateNewResponse(
    false,
    [],
    false,
    ""
  );
  try {
    const [delete_mennsuality_result]: any = await pool.query(
      `DELETE FROM mensualidades WHERE id = ? `,
      [mensuality_id]
    );
    
    if (delete_mennsuality_result.affectedRows == 0) {
      response.error = false;
      response.result = false;
      response.message = "Was not possible remove the mensuality";
      return response;
    }

    response.error = false;
    response.result = true;
    response.message = "Mensuality remove successfully";
    return response;
  } catch (error) {
    response.result = false;
    response.message =
      "An error occurred while trying to remove the mensuality";
    response.data = error;
    return response;
  }
};

export {
  selectPendingPayments,
  insertPayMensuality,
  insertNewDeposit,
  selectMensualityes,
  selectMonthlyCategories,
  selectMensuality,
  deleteMensuality,
};
