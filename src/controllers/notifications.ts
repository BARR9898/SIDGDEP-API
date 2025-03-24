import { Request, Response, query } from "express";
import { Res as ResponseInterface } from "../interfaces/response/response";
import { handleHttp } from "../middelwares/error.handle";
import { createQR } from "../services/whatss-app-messages";
import { io } from "../app";
import { insertNotification, selecttNotifications } from "../services/notifications";



const postNotification = async ({ body }: Request, res: Response) => {
  try {
    const response:ResponseInterface = await insertNotification()
    res.status(response.code!)
    res.send(response)

  } catch (error) {
    handleHttp(res, "An error ocurred trying to save the notification");
  }
};

const getNotifications = async ({ body }: Request, res: Response) => {
  try {
    const {user_id} =  body
    const response:ResponseInterface = await selecttNotifications(user_id)
    res.status(response.code!)
    res.send(response)

  } catch (error) {
    handleHttp(res, "An error ocurred trying to save the notification");
  }
};


export { postNotification,getNotifications };
