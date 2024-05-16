import React, { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import NavBar from "../components/NavBar";

const Friends = () => {
	const [user, loading] = useAuthState(auth);
	const [friends, setFriends] = useState(null);
	const [updateFriends, setUpdateFriends] = useState(false);

	useEffect(() => {
		const get_friends = async () => {
			const data = await axios.get(
				"http://localhost:8000/api/get-friends"
			);

			const json = await data.data;
			setFriends(json);
			console.log("successfully got friends from service");
		};

		const update_friends = async () => {
			const data = await axios.get(
				`http://localhost:8000/api/update-friends?refreshToken=${user.refreshToken}`
			);

			const json = await data.data;
			setFriends(json);
			console.log("successfully got friends from service");
		};

		if (!friends) {
			get_friends();
		}

		if (updateFriends) {
			update_friends();
			setUpdateFriends(false);
		}
	}, [updateFriends]);

	return (
		<>
			<NavBar />
			<header className="bg-white shadow">
				<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
					<h1 className="text-3xl font-bold tracking-tight text-gray-900">
						Friends
					</h1>
				</div>
			</header>
			<main>
				<div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
					<div>{friends ? friends.name : <></>}</div>
					<button
						className="rounded-md bg-gray-800 px-2 py-1 text-white"
						onClick={() => setUpdateFriends(true)}
					>
						Update Friends
					</button>
				</div>
			</main>
		</>
	);
};

export default Friends;
