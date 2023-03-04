import { Request, Response, Router } from "express";
import IDocument from "../interfaces/common/IDocument";
import IDocumentData from "../interfaces/common/IDocumentData";
import IDatabase from "../interfaces/IDatabase";
import IRouter from "../interfaces/IRouter";

export default class BaseRouter implements IRouter {
	private _baseUrl: string;
	private _router: Router;
	private _database: IDatabase;

	public get BaseUrl() {
		return this._baseUrl;
	}

	public get Router() {
		return this._router;
	}

	constructor(baseUrl: string, database: IDatabase) {
		this._baseUrl = baseUrl;
		this._router = Router();
		this._database = database;
	}

	private filterDocumentData = (document: IDocument): IDocument => {
		return {
			id: document.id,
			name: document.name,
			type: document.type,
			category: document.category,
		};
	};

	public Initialize = (): void => {
		this._router.get("/", async (req: Request, res: Response) => {
			const documents = (
				await this._database.FindAllDocuments()
			).map<IDocument>((item) => this.filterDocumentData(item));
			const types = await this._database.GetTypes();
			const categories = await this._database.GetCategories();
			const documentData: IDocumentData = {
				types,
				categories,
				documents,
			};
			res.send(documentData);
		});
	};
}
