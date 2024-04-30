"use client";

import React, { Component } from "react";

type RadioButtonProps = {
   name: string;
   options: string[];
   defaultOption: string;
};

type RadioButtonState = {
   selectedOption: string;
};

class RadioButton extends Component<RadioButtonProps, RadioButtonState> {
   constructor(props: RadioButtonProps) {
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
                     className="flex items-center justify-center rounded-full py-2 pe-6 ps-3 text-blue hover:cursor-pointer has-[:checked]:bg-yellow"
                  >
                     <input
                        type="radio"
                        value={option}
                        name={this.props.name.toLowerCase()}
                        id={id}
                        className="position:fixed pointer-events-none opacity-0 checked:border-yellow"
                        // checked={option === this.state.selectedOption}
                     />{" "}
                     {option}
                  </label>
               );
            })}
         </div>
      );
   }
}

export default function RadioButtons() {
   return (
      <fieldset>
         <legend className="mb-1 text-blue">Filter venues by:</legend>
         <div className="w-fit rounded-full bg-white">
            <RadioButton
               name="venueType"
               options={["Latest", "Popular", "Featured"]}
               defaultOption="Latest"
            />
         </div>
      </fieldset>
   );
}
