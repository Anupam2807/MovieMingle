import React, { useState } from 'react'
import "../Home.scss"
import SwitchTabs from '../../../Components/switchTabs/SwitchTabs';
import useFetch from "../../../hooks/UseFetch";
import Carousel from '../../../Components/Carousel/Carousel';
import FooterWrapper from '../../../Components/FooterWrapper/footerWrapper';


const TopRated = () => {
  const [endPoint,setEndPoint] = useState("movie");
  //api format /trending/all/{time_window}
  const {data,loading} = useFetch(`/${endPoint}/top_rated`);


  
  const onTabChange = (tab)=>{
      setEndPoint(tab==="Movie" ? "movie" : "tv");

  }
  return (
    

    <div className='carouselSection'>
        <FooterWrapper>
            <span className='carouselTitle'>Top Rated</span>
            <SwitchTabs data={["Movies", "Tv Shows"]} onTabChange={onTabChange}/>

        
        </FooterWrapper>
      <Carousel data={data?.results} loading={loading} endpoint={endPoint}/>

    </div>
  )
}

export default TopRated