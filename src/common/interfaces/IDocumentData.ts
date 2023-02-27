import IDocument from "./IDocument";

export default interface IDocumentData {
	types: string[];
	categories: string[];
	documents: IDocument[];
}
