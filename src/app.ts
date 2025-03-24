import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./routes";
import { tryConnection } from "./config/mysql_connection";
import { notifyNextMmonthlyPaymentsDue } from "./services/notifyNextMonthlypaymentsDue";
import { Server } from "socket.io";
import { createServer } from "node:http";

const PORT = process.env.DEV_PORT;
const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
const server = createServer(app);

 //
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["*/*"],
    credentials: false  
  },
  
});

tryConnection();

io.on("connection", (socket: any) => {
  console.log("socket connected");

  socket.on('get_next_monthly_payments_due',() => {
    notifyNextMmonthlyPaymentsDue()
  })

  socket.on('evaluate_whatss_app_client_status',() => {
    notifyNextMmonthlyPaymentsDue()
  })

});

server.listen(PORT, () => {
  console.log(`***APLICACION CORRIENDO EN PUERTO ${PORT}***`);
});

export {io}
