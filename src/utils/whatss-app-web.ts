const { Client, LocalAuth, NoAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const qrcode2 = require("qrcode");
import { env } from "node:process";
import { io } from "../app";
const fs = require("fs");
const path = require("path");
import { rimraf } from "rimraf";

const whatss_app_web_client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    executablePath: process.env.PUPPETER_CHROMIUM_EXECUTABLE_PATH,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: true, // Desactivar modo headless para depurar
  },
});

try {
  // Generar y mostrar el QR code en la terminal para iniciar sesión

  whatss_app_web_client.on("qr", async (qr: any) => {
    const qrCodeDataURL = await qrcode2.toDataURL(qr);
    io.emit("qr_ready", qrCodeDataURL);
  });

  whatss_app_web_client.on("ready", (res: any) => {
    io.emit("whatss_app_client_ready");
  });

  whatss_app_web_client.on("disconnected", async (reason: any) => {
    io.emit("whatss_app_client_disconnected");
    // Reintentar la conexión después de un retraso
    setTimeout(() => {
      whatss_app_web_client.initialize();
    }, 2000); // Reintentar después de 5 segundos
  });
//
  //whatss_app_web_client.initialize()

} catch (error) {
  console.log("Whatss app client error", error);
}

export { whatss_app_web_client };
