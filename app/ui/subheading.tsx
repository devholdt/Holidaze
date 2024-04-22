import { FC } from "react";

type SubheadingProps = {
	text: string;
	left?: string;
	right?: string;
};

const Subheading: FC<SubheadingProps> = ({
	text,
	left = "w-20 me-2",
	right = "w-20 ms-2",
}) => {
	return (
		<div className="flex flex-row items-center">
			<div
				className={`${left} h-px bg-gradient-to-l from-dark to-transparent`}
			></div>
			<p className="uppercase tracking-widest font-extralight">{text}</p>
			<div
				className={`${right} h-px bg-gradient-to-r from-dark to-transparent`}
			></div>
		</div>
	);
};

export default Subheading;
