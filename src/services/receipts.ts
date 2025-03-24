import { pool } from "../config/mysql_connection";
import { MessageMedia } from "whatsapp-web.js";
import { io } from "../app";
import {
  Res as ResponseInterface,
  ResClass,
  Res,
} from "../interfaces/response/response";

const newResClassInstance = new ResClass();
const fs = require("fs");
const PDFDocument = require("pdfkit");
import moment from "moment";

const sendMonthlyPaymentReceipt = async (
  mensuality_id: string
): Promise<ResponseInterface | any> => {
  let response: ResponseInterface = newResClassInstance.CreateNewResponse(
    false,
    [],
    false,
    ""
  );

  try {
    const [select_mensuality_data]: any = await pool.query(
      "SELECT * FROM mensualidades m WHERE m.id = ? ",
      [mensuality_id]
    );

    let data = select_mensuality_data[0];

    const [select_user_data]: any = await pool.query(
      "SELECT u.nombre as user_name,u.apellido_paterno as user_last_name,u.telefono as user_phone FROM usuarios u WHERE u.id = ?",
      [data.usuario_id]
    );

    const [select_promoiton_data]: any = await pool.query(
      "SELECT p.nombre as promotion_name,p.descuento as promotion_discount FROM promociones p INNER JOIN mensualidades m ON p.id =  m.promocion_id WHERE m.id = ?",
      [data.id]
    );

    if (select_user_data.length == 0) {
      response.message = "User does not exist";
      response.data = [];
      response.code = 500;
      response.error = true;
      response.result = false;
      return response;
    }

    if (select_promoiton_data.length > 0) {
      data.promotion_name = select_promoiton_data[0].promotion_name;
      data.promotion_discount = select_promoiton_data[0].promotion_discount;
    }

    data.user_name = select_user_data[0].user_name;
    data.user_last_name = select_user_data[0].user_last_name;
    data.user_phone = select_user_data[0].user_phone;

    const [select_categories_data]: any = await pool.query(
      "SELECT mc.*,c.nombre,c.costo FROM mensualidades_categorias mc INNER JOIN categorias c ON c.id =  mc.categoria_id WHERE mc.mensualidad_id = ?",
      [data.id]
    );

    if (select_categories_data.length == 0) {
      response.data = [];
      response.message = "Categories not found";
      response.code = 500;
      response.error = true;
      response.result = false;
      return response;
    }

    data.categories = select_categories_data;

    // Crear el recibo en PDF
    const doc = new PDFDocument({ margin: 50 });
    let buffers: any = [];

    doc.on("data", buffers.push.bind(buffers)); // Guardamos los datos del PDF en memoria

    // Fondo gris tenue
    doc.rect(0, 0, doc.page.width, doc.page.height).fill('#f0f0f0'); // Fondo gris claro

    // Encabezado con logo (si se desea agregar uno)
    doc.image('src/assets/Wuseng.jpg', 55, 55, { width: 100 }); // Aumenté el tamaño del logo

    // Crear espacio adicional debajo del logo
    doc.moveDown(3); // Aquí agregamos un espacio de tres líneas antes de "Información General"

    // Título
    doc
      .font("Helvetica-Bold")
      .fontSize(22)
      .fillColor('#5EBE3C') // Color verde para "Dancelite"
      .text("Wuseng", { align: "center" });

    doc.moveDown(0.7);
    doc
      .font("Helvetica-Bold")
      .fontSize(14)
      .fillColor('#000000') // Color negro
      .text("Recibo de pago", { align: "center" });

    doc.moveDown(1);

    // Información General - Mejor visualización
    doc
      .font("Helvetica-Bold")
      .fontSize(14)
      .fillColor('#000000') // Color negro
      .text("Información General", { align: "left" });

    // Línea divisoria debajo de "Información General" (color verde)
    doc.moveTo(50, doc.y + 10)
      .lineTo(550, doc.y + 10)
      .strokeColor("#5EBE3C") // Color verde
      .lineWidth(2)
      .stroke(); // Línea divisoria

    doc.moveDown(1);

    // Datos del cliente
    doc.font("Helvetica").fontSize(12).text(`Usuario: ${data.user_name} ${data.user_last_name}`);
    doc.text(`Fecha: ${moment().format("YYYY-MM-DD hh:mm:ss")}`);
    doc.text(`Menusalidad Id: ${data.id}`);
    doc.text(`Fecha Inicio: ${moment(data.fecha_inicio).format("YYYY-MM-DD hh:mm:ss")}`);
    doc.text(`Fecha Fin: ${moment(data.fecha_fin).format("YYYY-MM-DD hh:mm:ss")}`);
    doc.text(`Promoción: ${data.promotion_name}`);

    doc.moveDown(2);

    // Categorías - sin subrayado
    doc
      .font("Helvetica-Bold")
      .fontSize(12)
      .fillColor('#000000') // Color negro
      .text("Categorías", { align: "left" });

    // Línea divisoria debajo de "Categorías" (color verde)
    doc.moveTo(50, doc.y + 10)
      .lineTo(550, doc.y + 10)
      .strokeColor("#5EBE3C") // Color verde
      .lineWidth(2)
      .stroke(); // Línea divisoria de las categorías

    doc.moveDown(1);

    data.categories.forEach((item: any) => {
      doc
        .font("Helvetica")
        .fontSize(11)
        .text(
          `Categoría: ${item.nombre} | Costo: ${item.costo} $MXN | Descuento: ${item.descuento} $MXN | Pagado: $${item.pagado} $MXN`,
          { align: "left" }
        );
      doc.moveDown(0.5);
    });

    doc.moveDown(2);

    // Línea divisoria adicional después de Categorías
    doc.moveTo(50, doc.y + 10)
      .lineTo(550, doc.y + 10)
      .strokeColor("#5EBE3C") // Color verde
      .lineWidth(2)
      .stroke(); // Línea divisoria adicional

    doc.moveDown(2);

    // Subtotal, Descuento y Total con mejor formato
    doc
      .font("Helvetica-Bold")
      .fontSize(12)
      .fillColor('#000000') // Color negro
      .text(`Subtotal: ${data.subtotal} $MXN`, { align: "right", bold: true });

    doc
      .font("Helvetica-Bold")
      .fontSize(12)
      .fillColor('#000000') // Color negro
      .text(`Descuento: ${data.promotion_discount} $MXN`, { align: "right", bold: true });

    doc
      .font("Helvetica-Bold")
      .fontSize(12)
      .fillColor('#000000') // Color negro
      .text(`Total: ${data.total} $MXN`, { align: "right", bold: true });

    doc.moveDown(1);

    // Pie de página
    doc.fontSize(12).fillColor('#000000').text("¡Gracias por tu pago!", { align: "center" });

    // Esperar a que el documento termine de generarse
    const generatePdfPromise = new Promise((resolve, reject) => {
      doc.end(); // Cerrar el documento PDF

      doc.on("end", () => {
        const pdfBuffer = Buffer.concat(buffers); // Crear el buffer del PDF
        const pdfBase64 = pdfBuffer.toString("base64"); // Convertir el buffer a base64

        response.data = pdfBase64; // Asignamos el PDF en base64 al campo data
        response.code = 200;
        response.message = "PDF generado correctamente";
        response.result = true;

        resolve(response); // Resolvemos la promesa
      });

      doc.on("error", (err: any) => {
        reject(err); // Si ocurre un error, rechazamos la promesa
      });
    });

    // Esperamos que el PDF esté listo antes de devolver la respuesta
    const finalResponse = await generatePdfPromise;
    return finalResponse;

  } catch (error) {
    console.error("Error en la generación del recibo: ", error);
    response.code = 500;
    response.error = true;
    response.data = error;
    response.result = false;
    return response;
  }
};

export { sendMonthlyPaymentReceipt };
