import React, { useEffect, useState } from "react";
import axios from "axios";
import AddToList from "./AddToList";

const AllBooks = (bookLists) => {
	const [books, setBooks] = useState([]);

	useEffect(() => {
		const getBooks = async () => {
			const data = await axios.get("http://localhost:8080/api/get-books");

			const json = await data.data;
			let b = json.books;
			b = Object.entries(b);
			setBooks(b);
		};

		getBooks().catch(console.error);
	}, []);

	return (
		<div className="rounded border p-2 shadow-md">
			<h3>Books</h3>
			<ul>
				{books ? (
					books.map((book) => {
						return (
							<>
								<div key={book[1].id}>
									<li className="p-1">
										{book[0]}{" "}
										<AddToList
											book={book}
											bookLists={bookLists}
										/>
									</li>
								</div>
							</>
						);
					})
				) : (
					<></>
				)}
			</ul>
		</div>
	);
};

export default AllBooks;
