import "./App.css";
import React, { useState, createContext } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { auth } from "./config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Protected from "./Protected";
import Dashboard from "./pages/Dashboard";
import Home from "./pages";
import Books from "./pages/Books";
import Friends from "./pages/Friends";
import BookListPage from "./pages/BookListPage";

export const BookListsChangedContext = createContext(false);

function App() {
	const [user, loading, error] = useAuthState(auth);

	const [bookListsChanged, setBookListsChanged] = useState(false);

	if (loading) {
		return (
			<div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
				Loading
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
						d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
					/>
				</svg>
			</div>
		);
	}

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />

				<Route
					path="/dashboard"
					element={
						<Protected user={user}>
							<BookListsChangedContext.Provider
								value={{
									bookListsChanged,
									setBookListsChanged,
								}}
							>
								<Dashboard />
							</BookListsChangedContext.Provider>
						</Protected>
					}
				/>
				<Route
					path="/books"
					element={
						<Protected user={user}>
							<BookListsChangedContext.Provider
								value={{
									bookListsChanged,
									setBookListsChanged,
								}}
							>
								<Books />
							</BookListsChangedContext.Provider>
						</Protected>
					}
				/>
				<Route
					path="/friends"
					element={
						<Protected user={user}>
							<Friends />
						</Protected>
					}
				/>
				<Route
					path="/bookList/:bookListName"
					element={
						<Protected user={user}>
							<BookListPage />
						</Protected>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
