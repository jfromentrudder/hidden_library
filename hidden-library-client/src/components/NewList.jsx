import React, { useState, useContext } from "react";
import axios from "axios";
import { BookListsChangedContext } from "../App";

const NewList = () => {
	const { bookListsChanged, setBookListsChanged } = useContext(
		BookListsChangedContext
	);

	const [formData, setFormData] = useState({
		name: "",
		books: {},
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post(
				"http://localhost:8080/api/create-new-list",
				formData
			);
			console.log(response.data);
			setFormData({
				name: "",
				books: {},
			});
			setBookListsChanged(!bookListsChanged);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="m-2">
			<h2>Create a New List</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="name"
					id="new-name"
					placeholder="Name"
					onChange={handleChange}
					className="border"
					value={formData.name}
					required
				/>
				<input
					type="submit"
					value="Create List"
					className="rounded-full bg-green-900 text-white px-2 mx-2"
					title="Creates a new list with the specified name"
				/>
			</form>
		</div>
	);
};

export default NewList;
