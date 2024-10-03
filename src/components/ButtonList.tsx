import React from "react";
import Button from "./Button";

const ButtonList = () => {
    const buttonNames = [
        "All",
        "Gaming",
        "Trading",
        "Songs",
        "Live",
        "Soccer",
        "Cricket",
        "Valentines",
    ];
    return (
        <div className="flex">
            {buttonNames.map((name) => (
                <Button name={name} />
            ))}
        </div>
    );
};

export default ButtonList;
