import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { useState } from "react";

interface SelectProps {
	id: string;
	name: string;
	values: { key: string; value: string }[];
	disabled?: boolean;
	onChange?: (value: string) => void;
}

const SelectComponent = ({
	id,
	name,
	values,
	disabled,
	onChange,
}: SelectProps) => {
	const [value, setValue] = useState("");

	const handleChange = (e: SelectChangeEvent) => {
		setValue(e.target.value);
		onChange && onChange(e.target.value);
	};

	return (
		<FormControl fullWidth>
			<InputLabel id={`${id}-label`}>{name}</InputLabel>
			<Select
				disabled={disabled}
				labelId={`${id}-label`}
				label={name}
				id={id}
				value={value}
				onChange={handleChange}
			>
				{values.map((item) => (
					<MenuItem key={item.key} value={item.value}>
						{item.value}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default SelectComponent;
