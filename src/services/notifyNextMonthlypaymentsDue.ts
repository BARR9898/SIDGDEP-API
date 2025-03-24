import moment from "moment";
import { pool } from "../config/mysql_connection";
import { whatss_app_web_client } from "../utils/whatss-app-web";

const notifyNextMmonthlyPaymentsDue = async () => {
  
  try {
    const actual_date = moment(); //Get actual date
    const current_date_plus_one_week = moment()
      .add(1, "week")
      .format("YYYY-MM-DD"); //Add one week to actual date



    //Select all the mensaulities where the end date is from now to one week
    const [select_next_monthly_payments_due_result]: any = await pool.query(
      `SELECT m.id as mensuality_id,u.id as user_id,u.telefono as user_phone,u.nombre as user_name,u.apellido_paterno as user_last_name FROM mensualidades m INNER JOIN usuarios u ON m.usuario_id = u.id WHERE m.fecha_fin >= '${moment(
        current_date_plus_one_week
      ).format("YYYY-MM-DD 00:00:00")}' AND m.fecha_fin <= '${moment(
        current_date_plus_one_week
      ).format("YYYY-MM-DD 23:59:59")}' AND m.isNotified = false `
    );

    
    //If exist mensialities that expire on one week
    if (select_next_monthly_payments_due_result.length > 0) {
      //Array that save the mensuality data and user data to send the watss app message
      let mensualitys_data: any[] = [];

      select_next_monthly_payments_due_result.map((data: any) => {
        let aux_data = {
          user_name: `${data.user_name} ${data.user_last_name}`,
          user_phone: data.user_phone,
          mensuality_id: data.mensuality_id,
        };
        mensualitys_data.push(aux_data); //Push the mensuality data and user data structured to te array
      });

      if (mensualitys_data.length > 0) {
        //For every one mensuality data, send the whatss app message to the phone user
        mensualitys_data.forEach((mensuality_data: any) => {
          let message = `Hola ${mensuality_data.user_name} recuerda que tu mensualidad vence el ${current_date_plus_one_week}`;
          whatss_app_web_client
            .sendMessage(`521${mensuality_data.user_phone}@c.us`, message)
            .then(async (response: any) => {
                //When the message is send, update de mensuality to notified
              const [update_nofity_mensuality]: any = await pool.query(
                `UPDATE mensualidades SET isNotified = ? WHERE id = ?`,
                [true, mensuality_data.mensuality_id]
              );
            })
            .catch((err: any) => {
              console.error(
                `Error al enviar el mensaje a ${mensuality_data.user_phone}:`,
                err
              );
            });
        });
      }
    }
  } catch (error) {
    console.log("notifyNextMmonthlyPaymentsDue error", error);
  }
};

export { notifyNextMmonthlyPaymentsDue };
