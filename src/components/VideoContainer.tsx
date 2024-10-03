import React, { useEffect, useState } from "react";
import { YOUTUBE_VIDEO_API } from "../utils/constants/api";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";

const VideoContainer = () => {
    const [videos, setVideos] = useState([]);
    const getVideos = async () => {
        const resp = await fetch(YOUTUBE_VIDEO_API);
        const json = await resp.json();
        setVideos(json.items);
    };

    useEffect(() => {
        getVideos();
    }, []);
    return (
        <div className="flex flex-wrap">
            {videos.map((video: any) => (
               <Link to={"/watch?v=" + video.id}> <VideoCard key={video.id} info={video} /></Link>
            ))}
        </div>
    );
};

export default VideoContainer;
