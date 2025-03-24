import { log } from "console";
import "dotenv/config"
import { createPool } from "mysql2/promise";


// create the connection to database
let mysqlConfigConnection = {
    host: '',
    user: '',
    database: '',
    port: 0,
    password:''

}

switch (process.env.NODENV) {
    case 'DEVELOPMENT':

        
        mysqlConfigConnection.database = process.env.DEV_DB_NAME!
        mysqlConfigConnection.host = process.env.DEV_DB_HOST!
        mysqlConfigConnection.user = process.env.DEV_DB_USER!
        mysqlConfigConnection.port = parseInt(process.env.DEV_DB_PORT!)
        mysqlConfigConnection.password = process.env.DEV_DB_PASSWORD!
        break;

    default:
        mysqlConfigConnection.database = process.env.PRODUCTION_DB_NAME!
        mysqlConfigConnection.host = process.env.PRODUCTION_DB_HOST!
        mysqlConfigConnection.user = process.env.PRODUCTION_DB_USER!
        mysqlConfigConnection.port = parseInt(process.env.PRODUCTION_DB_PORT!)
        mysqlConfigConnection.password = process.env.PRODUCTION_DB_PASSWORD!
        break;
}

export const pool =  createPool(mysqlConfigConnection);

export function tryConnection(){
    try {
        pool.getConnection().then(res => {
            console.log('CONNECTED TO THE DATABASE');
        })
        .catch(error => [
            console.log(`SOMEGTHING WHENT WRONG TO CONNECT AT THE DATABSE - ${error}`)
        ])
    } catch (error) {
        console.log('ERROR TO CONNECT TO THE DATABASE',error);
    }
}


export default {pool,tryConnection}; 