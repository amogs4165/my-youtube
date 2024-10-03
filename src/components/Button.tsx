import React from "react";

interface IButtonProps {
    name: string;
}
const Button = ({ name }: IButtonProps) => {
    return (
        <div>
            <button className="border border-gray-200 rounded-md m-2 p-1 px-4 bg-gray-200">
                {name}
            </button>
        </div>
    );
};

export default Button;
