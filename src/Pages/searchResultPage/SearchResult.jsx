import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import "./style.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchDataFromAPI } from '../../utils/api';
import ContentWrapper from '../../Components/ContentWrapper/ContentWrapper.jsx';
import MovieCard from '../../Components/MovieCard/MovieCard';
import Spinner from "../../Components/Spinner/Spinner.jsx"
import noResults from "../../assets/no-results.png"

const SearchResult = () => {
  const[data,setData] = useState(null);
  const[pageNum,setPageNum] = useState(1);
  const [loading,setLoading] = useState(false);
  const {query} = useParams();


  const fetchIntialData = ()=>{
    setLoading(true);
    fetchDataFromAPI(`/search/multi?query=${query}&page=${pageNum}`).then((res)=>{
      setData(res);
      setPageNum((prev)=>{
        prev+1;
      })
      setLoading(false);
    })
  }

  const fetchNextPageData = ()=>{
    fetchDataFromAPI(`/search/multi?query=${query}&page=${pageNum}`).then((res)=>{
        if(data?.results){
          setData({
            ...data,results :[...data?.results,...res.results] 
            // jo data aaya pages ka unko merge kar raha
          })
        }else{
          setData(res);
        }
        setPageNum((prev)=>prev+1);
    })
      
    
  }

  useEffect(()=>{
    setPageNum(1);
    fetchIntialData();
  },[query])
  return (
    <div className='searchResultsPage'
    >
      {loading && <Spinner initial={true}/>}
      {!loading && (
        <ContentWrapper>
          {data?.results.length>0 ?(
            <>
              <div className="pageTitle">
                {
                  `Search ${data.total_results>1 ?"results":"result"} of '${query}'`}

              </div>
              <InfiniteScroll className='content' dataLength={data?.results?.length||[]} next={fetchNextPageData} hasMore={pageNum <= data?.total_pages} loader={Spinner}>
                  {data?.results?.map((item,index)=>{
                    if(item.media_type== "person")return;
                    return (
                      <MovieCard key={index} data={item} fromSearch={true} />
                    )
                  })}


              </InfiniteScroll>
            </>
          ):
          (
            <span className="resultNotFound">Sorry Mate ! I dont have What You are looking For..
            </span>
          )}
        </ContentWrapper>
      )}

    </div>
  )
}

export default SearchResult