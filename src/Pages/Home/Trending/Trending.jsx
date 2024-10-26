import React, { useState } from 'react'
import ContentWrapper from "../../../Components/ContentWrapper/ContentWrapper.jsx"
import "../Home.scss"
import SwitchTabs from '../../../Components/switchTabs/SwitchTabs';
import useFetch from "../../../hooks/UseFetch";
import Carousel from '../../../Components/Carousel/Carousel';


const Trending = () => {
  const [endPoint,setEndPoint] = useState("day");
  const {data,loading} = useFetch(`/trending/all/${endPoint}`);


  console.log(data);
  const onTabChange = (tab)=>{
      setEndPoint(tab==="Day" ? "day" : "week");

  }
  return (
    

    <div className='carouselSection'>
      <ContentWrapper>
            <span className='carouselTitle'>Trending</span>
            <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange}/>

        
            </ContentWrapper> 
      <Carousel data={data?.results} loading={loading} endpoint={endPoint}/>
      
    </div>
    
  )
}

export default Trending