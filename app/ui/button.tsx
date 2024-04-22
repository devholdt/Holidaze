import { FC } from "react";

type ButtonProps = {
	text: string;
	styles: string;
};

const Button: FC<ButtonProps> = ({ text, styles }) => {
	return <button className={`${styles}`}>{text}</button>;
};

export default Button;
