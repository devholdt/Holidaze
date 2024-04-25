import { FC } from "react";

type ButtonProps = {
	text: string;
	styles?: string;
	onClick?: () => void;
};

const Button: FC<ButtonProps> = ({ text, styles, onClick }) => {
	return (
		<button
			className={`uppercase py-3 px-6 text-lg font-extralight tracking-widest ${styles}`}
			onClick={onClick}
		>
			{text}
		</button>
	);
};

export default Button;
