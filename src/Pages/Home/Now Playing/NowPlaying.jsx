import React, { useState } from 'react'
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
import "../Home.scss"
import SwitchTabs from '../../../Components/switchTabs/SwitchTabs';
import useFetch from "../../../hooks/UseFetch";
import Carousel from '../../../Components/Carousel/Carousel';


const TopRated = () => {
  const [endPoint,setEndPoint] = useState("movie");
  const[endPoint1,setEndPoint1] = useState("now_playing")
  
  //api format /trending/all/{time_window}
  const {data,loading} = useFetch(`/${endPoint}/${endPoint1}`);


  
  const onTabChange = (tab)=>{
      setEndPoint(tab==="Movie" ? "movie" : "tv");
        setEndPoint1(tab==="Movie"?"now_playing" : "airing_today");
  }
  return (
    

    <div className='carouselSection'>
        <ContentWrapper>
            <span className='carouselTitle'>Now Playing</span>
            <SwitchTabs data={["Movies", "Tv Shows"]} onTabChange={onTabChange}/>

        
        </ContentWrapper>
      <Carousel data={data?.results} loading={loading}/>

    </div>
  )
}

export default TopRated