import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import React, { useState } from "react";
import IDocumentData from "../src/interfaces/common/IDocumentData";
import Select from "./Select";
import DownloadIcon from "@mui/icons-material/Download";

interface FormProps {
	backendUrl: string;
	documentData: IDocumentData;
}

const FormComponent = ({ backendUrl, documentData }: FormProps) => {
	const [type, setType] = useState("");
	const [category, setCategory] = useState("");
	const [document, setDocument] = useState("");

	return (
		<form
			action={
				new URL(
					`${type || "null"}/${category || "null"}/${document || "null"}`,
					backendUrl
				).href
			}
		>
			<Stack spacing={2}>
				<Select
					id="type"
					name="Type"
					values={documentData.types.map((item) => ({
						key: item.id,
						value: item.value,
					}))}
					onChange={setType}
				/>
				<Select
					id="category"
					name="Category"
					values={documentData.categories.map((item) => ({
						key: item.id,
						value: item.value,
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
				<Button
					variant="contained"
					size="large"
					disabled={!document}
					type="submit"
					endIcon={<DownloadIcon />}
				>
					Download
				</Button>
			</Stack>
		</form>
	);
};

export default FormComponent;
