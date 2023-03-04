import dotenv from "dotenv";
import BaseRouter from "./server/BaseRouter";
import IRouter from "./interfaces/IRouter";
import IServer from "./interfaces/IServer";
import Server from "./server/Server";
import IDatabase from "./interfaces/IDatabase";
import Database from "./database/Database";

dotenv.config();

const server: IServer = new Server(process.env.PORT || 8000);
const database: IDatabase = new Database(process.env.DATABASEURL);
const router: IRouter = new BaseRouter("/", database);

server.AddRouter(router);
server.AddDatabase(database);
server.Listen();
