import beach from "@/public/background-beach.jpg";
import { elMessiri } from "@/app/ui/fonts";
import { FC, createElement } from "react";
import Subheading from "@/app/ui/subheading";

type HeroProps = {
	heading: string;
	headingLevel: number;
	subHeading?: string;
	text?: string;
};

const Hero: FC<HeroProps> = ({
	heading,
	headingLevel,
	subHeading = "",
	text = "",
}) => {
	const Heading = createElement(
		`h${headingLevel}` as keyof JSX.IntrinsicElements,
		{
			className: `${elMessiri.className} leading-none`,
			children: heading,
		}
	);

	return (
		<div
			style={{
				backgroundImage: `url(${beach.src})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
			className="flex flex-col justify-center h-80 p-28 text-dark"
		>
			{subHeading && <Subheading text={subHeading} left={""} />}
			{Heading}
			{text && <p>{text}</p>}
		</div>
	);
};

export default Hero;
