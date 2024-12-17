import Select from "react-select/base";
import "./style.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { fetchDataFromAPI } from "../../utils/api";
import Spinner from "../../Components/Spinner/Spinner";
import ListCard from "../../Components/ListCard/ListCard";
import FooterWrapper from "../../Components/FooterWrapper/footerWrapper";

const MyList = () => {
  let filters = {};
  const [genre, setGenre] = useState(null);
  const [sortby, setSortby] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [savedData, setSavedData] = useState([]);
  const [loading, setLoading] = useState(true); 

  const [detailsData, setDetailsData] = useState([]);

  const user = useSelector((state) => state.user?.user?.user);


  useEffect(() => {
    const fetchMyList = async () => {
        setLoading(true); 

      try {
        const response = await axios.post(
          `${backendUrl}/api/list/mywatchlist`,
          {
            userId: user?._id,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const sortedData = response?.data?.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        
        setSavedData(sortedData);
      } catch (e) {
        console.log("eror", e);
      }finally{
        setLoading(false);
      }
    };
    fetchMyList();
  }, [user?._id]);



  useEffect(() => {
    const fetchDetailsForList = async () => {
      if (savedData.length > 0) {
        setLoading(true)
        const promises = savedData.map((item) =>
          fetchDataFromAPI(`/${item.mediaType}/${item.tmdbId}`).then((data) => data)
        );

        try {
          const results = await Promise.all(promises);
          setDetailsData(results); // Store all fetched details
        } catch (e) {
          console.log('error fetching details', e);
        }finally{
            setLoading(false)
        }
      }
    };

    fetchDetailsForList();
  }, [savedData]);




  const sortbyData = [
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "vote_average.asc", label: "Rating Ascending" },
    {
      value: "primary_release_date.desc",
      label: "Release Date Descending",
    },
    { value: "primary_release_date.asc", label: "Release Date Ascending" },
    { value: "original_title.asc", label: "Title (A-Z)" },
  ];


  return (
    <>
    <div className="mylist">
        <FooterWrapper>
          <div className="pageHeader">
            <div className="pageTitle">My Watch List</div>
          
          </div>

          {loading ? (
            <Spinner initial={true} /> 
          ) : (
            <>
              {detailsData.length > 0 ? (
                <div className="content">
                  {detailsData.map((item, index) => {
                     const mediaType = savedData[index]?.mediaType;
                     const initialStatus =  savedData[index]?.status
                     const initialrating =  savedData[index]?.rating
                    console.log("media type",initialrating);
                    return (

                    
                    <ListCard
                      key={index}
                      data={item}
                      mediaType={mediaType}
                      initialStatus={initialStatus}
                      initialrating={initialrating}
                      />
                    )
})}
                </div>
              ) : (
                <span className="resultNotFound">Sorry, Results not found!</span>
              )}
            </>
          )}
        </FooterWrapper>
      </div>
    </>
  );
};

export default MyList;
