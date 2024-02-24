
import { useEffect } from "react";
import {fetchDataFromAPI} from "./utils/api";
import { useSelector, useDispatch } from 'react-redux';
import { getApiConfiguration,getGenres } from "./Store/homeSlice";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/Home";
import SearchResult from "./Pages/searchResultPage/SearchResult"
import Details from "./Pages/Details/Details"
import Explore from "./Pages/explore/Explore"
import PageNotFound from "./Pages/404/PageNotFound";
import {BrowserRouter,Routes,Route} from "react-router-dom";
 
function App() {
  const dispatch = useDispatch()
  const {url} = useSelector((state)=>
  state.home)
  console.log(url);
  useEffect(()=>{
    genresCall(); 
    fetchApiConfig();
  },[])
  

  const fetchApiConfig = ()=>{
        fetchDataFromAPI('/configuration')
         .then((res)=>{
          console.log(res);
          const url = {
            backdrop: res.images.secure_base_url +"original",
            poster: res.images.secure_base_url +"original",
            profile: res.images.secure_base_url +"original",
          }
          dispatch(getApiConfiguration(url));
         })
  }

  const genresCall = async ()=>{
    let promises = [];
    let endPoints = ["tv","movie"];
    let allGenres = {}


    endPoints.forEach((url)=>{
      promises.push(fetchDataFromAPI(`/genre/${url}/list`))
    })


    const data = await Promise.all(promises); // dono api call ka response saath me return hoga
    data.map(({genres})=>{
      return genres.map((item)=>(allGenres[item.id] = item)) //save genree on the basis of id
    })
    dispatch(getGenres(allGenres));
    



  }



  return (
   <BrowserRouter>

    <Header/>

    <Routes>
      <Route path="/"  element={<Home/>} />
      <Route path="/:mediaType/:id" element={<Details/>} />
      <Route path="/search/:query" element={<SearchResult/>} />
      <Route path="/explore/:mediaType" element={<Explore/>} />
      <Route path="*" element={<PageNotFound/>} />



    </Routes>
   
  
   
   
   <Footer/>
   </BrowserRouter>



  )
}

export default App
