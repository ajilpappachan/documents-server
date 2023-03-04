import Database from "../database/Database";
import IDocument from "../interfaces/common/IDocument";
import dotenv from "dotenv";

dotenv.config();

const data: IDocument[] = [
	{
		id: "1",
		name: "test document 1",
		type: "pdf",
		category: "Academic",
	},
	{
		id: "2",
		name: "test document 2",
		type: "pdf",
		category: "Academic",
	},
	{
		id: "3",
		name: "test document 3",
		type: "jpg",
		category: "Government",
	},
	{
		id: "4",
		name: "test document 4",
		type: "jpg",
		category: "Professional",
	},
	{
		id: "5",
		name: "test document 5",
		type: "pdf",
		category: "Government",
	},
];

const database = new Database(process.env.DATABASEURL, async () => {
	await database.ClearDatabase();
	for (const item of data) {
		await database.CreateDocument(item);
		console.log("Added Item with id " + item.id);
	}
	await database.CloseConnection();
});
