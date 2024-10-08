import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../utils/redux/store";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const isOpen = useSelector((store: RootState) => store.app.isMenuOpen);
    return isOpen ? (
        <div className="p-5 shadow-lg w-48">
            <ul>
                <Link to={""}><li>Home</li></Link>
                <li>Shorts</li>
                <li>Videos</li>
                <li>Live</li>
            </ul>
            <h1 className="font-bold pt-5">Subscriptions</h1>
            <ul>
                <li>Music</li>
                <li>Sports</li>
                <li>Gaming</li>
                <li>Movies</li>
            </ul>
            <h1 className="font-bold pt-5">Watch later</h1>
            <ul>
                <li>Music</li>
                <li>Sports</li>
                <li>Gaming</li>
                <li>Movies</li>
            </ul>
        </div>
    ) : null;
};

export default Sidebar;
