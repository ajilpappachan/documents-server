import IServer from "../interfaces/IServer";
import express, { Application } from "express";
import IRouter from "../interfaces/IRouter";
import IDatabase from "../interfaces/IDatabase";

export default class Server implements IServer {
	private _port: string;
	private _app: Application;
	private _database?: IDatabase;

	constructor(port: string | number) {
		this._port = port.toString();
		this._app = express();
	}

	public AddRouter = (router: IRouter): void => {
		this._app.use(router.BaseUrl, router.Router);
		router.Initialize();
	};

	public AddDatabase = (database: IDatabase): void => {
		this._database = database;
	};

	public Listen = (): void => {
		this._app.listen(this._port, () => {
			console.log("Server listening on port " + this._port);
		});
	};
}
