import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { BookListChangedContext } from "../pages/BookListPage";

const BookList = (bookList) => {
	bookList = bookList["bookList"];
	const books = bookList["books"];
	const [book, setBook] = useState("");

	const { bookListChanged, setBookListChanged } = useContext(
		BookListChangedContext
	);

	useEffect(() => {
		const removeFromList = async () => {
			try {
				const response = await axios.post(
					`http://localhost:8080/api/remove-book-from-list/${bookList.name}/${book}`
				);
				console.log(book, response.data);
				alert(`${response.data}`);
				setBook("");
				setBookListChanged(true);
			} catch (err) {
				console.error(err);
			}
		};

		if (book != "") {
			removeFromList();
		}
	}, [book]);

	if (bookList && books) {
		return (
			<div>
				<ul className="list-disc">
					{Object.keys(books).map((book, index) => {
						return (
							<li key={index}>
								{book}{" "}
								<span
									onClick={() => setBook(book)}
									title="removes the book from the list"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6 inline"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M5 12h14"
										/>
									</svg>
								</span>
							</li>
						);
					})}
				</ul>
			</div>
		);
	} else {
		return <></>;
	}
};

export default BookList;
