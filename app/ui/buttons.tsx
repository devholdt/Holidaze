import { FC } from "react";
import { motion } from "framer-motion";

type ButtonProps = {
	text: string;
	styles?: string;
	onClick?: () => void;
};

const Button: FC<ButtonProps> = ({ text, styles, onClick }) => {
	return (
		<motion.button
			className={`uppercase py-3 px-6 text-lg font-extralight tracking-widest transition ${styles}`}
			onClick={onClick}
		>
			{text}
		</motion.button>
	);
};

export { Button };
