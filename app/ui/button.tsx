import { FC } from "react";

type ButtonProps = {
	text: string;
	styles?: string;
};

const Button: FC<ButtonProps> = ({ text, styles }) => {
	return (
		<button
			className={`uppercase py-3 px-6 text-lg font-extralight tracking-widest ${styles}`}
		>
			{text}
		</button>
	);
};

export default Button;
