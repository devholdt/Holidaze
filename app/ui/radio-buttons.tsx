"use client";

import React, { Component } from "react";

type RadioButtonsProps = {
	name: string;
	options: string[];
	defaultOption: string;
};

type RadioButtonsState = {
	selectedOption: string;
};

class RadioButtons extends Component<RadioButtonsProps, RadioButtonsState> {
	constructor(props: RadioButtonsProps) {
		super(props);
		this.state = {
			selectedOption: this.props.defaultOption,
		};
		this.onChangeValue = this.onChangeValue.bind(this);
	}

	onChangeValue(event: React.ChangeEvent<HTMLInputElement>) {
		this.setState({ selectedOption: event.target.value });
		console.log(event.target.value);
	}

	render() {
		return (
			<div onChange={this.onChangeValue} className="flex gap-2">
				{this.props.options.map((option, index) => {
					const id = `${this.props.name.toLowerCase()}-${index}`;
					return (
						<label
							key={index}
							htmlFor={id}
							className="has-[:checked]:bg-yellow text-blue rounded-full hover:cursor-pointer flex justify-center items-center ps-3 pe-6 py-2"
						>
							<input
								type="radio"
								value={option}
								name={this.props.name.toLowerCase()}
								id={id}
								className="checked:border-yellow position:fixed opacity-0 pointer-events-none"
								checked={option === this.state.selectedOption}
							/>{" "}
							{option}
						</label>
					);
				})}
			</div>
		);
	}
}

export default RadioButtons;
