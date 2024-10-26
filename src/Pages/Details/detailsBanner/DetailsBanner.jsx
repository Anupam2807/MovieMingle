import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../Components/ContentWrapper/ContentWrapper.jsx";
import UseFetch from "../../../hooks/UseFetch.jsx";
import CircleRating from "../../../Components/circleRating/CirlceRating.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import Playicon from "../Playicon.jsx";
import VideoPopup from "../../../Components/videoPopUp/VideoPopUp.jsx";
import { GoBookmark } from "react-icons/go";
import axios from "axios";
import toast from "react-hot-toast";
import { GoBookmarkSlash } from "react-icons/go";
import Genres from "../../../Components/Genres/Genres.jsx";
import Img from "../../../Components/lazyLoadImage/Img.jsx";

const DetailsBanner = ({ video, crew }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const { mediaType, id } = useParams();
  const { data, loading } = UseFetch(`/${mediaType}/${id}`);
  const { url } = useSelector((state) => state.home);
  const user = useSelector((state) => state.user?.user?.user);
  const [savedInList, setSavedInList] = useState(false);

  const detailGenres = data?.genres?.map((item) => item.id);

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const director = crew?.filter((d) => d.job == "Director");
  const writer = crew?.filter(
    (w) => w.job === "Screenplay" || w.job === "Story" || w.job === "Writer"
  );

  useEffect(() => {
    const checkForItem = async () => {
      try {
        const response = await axios.post(
          `${backendUrl}/api/list/check`,
          {
            tmdbId: id,
            userId: user?._id,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("response for check", response);

        if (response.status == 200) {
          setSavedInList(true);
        } else {
          setSavedInList(false);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    checkForItem();
  }, [id, user?._id]);

  console.log("loisr", savedInList);

  const saveToMyWatchlist = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/list/mylist`,
        {
          tmdbId: id,
          mediaType: mediaType,
          userId: user?._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Saved to My Watchlist!");
        setSavedInList(true);
      } else {
        toast.error(response.data.error || "An unexpected error occurred.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error.response?.data?.error ||
          "An error occurred while saving to My Watchlist."
      );
    }
  };

  const removeFromList = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/list/mylist/remove`,
        {
          tmdbId: id,
          userId: user?._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 200) {
        setSavedInList(false);
        toast.success("Removed From List");
      }
    } catch (error) {
      console.log("Erorr", error);
    }
  };

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {/* //conver kar dega boolean me !! */}
          {!!data && (
            <React.Fragment>
              <div className="backdrop-img">
                <Img src={url.backdrop + data.backdrop_path} />
              </div>
              <div className="opacity-layer"></div>

              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data.poster_path ? (
                      <Img
                        className="posterImg"
                        src={url.backdrop + data.poster_path}
                      />
                    ) : (
                      <Img className="posterImg" src={PosterFallback} />
                    )}
                  </div>

                  <div className="right">
                    <div className="title">
                      {`${data.name || data.title} (${dayjs(
                        data.release_date
                      ).format("YYYY")})`}
                    </div>
                    <div className="subtitle">{data.tagline}</div>
                    <Genres data={detailGenres} />


                    <div className="row">
                      <CircleRating rating={data.vote_average?.toFixed(1)} />

                      <div
                        className="playbtn"
                        onClick={() => {
                          setShow(true);
                          setVideoId(video.key);
                        }}
                      >
                        <Playicon />
                        <span className="text">Watch Trailer</span>
                      </div>
                      <div className="bookmark-btn">
                        {savedInList ? (
                          <>
                            <GoBookmarkSlash
                              onClick={removeFromList}
                              className="bookmark-icon"
                            />
                          </>
                        ) : (
                          <>
                            <GoBookmark 
                              onClick={saveToMyWatchlist}
                              className="bookmark-icon"
                            />
                          </>
                        )}
                        <div className="text">My Watchlist</div>
                      </div>
                    </div>

                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data.overview}</div>
                    </div>

                    <div className="info">
                      {data.status && (
                        <div className="infoItem">
                          <span className="text bold">Status: </span>
                          <span className="text">{data.status}</span>
                        </div>
                      )}
                      {data.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Release Date: </span>
                          <span className="text">
                            {dayjs(data.release_date).format("MMM D, YYYY")}
                          </span>
                        </div>
                      )}

                      {data.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Duration: </span>
                          <span className="text">
                            {toHoursAndMinutes(data.runtime)}
                          </span>
                        </div>
                      )}
                    </div>
                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Director : </span>
                        <span className="text">
                          {director.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {director.length - 1 != i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {writer?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Writer : </span>
                        <span className="text">
                          {writer.map((w, i) => (
                            <span key={i}>
                              {w.name}
                              {writer.length - 1 != i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </ContentWrapper>
              <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
              />
            </React.Fragment>
          )}
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
