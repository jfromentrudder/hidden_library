import React from "react";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "../components/SignIn";
import { Navigate } from "react-router-dom";

const Home = () => {
	const [user] = useAuthState(auth);

	if (user) {
		return <Navigate to={"/dashboard"} />;
	} else {
		return (
			<>
				<header className="bg-white shadow">
					<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
						<h1 className="text-3xl font-bold tracking-tight text-gray-900">
							Log In
						</h1>
					</div>
				</header>
				<main>
					<div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
						<SignIn />
					</div>
				</main>
			</>
		);
	}
};

export default Home;
