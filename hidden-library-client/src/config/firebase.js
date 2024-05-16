// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDDy5WdHm0onRro11F4VAI0sj4N8fR_I_Y",
	authDomain: "hiddenlibrary-791e4.firebaseapp.com",
	projectId: "hiddenlibrary-791e4",
	storageBucket: "hiddenlibrary-791e4.appspot.com",
	messagingSenderId: "971813480433",
	appId: "1:971813480433:web:94fb573660d1d94a2e0650",
	measurementId: "G-XMMMEKM45J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider().addScope(
	"https://www.googleapis.com/auth/contacts.readonly"
);
const analytics = getAnalytics(app);
