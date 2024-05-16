import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import AllBooks from "../components/AllBooks";
import NavBar from "../components/NavBar";
import { BookListsChangedContext } from "../App";

const Books = () => {
	const [user] = useAuthState(auth);

	const [bookLists, setBookLists] = useState({});
	const { bookListsChanged, setBookListsChanged } = useContext(
		BookListsChangedContext
	);

	useEffect(() => {
		const getBookLists = async () => {
			const data = await axios.get(
				"http://localhost:8080/api/get-bookLists"
			);

			const json = await data.data;

			setBookLists(json);
		};

		getBookLists().catch(console.error);
		setBookListsChanged(false);
	}, [bookListsChanged]);

	return (
		<>
			<NavBar />
			<header className="bg-white shadow">
				<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
					<h1 className="text-3xl font-bold tracking-tight text-gray-900">
						Books
					</h1>
				</div>
			</header>
			<main>
				<div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
					<BookListsChangedContext.Provider
						value={{ bookListsChanged, setBookListsChanged }}
					>
						<AllBooks
							bookLists={
								bookLists && bookLists.length > 0
									? bookLists
									: []
							}
						/>
					</BookListsChangedContext.Provider>
				</div>
			</main>
		</>
	);
};

export default Books;
