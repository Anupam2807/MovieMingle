import React from 'react'

import HeroBanner from './heroBanner/HeroBanner'
import Trending from './Trending/Trending'
import Popular from './Popular/Popular'
import TopRated from './Top Rated/TopRated'
import NowPlaying from './Now Playing/NowPlaying'
const Home = () => {
  return (
    <div >
        <HeroBanner/>
        {/* <NowPlaying/> */}
        <Trending/>
        <Popular/>     
        <TopRated/>

    </div>
  )
}

export default Home