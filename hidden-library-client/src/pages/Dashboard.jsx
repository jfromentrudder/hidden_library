import React, { useEffect, useState, useContext } from "react";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import NewList from "../components/NewList";
import axios from "axios";
import NavBar from "../components/NavBar";
import DashboardCard from "../components/DashboardCard";
import { BookListsChangedContext } from "../App";

const Dashboard = () => {
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
						Dashboard
					</h1>
				</div>
			</header>
			<main>
				<div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
					<NewList />
					<div className="p-4">
						{/* {console.log(Array(bookLists['bookLists']))} */}
						<h2>Your Lists</h2>
						{bookLists !== undefined && bookLists.length > 0 ? (
							<div
								id="book-lists"
								className="container my-12 mx-auto px-4 md:px-12"
							>
								<div className="flex flex-wrap -mx-1 lg:-mx-4">
									{bookLists.map((bookList, index) => {
										return (
											<DashboardCard
												bookList={bookList}
												key={index}
											/>
										);
									})}
								</div>
							</div>
						) : (
							<></>
						)}
					</div>
				</div>
			</main>
		</>
	);
};

export default Dashboard;
