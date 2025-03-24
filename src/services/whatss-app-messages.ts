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
const newResClassInstance = new ResClass()



const createQR = async () => {
  let response: ResponseInterface = newResClassInstance.CreateNewResponse(
    false,
    [],
    false,
    ""
  );

  try {



  } catch (error) {
    console.log("error", error);

    response.result = false;
    response.message = "An error occurred while trying to insert the user";
    response.data = error;
    response.code = 500;
    return response;
  }
};


const getWhatssAppWebClient = async () : Promise<ResponseInterface> =>  {

  let response:ResponseInterface = newResClassInstance.CreateNewResponse(false,[],false,'')

  try {

      const whatss_app_web_client_status  = await whatss_app_web_client.getState()

      if ( whatss_app_web_client_status != 'CONNECTED') {
          response.code = 500
          response.error = true
          response.message = 'Whatss app client is not connected'
          response.result =  false
          return response
      }

      response.code = 200
      response.error = false
      response.message = 'Whatss app client is connected'
      response.result =  true
      return response
      
  } catch (error) {
      console.log('error',error);
      
      response.result = false
      response.message = 'An error occurred while trying to insert the user'
      response.data = error
      response.code = 500
      return response 
  }
}

export { 
  createQR,
  getWhatssAppWebClient
 };
