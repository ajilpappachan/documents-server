import IDocument from "../interfaces/common/IDocument";
import { readdirSync } from "fs";
import * as path from "path";
import { v4 as uuid } from "uuid";
import Database from "../database/Database";
import dotenv from "dotenv";

dotenv.config();

const getDocuments = (): IDocument[] => {
	const results: IDocument[] = [];
	const typeSet = new Set<string>();
	const categorySet = new Set<string>();

	const dir = path.join(__dirname, "../../documents/");
	const types = ["jpg", "pdf"];

	for (const type of types) {
		typeSet.add(type);
		const categories = readdirSync(path.join(dir, type), {
			withFileTypes: true,
		})
			.filter((dirent) => dirent.isDirectory())
			.map((dirent) => dirent.name);

		for (const category of categories) {
			categorySet.add(category);
			const documents = readdirSync(path.join(dir, type, category), {
				withFileTypes: true,
			})
				.filter((dirent) => dirent.isFile())
				.map((dirent) => dirent.name);

			for (const document of documents) {
				const documentData: IDocument = {
					id: uuid(),
					name: `${path.parse(document).name}${path.parse(document).ext}`,
					type: type,
					category: category,
				};
				results.push(documentData);
			}
		}
	}
	return results;
};

const documents = getDocuments();
const database = new Database(process.env.DATABASEURL, async () => {
	await database.ClearDatabase();
	for (const item of documents) {
		await database.CreateDocument(item);
		console.log("Added Item with id " + item.id);
	}
	await database.CloseConnection();
});
