import React, { useState } from 'react'
import ContentWrapper from "../../../components/ContentWrapper/Contentwrapper.jsx"
import "../Home.scss"
import SwitchTabs from '../../../Components/switchTabs/SwitchTabs';
import useFetch from "../../../hooks/UseFetch";
import Carousel from '../../../Components/Carousel/Carousel';


const Popular = () => {
  const [endPoint,setEndPoint] = useState("movie");
  //api format /trending/all/{time_window}
  const {data,loading} = useFetch(`/${endPoint}/popular`);


  console.log(data);
  const onTabChange = (tab)=>{
      setEndPoint(tab==="Movie" ? "movie" : "tv");

  }
  return (
    

    <div className='carouselSection'>
        <ContentWrapper>
            <span className='carouselTitle'>What's Popular</span>
            <SwitchTabs data={["Movies", "Tv Shows"]} onTabChange={onTabChange}/>

        
        </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endpoint={endPoint}/>

    </div>
  )
}

export default Popular