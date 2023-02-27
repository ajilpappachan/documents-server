import dotenv from "dotenv";
import BaseRouter from "./BaseRouter";
import IRouter from "./interfaces/IRouter";
import IServer from "./interfaces/IServer";
import Server from "./Server";

dotenv.config();

const server: IServer = new Server(process.env.PORT || 8000);
const router: IRouter = new BaseRouter("/");

server.AddRouter(router);
server.Listen();
