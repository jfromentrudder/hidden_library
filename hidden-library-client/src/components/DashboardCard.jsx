import React from "react";
import BookListSummary from "./BookListSummary";
import { Link } from "react-router-dom";

const DashboardCard = (bookList) => {
	bookList = bookList["bookList"];
	const books = bookList["books"];

	return (
		<>
			{/* column */}
			<div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
				<article className="overflow-hidden rounded-lg shadow-lg">
					<Link to={`/bookList/${bookList.name}`}>
						{/* <img
							alt="Placeholder"
							className="block h-auto w-full"
							src="https://picsum.photos/600/400/?random"
						/> */}
					</Link>
					<header className="flex items-center justify-between leading-tight p-2 md:p-4">
						<h1 className="text-lg">
							<Link
								className="no-underline hover:underline text-black"
								to={`/bookList/${bookList.name}`}
							>
								{bookList.name}
							</Link>
						</h1>
						<p className="text-grey-darker text-sm">
							Books in List: {Object.entries(books).length}
						</p>
					</header>
					<BookListSummary bookList={bookList} />
				</article>
			</div>
		</>
	);
};

export default DashboardCard;
