import Image from "next/image";
import { FC } from "react";

type LogoProps = {
	src: string;
	width?: number;
	height?: number;
};

const Logo: FC<LogoProps> = ({ src, width = 200, height = 200 }) => {
	return <Image src={src} width={width} height={height} alt="Holidaze logo" />;
};

export default Logo;
