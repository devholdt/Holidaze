import { UserCircleIcon, Bars3Icon } from "@heroicons/react/24/solid";

export default function UserDropdown() {
	return (
		<div className="flex items-center gap-2 border rounded-full p-1 bg-white">
			<Bars3Icon className="w-6 h-6" />
			<UserCircleIcon className="w-6 h-6" />
		</div>
	);
}
