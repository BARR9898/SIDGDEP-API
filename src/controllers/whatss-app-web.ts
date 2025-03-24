import { Request, Response, query } from "express";
import { Res, Res as ResponseInterface } from "../interfaces/response/response";
import { handleHttp } from "../middelwares/error.handle";
import {
  createQR,
  getWhatssAppWebClient,
} from "../services/whatss-app-messages";
import { io } from "../app";

const qrcode = require("qrcode-terminal");
const qrcode2 = require("qrcode");
import { whatss_app_web_client } from "../utils/whatss-app-web";
let qrCodeDataURL = "";



const sendMessage = async ({ body }: Request, res: Response) => {
  try {
    const number = body.phone;
    const message = body.message;
  } catch (error) {
    handleHttp(res, "An error ocurred trying to send the whatss app message");
  }
};

const generateQR = async ({ query }: Request, res: Response) => {
  try {
    const whatss_app_web_client_status = await whatss_app_web_client.getState();

    if (whatss_app_web_client_status != "CONNECTED") {
      whatss_app_web_client.initialize()
    }

    if (qrCodeDataURL) {
      res.status(200).json({ qr: qrCodeDataURL });
    } else {
      res
        .status(404)
        .json({ message: "QR no disponible todavía", loading: true });
    }
  } catch (error) {
    console.log("error controller", error);

    handleHttp(res, "An error ocurred trying to send the whatss app message");
  }
};

const getWhatssAppClientStatusController = async (
  {}: Request,
  res: Response
) => {
  try {
    const responseItem: Res = await getWhatssAppWebClient();
    res.status(responseItem.code!);
    res.send(responseItem);
  } catch (error) {
    console.log("error controller", error);
    handleHttp(
      res,
      "An error ocurred trying to get the whatss app client status"
    );
  }
};

export { sendMessage, generateQR, getWhatssAppClientStatusController };
