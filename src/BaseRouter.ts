import { Request, Response, Router } from "express";
import IRouter from "./interfaces/IRouter";

export default class BaseRouter implements IRouter {
	private _baseUrl: string;
	private _router: Router;

	public get BaseUrl() {
		return this._baseUrl;
	}

	public get Router() {
		return this._router;
	}

	constructor(baseUrl: string) {
		this._baseUrl = baseUrl;
		this._router = Router();
	}

	public Initialize = (): void => {
		this._router.get("/", (req: Request, res: Response) => {
			res.send("Hello World!");
		});
	};
}
