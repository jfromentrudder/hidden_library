import React from "react";
import axios from "axios";
import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const SignIn = () => {
	const [user] = useAuthState(auth);

	const signInWithGoogle = async () => {
		try {
			const result = await signInWithPopup(auth, googleProvider);
			await axios.post("http://localhost:8080/api/set-user", result.user);
		} catch (err) {
			console.error("Error signing in:", err);
		}
	};

	return (
		<>
			{!user ? (
				<button
					className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-black-700 dark:text-black-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
					onClick={signInWithGoogle}
				>
					<img
						className="w-6 h-6"
						src="https://www.svgrepo.com/show/475656/google-color.svg"
						loading="lazy"
						alt="google logo"
					/>
					<span>Login with Google</span>
				</button>
			) : (
				<></>
			)}
		</>
	);
};

export default SignIn;
