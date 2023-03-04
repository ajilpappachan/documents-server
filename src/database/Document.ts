import { model, Schema } from "mongoose";
import IDocument from "../interfaces/common/IDocument";

const documentSchema = new Schema<IDocument>({
	id: String,
	name: String,
	type: String,
	category: String,
});

export default model<IDocument>("Document", documentSchema);
