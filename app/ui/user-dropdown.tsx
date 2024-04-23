"use client";

import { UserCircleIcon, Bars3Icon } from "@heroicons/react/24/solid";
import React, { useState, useEffect, useRef, FC } from "react";
import Link from "next/link";

interface MenuItem {
	route: string;
	title: string;
}

interface Props {
	item: string;
}

const UserDropdown: FC<Props> = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const toggle = () => setIsOpen(!isOpen);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const menuItems: MenuItem[] = [
		{ title: "Register", route: "/" },
		{ title: "Log in", route: "/" },
		{ title: "Contact us", route: "/" },
	];

	return (
		<div className="relative">
			<button
				className="flex items-center gap-2 rounded-full p-2 bg-white text-dark"
				onClick={toggle}
			>
				<Bars3Icon className="w-8 h-6" />
				<UserCircleIcon className="w-6 h-6" />
			</button>

			<div
				ref={dropdownRef}
				className={`absolute top-0 right-0 rounded-3xl z-30 w-52 flex flex-col bg-white text-dark shadow-md ${
					isOpen ? "flex" : "hidden"
				}`}
			>
				<button
					onClick={() => setIsOpen(false)}
					className="self-end px-3 py-2 text-lg font-bold"
				>
					&#x2715;
				</button>
				<div className="flex flex-col pt-4 pb-6">
					{menuItems.map((menuItem, index) => (
						<React.Fragment key={menuItem.route}>
							<Link
								href={menuItem.route}
								className="hover:bg-lighterGrey hover:text-dark px-6 py-4"
								onClick={() => setIsOpen(false)}
							>
								{menuItem.title}
							</Link>
							{index === menuItems.length - 2 && (
								<hr className="text-lightGrey" />
							)}
						</React.Fragment>
					))}
				</div>
			</div>
		</div>
	);
};

export default UserDropdown;
