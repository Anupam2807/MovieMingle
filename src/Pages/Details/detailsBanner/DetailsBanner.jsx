import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import UseFetch from "../../../hooks/UseFetch.jsx";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../Components/circleRating/CirlceRating.jsx";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import Playicon from "../Playicon.jsx"
import VideoPopup from "../../../Components/videoPopUp/VideoPopUp.jsx";


const DetailsBanner = ({ video, crew }) => {

    const [show,setShow] = useState(false);
    const[videoId,setVideoId] = useState(null);
    const {mediaType , id} = useParams();
    const {data,loading} = UseFetch(`/${mediaType}/${id}`)
    const {url} = useSelector((state)=>state.home);


    const detailGenres = data?.genres?.map((item)=>item.id)


    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    const director = crew?.filter((d)=> d.job =="Director");
    const writer = crew?.filter((w)=>w.job==="Screenplay"||w.job==="Story"||w.job==="Writer")    

    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                      {/* //conver kar dega boolean me !! */}
                    {!!data && (
                        <React.Fragment>
                            
                    <div className="backdrop-img">
                        <Img src={url.backdrop+data.backdrop_path} />
                    </div>
                    <div className="opacity-layer"></div>

                    <ContentWrapper>
                        <div className="content">
                            <div className="left">
                            {data.poster_path ?(
                            <Img className="posterImg" src={url.backdrop+data.poster_path}/>)
                        :(
                            <Img className="posterImg" src={PosterFallback}/>
                        )
                        
                        }


                            </div>

                            <div className="right">
                                <div className="title">
                                    {`${data.name || data.title} (${dayjs(data.release_date).format("YYYY")})`}


                                </div>
                                <div className="subtitle">{data.tagline}</div>
                                <Genres data={detailGenres}/>

                                <div className="row">
                                    <CircleRating rating={data.vote_average.toFixed(1)}/>
                                
                                <div className="playbtn" onClick={()=>{
                                    setShow(true);
                                    setVideoId(video.key)
                                }}>
                                    <Playicon/>
                                    <span className="text">Watch Trailer</span>
                                </div>
                                </div>

                                <div className="overview">
                                    <div className="heading">Overview</div>
                                    <div className="description">
                                        {data.overview}
                                    </div>
                                </div>

                                <div className="info">
                                    {data.status && (
                                        <div className="infoItem">
                                            <span className="text bold">Status:{" "}</span>
                                            <span className="text">{data.status}</span>
                                        </div>

                                    )

                                    }
                                     {data.release_date && (
                                        <div className="infoItem">
                                            <span className="text bold">Release Date:{" "}</span>
                                            <span className="text">{dayjs(data.release_date).format("MMM D, YYYY")}</span>
                                        </div>

                                    )

                                    }
                                    
                                    {data.runtime && (
                                        <div className="infoItem">
                                            <span className="text bold">Duration:{" "}</span>
                                            <span className="text">{toHoursAndMinutes(data.runtime)}</span>
                                        </div>

                                    )

                                    }

                                </div>
                                    {director?.length>0 &&(
                                        <div className="info">
                                            <span className="text bold">
                                                Director :{" "}
                                            </span>
                                            <span className="text">
                                            {
                                                director.map((d,i)=>(
                                                    <span key={i}> 
                                                        {d.name}
                                                        {director.length-1 != i && ", "}
                                                    </span>
                                                ))
                                            }
                                            </span>
                                        </div>
                                    )}

                                {writer?.length>0 &&(
                                        <div className="info">
                                            <span className="text bold">
                                                Writer :{" "}
                                            </span>
                                            <span className="text">
                                            {
                                                writer.map((w,i)=>(
                                                    <span key={i}> 
                                                        {w.name}
                                                        {writer.length-1 != i && ", "}
                                                    </span>
                                                ))
                                            }
                                            </span>
                                        </div>
                                    )}

                            </div>

                        </div>



                    </ContentWrapper>
                    <VideoPopup show={show} setShow={setShow} videoId={videoId} setVideoId={setVideoId}/>
                    
                        </React.Fragment>
                    )
                    

                    }
                
                
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;
