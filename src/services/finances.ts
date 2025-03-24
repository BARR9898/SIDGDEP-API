import { match } from "assert";
import { pool } from "../config/mysql_connection";
import { FinancesFiltersInterface } from "../interfaces/finances/finances.filters";
import {
  Res as ResponseInterface,
  ResClass,
} from "../interfaces/response/response";
import moment from "moment";
const newResClassInstance = new ResClass();

const selectPendingMonthlyPayments = async (
  filters: FinancesFiltersInterface
): Promise<ResponseInterface> => {
  let response: ResponseInterface = newResClassInstance.CreateNewResponse(
    false,
    [],
    false,
    ""
  );
  try {
    const [select_pending_monthly_payments_result]: any =
      await pool.query(`SELECT m.*,u.nombre,u.apellido_paterno,u.apellido_materno FROM mensualidades m
        INNER JOIN usuarios u on u.id = m.usuario_id
        WHERE m.id > 0 ${filters.start_date} ${filters.end_date} AND m.estatus = 0`);
    if (select_pending_monthly_payments_result.length == 0) {
      response.error = false;
      response.result = false;
      response.message = "Do not exist pending monthly payments to report";
      return response;
    }

    //Formating dates
    select_pending_monthly_payments_result.forEach((mensuality: any) => {
      mensuality.fecha_inicio = moment(mensuality.fecha_inicio).format(
        "YYYY-MM-DD hh:mm:ss"
      );
      mensuality.fecha_fin = moment(mensuality.fecha_fin).format(
        "YYYY-MM-DD hh:mm:ss"
      );
    });

    response.error = false;
    response.result = true;
    response.message = "Pending mensualities found";
    response.data = select_pending_monthly_payments_result;
    return response;
  } catch (error) {
    response.result = false;
    response.message =
      "An error occurred while trying to find the pending monthly payments";
    response.data = error;
    return response;
  }
};

const selectPayedMonthlyPayments = async (
  filters: FinancesFiltersInterface
): Promise<ResponseInterface> => {
  let response: ResponseInterface = newResClassInstance.CreateNewResponse(
    false,
    [],
    false,
    ""
  );
  try {
    const [select_payed_monthly_payments_result]: any =
      await pool.query(`SELECT * FROM mensualidades m
        WHERE m.id > 0 ${filters.start_date} ${filters.end_date} AND m.estatus = 1`);
    if (select_payed_monthly_payments_result.length == 0) {
      response.error = false;
      response.result = false;
      response.message = "Do not exist payed monthly payments to report";
      return response;
    }

    response.error = false;
    response.result = true;
    response.message = "Pending mensualities found";
    response.data = select_payed_monthly_payments_result;
    return response;
  } catch (error) {
    response.result = false;
    response.message =
      "An error occurred while trying to find the payed monthly payments";
    response.data = error;
    return response;
  }
};

const selectBussinesServicesPayments = async (
  filters: FinancesFiltersInterface
): Promise<ResponseInterface> => {
  let response: ResponseInterface = newResClassInstance.CreateNewResponse(
    false,
    [],
    false,
    ""
  );
  try {
    const [select_bussines_payments_result]: any =
      await pool.query(`SELECT ps.*,s.nombre as servicio,a.nombre,a.apellido_paterno,a.apellido_materno FROM pagos ps
        INNER JOIN agentes a ON a.id = ps.agente_id
        INNER JOIN servicios s ON s.id = ps.servicio_id
        WHERE ps.id > 0 ${filters.start_date} ${filters.end_date}`);
    if (select_bussines_payments_result.length == 0) {
      response.error = false;
      response.result = false;
      response.message = "Do not exist payed monthly payments to report";
      return response;
    }

    response.error = false;
    response.result = true;
    response.message = "Bussines services payments found";
    response.data = select_bussines_payments_result;
    return response;
  } catch (error) {
    response.result = false;
    response.message =
      "An error occurred while trying to find the bussines services payments";
    response.data = error;
    return response;
  }
};

const selectCommodityPayments = async (
  filters: FinancesFiltersInterface
): Promise<ResponseInterface> => {
  let response: ResponseInterface = newResClassInstance.CreateNewResponse(
    false,
    [],
    false,
    ""
  );
  try {
    const [select_commodity_payment]: any = await pool.query(`
        SELECT avm.fecha,avm.cantidad FROM abonos_ventas_mercancia avm
        WHERE avm.id > 0 ${filters.start_date} ${filters.end_date}`);
    if (select_commodity_payment.length == 0) {
      response.error = false;
      response.result = false;
      response.message = "Do not exist commodity payemnt to report";
      return response;
    }

    response.error = false;
    response.result = true;
    response.message = "Commodity payments found";
    response.data = select_commodity_payment;
    return response;
  } catch (error) {
    response.result = false;
    response.message =
      "An error occurred while trying to find the  commodity payments to flow cash";
    response.data = error;
    return response;
  }
};

const selectMonthlyPaymentsDeposits = async (
  filters: FinancesFiltersInterface
): Promise<ResponseInterface> => {
  let response: ResponseInterface = newResClassInstance.CreateNewResponse(
    false,
    [],
    false,
    ""
  );
  try {
    const [select_monthly_payments_deposits]: any = await pool.query(`
        SELECT a.fecha,a.cantidad FROM abonos a
        WHERE a.id > 0 ${filters.monthly_payments_deposits_start_date} ${filters.monthly_payments_deposits_end_date}`);
    if (select_monthly_payments_deposits.length == 0) {
      response.error = false;
      response.result = false;
      response.message = "Do not exist monthly payments deposits to report";
      return response;
    }

    response.error = false;
    response.result = true;
    response.message = " monthly payments deposits found";
    response.data = select_monthly_payments_deposits;
    return response;
  } catch (error) {
    response.result = false;
    response.message =
      "An error occurred while trying to find the monthly payments deposits to flow cash";
    response.data = error;
    return response;
  }
};

const selectAccountPayableDeposits = async (
  filters: FinancesFiltersInterface
): Promise<ResponseInterface> => {
  let response: ResponseInterface = newResClassInstance.CreateNewResponse(
    false,
    [],
    false,
    ""
  );
  try {
    const [select_monthly_payments_deposits]: any = await pool.query(`
        SELECT acpp.fecha,acpp.cantidad FROM abonos_cuentas_por_pagar acpp
        WHERE acpp.id > 0 ${filters.account_payable_start_date} ${filters.account_payable_end_date}`);
    if (select_monthly_payments_deposits.length == 0) {
      response.error = false;
      response.result = false;
      response.message = "Do not exist payable accounts deposits to report";
      return response;
    }

    response.error = false;
    response.result = true;
    response.message = " payable accounts deposits found";
    response.data = select_monthly_payments_deposits;
    return response;
  } catch (error) {
    response.result = false;
    response.message =
      "An error occurred while trying to find the payable accounts deposits to flow cash";
    response.data = error;
    return response;
  }
};

const selectCashFlow = async (
  filters: FinancesFiltersInterface
): Promise<ResponseInterface> => {
  let response: ResponseInterface = newResClassInstance.CreateNewResponse(
    false,
    [],
    false,
    ""
  );
  try {
    const monthlyPaymentsDeposits = await getMonthlyPaymentsDeposits(filters);
    const accountsReceivableDeposits = await getAccountsReceivableDeposits(
      filters
    );
    const accountsPayableDeposits = await getAccountsPayableDeposits(filters);
    const agentSalariesPayments = await getAgentSalariesPayments(filters);
    const paymentsServices = await getServicesPayments(filters);

    const inscriptionsPayments = await getInscriptionsPayments(filters)
    

    //Get total incomes
    const total_incomes =
      monthlyPaymentsDeposits.total + accountsReceivableDeposits.total + inscriptionsPayments.total ;

    //Get total expenses
    const total_expenses =
      accountsPayableDeposits.total +
      agentSalariesPayments?.total! +
      paymentsServices?.total!;

    //Get cash flow total
    const cash_flow_total = total_incomes - total_expenses;

    const cash_flow_balance =
      total_expenses > total_incomes ? "Negativo" : "Positivo";

    const cash_flow_status = total_expenses > total_incomes ? false : true;

    let data = {
      incomes: {
        total: total_incomes,
        data: {
          monthlyPaymentsDeposits: monthlyPaymentsDeposits,
          accountsReceivableDeposits: accountsReceivableDeposits,
          inscriptionsPayments: inscriptionsPayments,
        },
      },
      expenses: {
        total: total_expenses,
        data: {
          accountsPayableDeposits: accountsPayableDeposits,
          agentSalariesPayments: agentSalariesPayments,
          paymentsServices: paymentsServices,
        },
      },
      cash_flow: {
        total: cash_flow_total,
        status: cash_flow_status,
        balance: cash_flow_balance,
      },
    };

    response.error = false;
    response.result = true;
    response.data = data;
    response.message = " cash flow data found successfuly";
    return response;
  } catch (error) {
    response.result = false;
    response.message = "An error occurred while trying to find the cash flow";
    response.data = error;
    return response;
  }
};

const selectEarningsGroupedByCategories = async (
  filters: FinancesFiltersInterface
): Promise<ResponseInterface> => {
  let response: ResponseInterface = newResClassInstance.CreateNewResponse(
    false,
    [],
    false,
    ""
  );
  try {


    const [select_mensualities_with_cateogries_result]: any = await pool.query(
        `SELECT m.*,mc.pagado as categoria_monto_pagado,mc.descuento as categoria_monto_descuento,c.nombre as categoria_nombre,c.costo as categoria_costo,c.beneficio_instructor as categoria_beneficio_instructor,c.beneficio_academia as categoria_beneficio_academia,u.nombre as user_name,u.apellido_paterno as user_last_name,u.apellido_materno as user_second_last_name FROM mensualidades m INNER JOIN mensualidades_categorias mc ON mc.mensualidad_id = m.id INNER JOIN categorias c ON c.id = mc.categoria_id INNER JOIN usuarios u  ON u.id = m.usuario_id WHERE m.id > 0 ${filters.monthly_payments_start_date}  ${filters.monthly_payments_end_date} ${filters.category}`
    );

    const mensualities_with_cateogries_data_structured = await earningsGroupedByCategoriesStructureData(select_mensualities_with_cateogries_result)


    response.error = false;
    response.result = true;
    response.data = mensualities_with_cateogries_data_structured;
    response.message = " cash flow data found successfuly";
    return response;
  } catch (error) {
    response.result = false;
    response.message = "An error occurred while trying to find the earnings grouped by categories";
    response.data = error;
    return response;
  }
};

//Aux methods

async function getMonthlyPaymentsDeposits(filters: FinancesFiltersInterface) {
  let data = {
    total: 0,
    deposits: [],
  };

  const [select_monthly_payments_deposits]: any = await pool.query(
    `SELECT a.*,ag.nombre,ag.apellido_paterno,ag.apellido_materno,u.nombre as usuario_nombre,u.apellido_paterno as usuario_apellido_paterno,u.apellido_materno as usuario_apellido_materno FROM abonos a INNER JOIN agentes ag ON ag.id = a.agente_id INNER JOIN mensualidades m ON m.id = a.mensualidad_id INNER JOIN usuarios u ON u.id = m.usuario_id  WHERE a.id > 0 ${filters.monthly_payments_deposits_start_date}  ${filters.monthly_payments_deposits_end_date}`
  );
  if (select_monthly_payments_deposits.length > 0) {
    select_monthly_payments_deposits.map((element: any) => {
      data.total += element.cantidad;
      element.fecha = moment(element.fecha).format("YYYY-MM-DD hh:mm:ss");
      switch (element.metodo_de_pago) {
        case 1:
          element.metodo_de_pago = "Efectivo";
          break;
        case 2:
          element.metodo_de_pago = "Transferencia";
          break;
        default:
          element.metodo_de_pago = "Tarjeta";
          break;
      }
    });

    data.deposits = select_monthly_payments_deposits;
  }

  return data;
}

async function getAccountsReceivableDeposits(
  filters: FinancesFiltersInterface
) {
  let data = {
    total: 0,
    deposits: [],
  };

  const [select_accounts_receivable_deposits]: any = await pool.query(
    `SELECT avm.*,a.nombre,a.apellido_paterno,a.apellido_materno,u.nombre as usuario_nombre,u.apellido_paterno as usuario_apellido_paterno,u.apellido_materno as usuario_apellido_materno FROM abonos_ventas_mercancia avm INNER JOIN agentes a ON a.id = avm.id_agente INNER JOIN ventas_mercancia vm ON vm.id = avm.id_venta INNER JOIN usuarios u ON u.id = vm.id_usuario WHERE avm.id > 0 ${filters.commodity_payments_start_date}  ${filters.commodity_payments_end_date}`
  );
  if (select_accounts_receivable_deposits.length > 0) {
    select_accounts_receivable_deposits.map((element: any) => {
      data.total += element.cantidad;
      element.fecha = moment(element.fecha).format("YYYY-MM-DD hh:mm:ss");
      switch (element.metodo_de_pago) {
        case 1:
          element.metodo_de_pago = "Efectivo";
          break;
        case 2:
          element.metodo_de_pago = "Transferencia";
          break;
        default:
          element.metodo_de_pago = "Tarjeta";
          break;
      }
    });

    data.deposits = select_accounts_receivable_deposits;
  }

  return data;
}

async function getAccountsPayableDeposits(filters: FinancesFiltersInterface) {
  let data = {
    total: 0,
    deposits: [],
  };

  const [select_accounts_payable_deposits]: any = await pool.query(
    `SELECT acpp.*,a.nombre,a.apellido_paterno,a.apellido_materno FROM abonos_cuentas_por_pagar acpp INNER JOIN agentes a ON a.id = id_agente WHERE acpp.id > 0 ${filters.account_payable_start_date}  ${filters.account_payable_end_date}`
  );
  if (select_accounts_payable_deposits.length > 0) {
    select_accounts_payable_deposits.map((element: any) => {
      data.total += element.cantidad;
      element.fecha = moment(element.fecha).format("YYYY-MM-DD hh:mm:ss");
      switch (element.metodo_de_pago) {
        case 1:
          element.metodo_de_pago = "Efectivo";
          break;
        case 2:
          element.metodo_de_pago = "Transferencia";
          break;
        default:
          element.metodo_de_pago = "Tarjeta";
          break;
      }
    });

    data.deposits = select_accounts_payable_deposits;
  }

  return data;
}

async function getAgentSalariesPayments(filters: FinancesFiltersInterface) {
  let data = {
    total: 0,
    payments: [],
  };

  const [select_agents_salaries_payments]: any = await pool.query(
    `SELECT asp.*,a.nombre,a.apellido_paterno,a.apellido_materno FROM agentes_salarios asp INNER JOIN agentes a ON asp.agente_id = a.id WHERE asp.id > 0 ${filters.agents_salaries_start_date} ${filters.agents_salaries_end_date}`
  );
  if (select_agents_salaries_payments.length > 0) {
    select_agents_salaries_payments.map((element: any) => {
      data.total += element.cantidad;
      element.fecha_de_pago = moment(element.fecha_de_pago).format(
        "YYYY-MM-DD hh:mm:ss"
      );
      switch (element.metodo_de_pago) {
        case 1:
          element.metodo_de_pago = "Efectivo";
          break;
        case 2:
          element.metodo_de_pago = "Transferencia";
          break;
        default:
          element.metodo_de_pago = "Tarjeta";
          break;
      }
    });

    data.payments = select_agents_salaries_payments;
  }

  return data;
}

async function getServicesPayments(filters: FinancesFiltersInterface) {
  let data = {
    total: 0,
    payments: [],
  };

  const [select_payments_services]: any = await pool.query(
    `SELECT p.*,a.nombre,a.apellido_paterno,a.apellido_paterno FROM pagos p INNER JOIN agentes a ON a.id = p.agente_id   WHERE p.id > 0 ${filters.services_payments_start_date} ${filters.services_payments_end_date}`
  );
  if (select_payments_services.length > 0) {
    select_payments_services.map((element: any) => {
      data.total += element.cantidad;
      element.fecha_pago = moment(element.fecha_pago).format(
        "YYYY-MM-DD hh:mm:ss"
      );
      switch (element.metodo_de_pago) {
        case 1:
          element.metodo_de_pago = "Efectivo";
          break;
        case 2:
          element.metodo_de_pago = "Transferencia";
          break;
        default:
          element.metodo_de_pago = "Tarjeta";
          break;
      }
    });
    data.payments = select_payments_services;
  }

  return data;
}

async function getInscriptionsPayments(filters: FinancesFiltersInterface) {
  let data = {
    total: 0,
    payments: [],
  };

  const [select_inscriptions_payments_services]: any = await pool.query(
    `SELECT uca.*,c.nombre as categoria_nombre,u.nombre as usuario_nombre,u.apellido_paterno as usuario_apellido_paterno,u.apellido_materno as usuario_apellido_materno FROM usuarios_categorias_abonos uca INNER JOIN usuarios_categorias uc ON uca.inscripcion_id = uc.id INNER JOIN categorias c ON c.id = uc.categoria_id INNER JOIN usuarios u ON u.id = uc.usuario_id WHERE uca.id > 0  ${filters.inscription_deposit_start_date} ${filters.inscription_deposit_end_date}`
  );
  if (select_inscriptions_payments_services.length > 0) {
    select_inscriptions_payments_services.map((element: any) => {
      data.total += element.monto;
      element.fecha = moment(element.fecha).format(
        "YYYY-MM-DD hh:mm:ss"
      );
      switch (element.metodo_de_pago) {
        case 1:
          element.metodo_de_pago = "Efectivo";
          break;
        case 2:
          element.metodo_de_pago = "Transferencia";
          break;
        default:
          element.metodo_de_pago = "Tarjeta";
          break;
      }
    });
    data.payments = select_inscriptions_payments_services;
  }

  return data;
}



//EARNINGS GROUPED BY CATEGORIES AUX METHODS
async function getMonthlyPayments(filters: FinancesFiltersInterface) {

  const [select_monthly_payments]: any = await pool.query(
    `SELECT m.*,p.desceunto as promocion_descuento FROM mensualidades m INNER JOIN usuarios u ON u.id = m.usuario_id INNER JOIN promociones p ON p.id = m.promocion_id  WHERE m.id > 0 ${filters.monthly_payments_start_date} ${filters.monthly_payments_end_date}`
  );

  return select_monthly_payments;
}


async function earningsGroupedByCategoriesStructureData(mensualities:any[]){

    let data_structured = {
        total_benefit_academy: 0,
        total_amount_discounts: 0,
        total_benefit_instructor: 0,
        mensualities: [] as any
    }

    mensualities.map((mensuality:any) => {
        let aux_mensuality_data = {
            user: `${mensuality.user_name} ${mensuality.user_last_name} ${mensuality.user_second_last_name}`,
            mensuality_id: mensuality.id,
            category_amount_payed: mensuality.categoria_monto_pagado,
            category_discount_amount: mensuality.categoria_monto_descuento,
            category_price:mensuality.categoria_costo,
            instructor_benefit:mensuality.categoria_beneficio_instructor,
            instructor_benefit_amount: 0,
            academy_benefit:mensuality.categoria_beneficio_academia,
            acadmey_benefit_amount: 0,
        }

        aux_mensuality_data.acadmey_benefit_amount = ((aux_mensuality_data.academy_benefit * aux_mensuality_data.category_amount_payed) / 100)
        aux_mensuality_data.instructor_benefit_amount = ((aux_mensuality_data.instructor_benefit * aux_mensuality_data.category_amount_payed) / 100)
      
        data_structured.total_amount_discounts += mensuality.categoria_monto_descuento
        data_structured.total_benefit_academy += aux_mensuality_data.acadmey_benefit_amount 
        data_structured.total_benefit_instructor += aux_mensuality_data.instructor_benefit_amount 

        data_structured.mensualities.push(aux_mensuality_data)

    })

    return data_structured

}


export {
  selectPendingMonthlyPayments,
  selectPayedMonthlyPayments,
  selectBussinesServicesPayments,
  selectCommodityPayments,
  selectMonthlyPaymentsDeposits,
  selectAccountPayableDeposits,
  selectCashFlow,
  selectEarningsGroupedByCategories,
  getMonthlyPayments,
};
