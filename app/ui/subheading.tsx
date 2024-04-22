import { FC } from "react";

type SubheadingProps = {
	text: string;
	width?: string;
};

const Subheading: FC<SubheadingProps> = ({ text, width = "w-20" }) => {
	return (
		<div className="flex flex-row items-center gap-2">
			<p className="uppercase tracking-widest font-extralight">{text}</p>
			<div
				className={`${width} h-px bg-gradient-to-r from-dark to-transparent`}
			></div>
		</div>
	);
};

export default Subheading;
