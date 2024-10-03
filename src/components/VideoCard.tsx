import React from "react";

const VideoCard = ({ info }: { info: any }) => {
    console.log(info, 'infooo')
    const {statistics, snippet} = info;
    const {title, channelTitle, thumbnails} = snippet;
    return <div className="m-2 p-2 w-72 shadow-lg">
        <img alt="thumbnai" src={thumbnails.medium.url} className="rounded-lg"/>
        <ul>
            <li className="font-bold">{title}</li>
            <li>{channelTitle}</li>
            <li>{title}</li>
            <li>View count: {statistics?.viewCount}</li>
        </ul>
    </div>
};

export default VideoCard;
