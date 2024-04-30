import { FC } from "react";
import Link from "next/link";

type ButtonProps = {
	text: string;
	styles?: string;
	primary?: boolean;
	onClick?: () => void;
};

const Button: FC<ButtonProps> = ({ text, styles, primary = true, onClick }) => {
	return (
		<button
			className={`uppercase py-3 px-6 text-lg font-extralight tracking-widest transition ${styles} ${
				primary
					? "text-white bg-brown hover:bg-darkBrown"
					: "text-white bg-green hover:bg-lightGreen"
			}`}
			onClick={onClick}
		>
			{text}
		</button>
	);
};

type LinkButtonProps = {
	text: string;
	styles?: string;
	primary?: boolean;
	targetHref: string;
};

const LinkButton: FC<LinkButtonProps> = ({
	text,
	styles,
	primary = true,
	targetHref,
}) => {
	return (
		<Link
			href={targetHref}
			className={`uppercase py-3 px-6 text-lg font-extralight tracking-widest transition ${styles} ${
				primary
					? "text-white bg-brown hover:bg-darkBrown"
					: "text-white bg-green hover:bg-lightGreen"
			}`}
		>
			{text}
		</Link>
	);
};

export { Button, LinkButton };
