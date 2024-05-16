import React, { useEffect, useState, createContext } from "react";
import BookList from "../components/BookList";
import axios from "axios";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

export const BookListChangedContext = createContext(false);

const BookListPage = () => {
	const { bookListName } = useParams();

	const [bookList, setBookList] = useState({});
	const [bookListChanged, setBookListChanged] = useState(false);

	useEffect(() => {
		const getBookList = async () => {
			const data = await axios.get(
				`http://localhost:8080/api/get-bookList?bookListName=${bookListName}`
			);

			const json = await data.data;
			setBookList(json);
			setBookListChanged(false);
		};

		getBookList().catch(console.error);
	}, [bookListChanged]);

	return (
		<>
			<NavBar />
			<header className="bg-white shadow">
				<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
					<h1 className="text-3xl font-bold tracking-tight text-gray-900">
						{bookListName}
					</h1>
				</div>
			</header>
			<main>
				<div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
					<BookListChangedContext.Provider
						value={{ bookListChanged, setBookListChanged }}
					>
						<BookList bookList={bookList} />
					</BookListChangedContext.Provider>
				</div>
			</main>
		</>
	);
};

export default BookListPage;
