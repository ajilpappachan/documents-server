import axios from "axios";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import Select from "../components/Select";
import IDocumentData from "../src/interfaces/common/IDocumentData";

interface indexProps {
	backendUrl: string;
	documentData: IDocumentData;
}

const index = ({ backendUrl, documentData }: indexProps) => {
	const [type, setType] = useState("");
	const [category, setCategory] = useState("");
	const [document, setDocument] = useState("");

	return (
		<div>
			<h1>Documents</h1>
			<form
				action={
					new URL(
						`${type || "null"}/${category || "null"}/${document || "null"}`,
						backendUrl
					).href
				}
			>
				<Select
					id="type"
					name="Type"
					values={documentData.types.map((item) => ({
						key: item,
						value: item,
					}))}
					onChange={setType}
				/>
				<Select
					id="category"
					name="Category"
					values={documentData.categories.map((item) => ({
						key: item,
						value: item,
					}))}
					onChange={setCategory}
				/>
				<Select
					id="document"
					name="Document"
					values={documentData.documents
						.filter((item) => item.type === type && item.category === category)
						.map((item) => ({
							key: item.id,
							value: item.name,
						}))}
					disabled={!type || !category}
					onChange={setDocument}
				/>
				<button disabled={!document} type="submit">
					Download
				</button>
			</form>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const backendUrl = process.env.BACKENDURL;
	if (!backendUrl) {
		throw new Error("Backend URL not defined");
	}
	const response = await axios.get(backendUrl);
	const documentData: IDocumentData = response.data;
	return {
		props: { backendUrl, documentData },
	};
};

export default index;
