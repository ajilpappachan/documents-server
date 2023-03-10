import ICategory from "./ICategory";
import IDocument from "./IDocument";
import IType from "./IType";

export default interface IDocumentData {
	types: IType[];
	categories: ICategory[];
	documents: IDocument[];
}
