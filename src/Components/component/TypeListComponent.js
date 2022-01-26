import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import { useForm } from "react-hook-form";
import { uploadImg } from "../../service/bbq";
import { getAllColType } from "../../service/bbq";
import _ from "lodash";

const TypeListComponent = ({ cb, value }) => {
	const [list, setList] = useState("");
	const [age, setAge] = useState("");

	useEffect(() => {
		const params = {
			method: 'get'
		}
		getAllColType(params).then((res) => {
			setList(_.get(res, ["data"], []));
		});

	}, []);
	const handleChangeType = (event) => {
		setAge(event.target.value);
		cb && cb(event.target.value);
	};
	return (
		<Box sx={{ minWidth: 120 }}>
			<FormControl fullWidth>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={value}
					displayEmpty
					inputProps={{ "aria-label": "Without label" }}
					onChange={handleChangeType}
					label={""}
					placeholder={'请选择创建类型'}
				>
					{_.map(_.concat([{id:'',itemValue:'所有',memo:''}],list), (i, d) => {
						return (
							<MenuItem value={i.id} key={d}>
								{i.itemValue}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
		</Box>
	);
}

export default TypeListComponent;
