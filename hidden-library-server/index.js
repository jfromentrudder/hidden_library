import express, { json } from "express";
import cors from "cors";
import fs from "fs";
const app = express();

app.use(cors());
app.use(json());

const users = JSON.parse(
	fs.readFileSync("./users.json", { encoding: "utf8", flag: "r" })
);

let user = {};

const books = JSON.parse(
	fs.readFileSync("./books.json", { encoding: "utf8", flag: "r" })
);

const updateUsers = () => {
	fs.writeFileSync("./users.json", JSON.stringify(users), (err) => {
		if (err) throw err;
	});
};

const getUser = () => {
	const ind = users.users.findIndex((obj) => {
		return JSON.stringify(obj.uid) === JSON.stringify(user);
	});

	return ind;
};

const getBookLists = () => {
	const ind = getUser();
	if (ind === -1) {
		const profile = {
			uid: user,
			bookLists: [
				{
					name: "Read Books",
					books: {},
				},
				{
					name: "Books You Want to Read",
					books: {},
				},
			],
		};
		users.users.push(profile);
		updateUsers();
		return profile.bookLists;
	} else {
		return users.users[ind].bookLists;
	}
};

const getBookList = (bookListName) => {
	const userInd = getUser();
	const ind = users.users[userInd].bookLists.findIndex((bl) => {
		return bl.name === bookListName;
	});
	return users.users[userInd].bookLists[ind];
};

const addNewBookList = (bookList) => {
	const ind = getUser();
	users.users[ind].bookLists.push(bookList);
	updateUsers();
	return "Successfully added new list";
};

const deleteBookList = (bookList) => {
	const userInd = getUser();
	const ind = users.users[userInd].bookLists.findIndex((obj) => {
		return JSON.stringify(obj) === JSON.stringify(bookList);
	});
	users.users[userInd].bookLists.splice(ind, 1);
	updateUsers();
	return `Removed ${bookList} from Book Lists`;
};

const addBookToList = (bookList, title) => {
	const ind = getUser();
	const book = books.books[title];
	for (const bl in users.users[ind].bookLists) {
		if (users.users[ind].bookLists[bl].name == bookList) {
			users.users[ind].bookLists[bl].books[title] = book;
			updateUsers();
			return `${title} added to ${bookList}`;
		}
	}
};

const removeBookFromList = (bookList, title) => {
	const ind = getUser();
	console.log(bookList);
	for (const bl in users.users[ind].bookLists) {
		if (users.users[ind].bookLists[bl].name == bookList) {
			console.log(`removing ${title} from ${bookList}`);
			delete users.users[ind].bookLists[bl].books[title];
			updateUsers();
			return `${title} removed from ${bookList}`;
		}
	}
};

app.post("/api/set-user", (req, _) => {
	user = req.body.uid;
});

app.get("/api/get-books", (_, res) => {
	res.json(books);
});

app.get("/api/get-bookList", (req, res) => {
	const bookListName = req.query.bookListName;
	res.json(getBookList(bookListName));
});

app.get("/api/get-bookLists", (req, res) => {
	const uid = req.params.uid;
	res.json(getBookLists(uid));
});

app.post("/api/add-book-to-list/:bookList/:book", (req, res) => {
	const params = req.params;
	res.send(addBookToList(params.bookList, params.book));
});

app.post("/api/remove-book-from-list/:bookList/:book", (req, res) => {
	const params = req.params;
	res.send(removeBookFromList(params.bookList, params.book));
});

app.post("/api/create-new-list", (req, res) => {
	res.send(addNewBookList(req.body));
});

app.post("/api/delete-list", (req, res) => {
	res.send(deleteBookList(req.body));
});

app.listen(8080, () => {
	console.log("server listening on port 8080");
});
