3;
import moment from "moment";
import { pool } from "../config/mysql_connection";
import { AccountsReceivableFilters } from "../interfaces/accounts-receivable/accounts-receivable.filters.interface";
import {
  Res as ResponseInterface,
  ResClass,
  Res,
} from "../interfaces/response/response";
import { whatss_app_web_client } from "../utils/whatss-app-web";
import { io } from "../app";

const newResClassInstance = new ResClass();

const insertNotification = async () => {
  let response: ResponseInterface = newResClassInstance.CreateNewResponse(
    false,
    [],
    false,
    ""
  );

  try {
    const [insert_notification_result]: any = await pool.query(
      "INSERT INTO notifications (id,message,date_of_issue)  VALUES (?,?,?)"
    );

    if (!insert_notification_result.insertId) {
      response.result = false;
      response.message = "Notification was not inserted";
      response.code = 500;
      return response;
    }

    const [select_users]: any = await pool.query(
      "SELECT id FROM users WHERE status = 1"
    );

    if (select_users.length == 0) {
      response.result = false;
      response.message = "Error trying to get the users to send the notification";
      response.code = 500;
      return response;
    }

    select_users.map(async (user:any) => {

      const [insert_notification_users]: any = await pool.query(
        "INSERT usuarios_notificaciones (id,user_id,notification_id,readAt,markAsRead) VALUES (?,?,?,?,?)" , [null,user.id,insert_notification_result.insertId,null,null]
      );

      
    })




    response.result = true;
    response.message = "Notification save successfuly";
    response.code = 200;

    io.emit('new_notification')
    
    return response;

  } catch (error) {
    console.log("error", error);

    response.result = false;
    response.message = "An error occurred while trying to insert the notification";
    response.data = error;
    response.code = 500;
    return response;
  }
};

const selecttNotifications = async (user_id:string) => {
  let response: ResponseInterface = newResClassInstance.CreateNewResponse(
    false,
    [],
    false,
    ""
  );

  try {
    const [select_notification_result]: any = await pool.query(
      "SELECT * FROM users_notifications  WHERE user_id =  ?",[user_id]
    );
    
    if (select_notification_result.length == 0) {
      response.result = false;
      response.message = "Notification was not found";
      response.code = 500;
      return response;
    }

    response.result = true;
    response.message = "Notification found successfuly";
    response.code = 200;
    return response;

  } catch (error) {
    console.log("error", error);

    response.result = false;
    response.message = "An error occurred while trying to found the notifications";
    response.data = error;
    response.code = 500;
    return response;
  }
};

export { insertNotification,selecttNotifications };
