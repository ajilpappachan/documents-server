import React, { useState } from "react";

interface SelectProps {
	id: string;
	name: string;
	values: { key: string; value: string }[];
	disabled?: boolean;
	onChange?: (value: string) => void;
}

const Select = ({ id, name, values, disabled, onChange }: SelectProps) => {
	const [value, setValue] = useState("");

	const handleChange = (e: React.FormEvent<HTMLSelectElement>) => {
		setValue(e.currentTarget.value);
		onChange && onChange(e.currentTarget.value);
	};

	return (
		<div>
			<label htmlFor={id}>{name}</label>
			<select
				disabled={disabled}
				name={id}
				id={id}
				value={value}
				onChange={handleChange}
			>
				<option hidden disabled value="">
					-- Select --
				</option>
				{values.map((item) => (
					<option key={item.key} value={item.value}>
						{item.value}
					</option>
				))}
			</select>
		</div>
	);
};

export default Select;
