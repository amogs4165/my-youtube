import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/redux/slices/appSlice";
import { useSearchParams } from "react-router-dom";

const WatchPage = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    const [videoId, setVideoId] = useState("");

    useEffect(() => {
        const id = searchParams.get("v");
        if (id) setVideoId(id);
        dispatch(closeMenu());
    }, []);
    return (
        <div className="px-2">
            <iframe
                width="1200"
                height="600"
                src={"https://www.youtube.com/embed/" + videoId}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default WatchPage;
