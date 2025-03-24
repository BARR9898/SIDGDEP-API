import { pool } from "../config/mysql_connection";
import { Auth as AuthInterface } from "../interfaces/auth/auth";
import { Res as ResponseInterface, ResClass } from "../interfaces/response/response";
import { verfied } from "../utils/bcrypt.handle";
import { generateAuthTemporalToken, generateToken } from "../utils/jwt.handle";
import { encrypt } from "../utils/bcrypt.handle";

const nodemailer = require("nodemailer");


const loginService = async ({ email, password }: AuthInterface): Promise<ResponseInterface> => {
    const newResInstance = new ResClass()
    let response: ResponseInterface = newResInstance.CreateNewResponse(false, [], false, '')
    try {

        //Verify is user exist
        const checkIs = await getUserByEmail(email)
        if (!checkIs) {
            response.result = false
            response.error = false
            response.data = []
            response.message = 'USER NOT FOUND'
            return response
        }

        //Verify is password is correct
        const passwordHash = checkIs.password; //Password encriptada desde BDD
        const isCorrect = await verfied(password, passwordHash);
        if (!isCorrect) {
            response.result = false
            response.error = false
            response.data = []
            response.message = 'PASSWORD INCORRECT'
            return response

        }


        //Generate token user
        const token = generateToken(checkIs.email);
        const data = {
            token,
            user: {
                id: checkIs.id,
                nombre: checkIs.nombre,
                apellido_paterno: checkIs.apellido_paterno,
                apellido_materno: checkIs.apellido_materno,
                rol: checkIs.rol,



            }
        }
        response.result = false
        response.error = false
        response.data = data
        response.message = 'Loged successfuly'
        return response


    } catch (error) {
        response.result = false
        response.error = true
        response.data = error
        response.message = 'An error ocurred trying to login'
        return response
    }

}

const verifyUserService = async (email: string): Promise<ResponseInterface> => {
    const newResInstance = new ResClass()
    let response: ResponseInterface = newResInstance.CreateNewResponse(false, [], false, '')
    try {

        //Verify is user exist
        const checkIs = await getUserByEmail(email)
        if (!checkIs) {
            response.result = false
            response.error = false
            response.data = []
            response.message = 'USER NOT FOUND'
            return response
        }

        response.result = true
        response.error = false
        response.data = checkIs
        response.message = 'USER EXIST'
        return response


    } catch (error) {
        response.result = false
        response.error = true
        response.data = error
        response.message = 'An error ocurred trying to verify if user exist'
        return response
    }

}

async function getUserByEmail(email: string) {
    try {
        const [rows]: any = await pool.query("SELECT * FROM agentes WHERE correo = ?", [email])
        return rows[0]
    } catch (error) {
        console.log(`Error trying to verify if agent exist - ${error}`);

    }


}

const setPasswordService = async (password: string, id: string): Promise<ResponseInterface> => {
    const newResInstance = new ResClass()
    let response: ResponseInterface = newResInstance.CreateNewResponse(false, [], false, '')
    try {

        const passHashed = await encrypt(password) //Hashing the new password
        let [set_password_result]: any = await pool.query('UPDATE agentes SET password = ? WHERE id = ?', [passHashed, id])

        if (set_password_result.affectedRows < 1) {
            response.result = false
            response.error = false
            response.message = 'Password wasnt updated'
            return response
        }

        response.result = true
        response.error = false
        response.message = 'Password updated'
        return response


    } catch (error) {
        console.log('error',error);
        
        response.result = false
        response.error = true
        response.data = error
        response.message = 'An error ocurred trying to update the password'
        return response
    }

}

const sendEmailAuth = async (email: string): Promise<ResponseInterface> => {
    const newResInstance = new ResClass()
    let response: ResponseInterface = newResInstance.CreateNewResponse(false, [], false, '')
    try {

        const token =  await generateAuthTemporalToken()
        
        if (token == null) {
            response.result = false
            response.error = true
            response.message = 'Token was not generated'
            response.code = 500
            return response
        }

        const [select_company_result]:any = await pool.query('SELECT * FROM empresa')
        if (select_company_result.length == 0) {

            response.code = 500
            response.data = []
            response.error = true
            response.message = 'Data company was not found'
 
        }        

        const company_email = select_company_result[0].correo
        const gmail_key = select_company_result[0].gmail_key

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: company_email,
                pass: gmail_key,
            },
        });


        const url = `${process.env.URL}/public/${token}`

        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: email, // sender address
            to: email, // list of receivers
            subject: "Acceso temporal", // Subject line
            text: "Da click en el siguiente enlace para iniciar el proseso de registro: ", // plain text body
            html: `Da click en el enlace para inciar sesión: ${url}`, // html body
        });

        if (info.rejected.length > 0) {
            response.result = false
            response.error = true
            response.message = 'Email was not send'
            response.code = 500
            return response
        }


        response.result = true
        response.error = false
        response.message = 'Email send successfuly'
        response.code = 200
        return response


    } catch (error) {
        response.result = false
        response.error = true
        response.data = error
        response.message = 'An error ocurred trying to update the password'
        response.code = 500

        return response
    }

}

export { loginService, verifyUserService, setPasswordService, sendEmailAuth };