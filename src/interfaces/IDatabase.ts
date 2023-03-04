import IDocument from "./common/IDocument";

export default interface IDatabase {
	CreateDocument: (document: IDocument) => Promise<IDocument>;
	FindAllDocuments: () => Promise<IDocument[]>;
	FindDocument: (id: string) => Promise<IDocument | null>;
	UpdateDocument: (
		id: string,
		newDocument: IDocument
	) => Promise<IDocument | null>;
	DeleteDocument: (id: string) => Promise<IDocument | null>;
	GetTypes: () => Promise<string[]>;
	GetCategories: () => Promise<string[]>;
	ClearDatabase: () => Promise<void>;
	CloseConnection: () => Promise<void>;
}
