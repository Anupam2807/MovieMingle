import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./style.scss";
import CircleRating from "../circleRating/CirlceRating";
import Genres from "../Genres/Genres";
import PosterFallback from "../../assets/no-poster.png";
import axios from "axios";
import Img from "../LazyLoadImage/Img";


const ListCard = ({ data, fromSearch, mediaType,initialStatus,initialrating }) => {
    const { url } = useSelector((state) => state.home);
    console.log("data,dasd",data.genres)
    const [status, setStatus] = useState(initialStatus);
    const [rating, setRating] = useState(initialrating);
    const genres = data.genres || data.genre_ids;
    const navigate = useNavigate();
    const user = useSelector((state) => state.user?.user?.user);

    const handleStarClick = (index) => {
        setRating(index + 1); 
    };
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const updateList = async () => {
        try {
            const response = await axios.post(`${backendUrl}/api/list/mylist/update-list`, {
                tmdbId: data.id,
                userId :user?._id, 
                status,
                rating,
            });

            console.log("Update success", response.data);
        } catch (error) {
            console.error("Error updating list item", error);
        }
    };

    useEffect(() => {
        updateList();
    }, [status, rating]);



    const posterUrl = data.poster_path
        ? url.poster + data.poster_path
        : PosterFallback;
    return (
        <div
            className="movieCard"
            
        >
            <div className="posterBlock" onClick={() =>
                navigate(`/${data.media_type || mediaType}/${data.id}`)
            }>
                <Img className="posterImg" src={posterUrl} />
                {!fromSearch && (
                    <React.Fragment>
                        <CircleRating rating={data.vote_average.toFixed(1)} />
                        <Genres data={genres.slice(0, 2)} />
                    </React.Fragment>
                )}
            </div>
            <div className="textBlock">
                <span className="title" onClick={() =>
                navigate(`/${data.media_type || mediaType}/${data.id}`)
            }>{data.title || data.name}</span>
                <span className="date">
                    {dayjs(data.release_date).format("MMM D, YYYY")}
                </span>

                <div className="statusBlock">
                    <label>Status:</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="statusDropdown"
                    >
                        <option value="Watching">Watching</option>
                        <option value="Completed">Completed</option>
                        <option value="Plan to Watch">Plan to Watch</option>
                        <option value="Dropped">Dropped</option>
                    </select>
                </div>
 
                <div className="starRatingBlock">
                    {[...Array(5)].map((star, index) => (
                        <span
                            key={index}
                            className={`star ${index < rating ? "filled" : ""}`}
                            onClick={() => handleStarClick(index)}
                        >
                            &#9733;
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default ListCard;