import React, { useState } from 'react'
import "../Home.scss"
import SwitchTabs from '../../../Components/switchTabs/SwitchTabs';
import useFetch from "../../../hooks/UseFetch";
import Carousel from '../../../Components/Carousel/Carousel';
import FooterWrapper from '../../../Components/FooterWrapper/footerWrapper';


const Trending = () => {
  const [endPoint,setEndPoint] = useState("day");
  const {data,loading} = useFetch(`/trending/all/${endPoint}`);


  console.log(data);
  const onTabChange = (tab)=>{
      setEndPoint(tab==="Day" ? "day" : "week");

  }
  return (
    

    <div className='carouselSection'>
      <FooterWrapper>
            <span className='carouselTitle'>Trending</span>
            <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange}/>

        
            </FooterWrapper> 
      <Carousel data={data?.results} loading={loading} endpoint={endPoint}/>
      
    </div>
    
  )
}

export default Trending