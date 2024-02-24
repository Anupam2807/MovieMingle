import React from 'react'
import UseFetch from "../../hooks/UseFetch"
import {useParams} from "react-router-dom";
import DetailsBanner from './detailsBanner/DetailsBanner';
import Cast from './Cast/Cast';
import VideosSection from './videoSection/VideoSection';
import Similar from './Carousels/Similar';
import Recommendation from './Carousels/Recommendation';

const details = () => {

    const {mediaType , id} = useParams();
    const {data,loading} = UseFetch(`/${mediaType}/${id}/videos`)
    const {data:credits,loading:creditsLoading} = UseFetch(`/${mediaType}/${id}/credits`)
  console.log(data );
    
  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew}/>
      <Cast data={credits?.cast} loading={creditsLoading}/>
      <VideosSection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id}/>
      <Recommendation mediaType={mediaType} id={id}/>
    </div>

  )
}

export default details