import React, { Fragment, useEffect, useState, useContext } from "react";
import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import { BookListsChangedContext } from "../App";

const classNames = (...classes) => {
	return classes.filter(Boolean).join(" ");
};

const AddToList = ({ book, bookLists }) => {
	const { bookListsChanged, setBookListsChanged } = useContext(
		BookListsChangedContext
	);
	const [formData, setFormData] = useState({
		bookList: "",
	});

	useEffect(() => {
		const addToListReq = async () => {
			try {
				const response = await axios.post(
					`http://localhost:8080/api/add-book-to-list/${formData.bookList}/${book[0]}`
				);
				console.log(book[0], response.data);
				alert(`${response.data}`);
			} catch (err) {
				console.error(err);
			}
		};

		if (formData.bookList !== "") {
			addToListReq();
		}
	}, [formData]);

	const handleSubmit = async (event) => {
		event.preventDefault();

		setFormData({
			...formData,
			bookList: event.target.bookList.value,
		});
		setBookListsChanged(!bookListsChanged);
	};

	return (
		<Menu as="div" className="relative inline-block text-left">
			<div>
				<Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-1 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-4 h-4"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 4.5v15m7.5-7.5h-15"
						/>
					</svg>
				</Menu.Button>
			</div>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
					<div className="py-1">
						{React.Children.toArray(
							bookLists.bookLists?.map((bookList) => {
								return (
									<>
										<form
											onSubmit={handleSubmit}
											key={bookList.name}
										>
											<Menu.Item>
												{({ active }) => (
													<>
														<input
															type="hidden"
															name="bookList"
															value={
																bookList.name
															}
														/>
														<button
															type="submit"
															className={classNames(
																active
																	? "bg-gray-100 text-gray-900"
																	: "text-gray-700",
																"block w-full px-4 py-2 text-left text-sm"
															)}
															title={`Adds this book to the "${bookList.name}" list`}
														>
															{bookList.name}
														</button>
													</>
												)}
											</Menu.Item>
										</form>
									</>
								);
							})
						)}
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};

export default AddToList;
