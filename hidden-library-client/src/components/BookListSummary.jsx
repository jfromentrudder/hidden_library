import React, { useState, useContext } from "react";
import axios from "axios";
import { BookListsChangedContext } from "../App";

const BookListSummary = (bookList) => {
	const { bookListsChanged, setBookListsChanged } = useContext(
		BookListsChangedContext
	);
	const [expanded, setExpanded] = useState(true);
	bookList = bookList["bookList"];
	const books = bookList["books"];

	const onDelete = async () => {
		const del = window.confirm(
			`Are you sure you want to delete the ${bookList.name} list?`
		);
		if (del) {
			try {
				const response = await axios.post(
					"http://localhost:8080/api/delete-list",
					bookList
				);
				console.log(response.data);
				setBookListsChanged(!bookListsChanged);
			} catch (err) {
				console.error(err);
			}
		}
	};

	// console.log(bookList)
	return (
		<div className="flex items-center justify-between leading-tight p-2 md:p-4">
			{bookList.name !== "Read Books" &&
			bookList.name !== "Books You Want to Read" ? (
				<div title="Delete List" onClick={onDelete}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M5 12h14"
						/>
					</svg>
				</div>
			) : (
				<></>
			)}
			{expanded ? (
				<ul>
					{Object.entries(books)
						.slice(0, 4)
						.map((book, index) => {
							return <li key={index}>{book[0]}</li>;
						})}
				</ul>
			) : (
				<></>
			)}
		</div>
	);
};

export default BookListSummary;
