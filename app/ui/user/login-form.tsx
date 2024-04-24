"use client";

import Button from "../button";
import Link from "next/link";

export default function LoginForm() {
	return (
		<form className="w-full max-w-[320px]">
			<div className="mb-4">
				<label className="text-dark" htmlFor="email">
					Email
				</label>
				<div className="relative">
					<input
						className="bg-background py-3 px-4 w-full rounded outline-green placeholder:text-grey"
						id="email"
						type="email"
						name="email"
						placeholder="Enter email"
						required
					/>
				</div>
			</div>
			<div className="mb-8">
				<label className="text-dark" htmlFor="password">
					Password
				</label>
				<div className="relative">
					<input
						className="bg-background py-3 px-4 w-full rounded outline-green placeholder:text-grey"
						id="password"
						type="password"
						name="password"
						placeholder="Enter password"
						required
						minLength={6}
					/>
				</div>
			</div>
			<Button
				text="Login"
				styles="bg-green text-white w-full hover:bg-lightGreen"
			/>
			<div className="mt-4 font-extralight tracking-wider w-full">
				Don't have an account? Register{" "}
				<Link
					href="/user/register"
					className="text-blue underline hover:font-medium"
				>
					here
				</Link>
			</div>
		</form>
	);
}
