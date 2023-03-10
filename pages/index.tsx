import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { GetServerSideProps } from "next";
import React from "react";
import Form from "../components/Form";
import IDocumentData from "../src/interfaces/common/IDocumentData";

interface indexProps {
	backendUrl: string;
	documentData: IDocumentData;
}

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

const index = ({ backendUrl, documentData }: indexProps) => {
	return (
		<ThemeProvider theme={darkTheme}>
			<Container>
				<Box
					sx={{
						height: "100vh",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Stack spacing={5} textAlign="center" maxWidth={"sm"}>
						<Typography variant="h2" component={"h1"} color="white">
							Documents
						</Typography>
						<Form backendUrl={backendUrl} documentData={documentData} />
					</Stack>
				</Box>
			</Container>
		</ThemeProvider>
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
