import { UserCircleIcon, Bars3Icon } from "@heroicons/react/24/solid";

export default function UserDropdown() {
	return (
		<button className="flex items-center gap-0 rounded-full p-1 bg-white text-dark">
			<Bars3Icon className="w-8 h-6" />
			<UserCircleIcon className="w-6 h-6" />
		</button>
	);
}
