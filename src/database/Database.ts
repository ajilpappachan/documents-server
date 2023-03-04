import mongoose from "mongoose";
import IDocument from "../interfaces/common/IDocument";
import IDatabase from "../interfaces/IDatabase";
import Document from "./Document";

export default class Database implements IDatabase {
	constructor(url?: string, onConnect?: () => void) {
		if (!url) {
			console.error("Database Url not found");
			return;
		}
		mongoose.set("strictQuery", false);
		mongoose.connect(url, () => {
			console.log("Connected to database");
			onConnect && onConnect();
		});
	}

	public CreateDocument = async (document: IDocument): Promise<IDocument> => {
		return await Document.create(document);
	};

	public FindAllDocuments = async (): Promise<IDocument[]> => {
		return await Document.find({});
	};

	public FindDocument = async (id: string): Promise<IDocument | null> => {
		return await Document.findOne({ id });
	};

	public UpdateDocument = async (
		id: string,
		newDocument: IDocument
	): Promise<IDocument | null> => {
		return await Document.findOneAndUpdate({ id }, newDocument);
	};

	public DeleteDocument = async (id: string): Promise<IDocument | null> => {
		return await Document.findOneAndDelete({ id });
	};

	public GetTypes = async (): Promise<string[]> => {
		return await Document.distinct("type");
	};

	public GetCategories = async (): Promise<string[]> => {
		return await Document.distinct("category");
	};

	public ClearDatabase = async (): Promise<void> => {
		await Document.deleteMany({});
		return;
	};

	public CloseConnection = async (): Promise<void> => {
		mongoose.disconnect();
	};
}
