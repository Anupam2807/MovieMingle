import axios from "axios";
const BASE_URL = "https://api.themoviedb.org/3";

const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTIxOTFmYjU2OTVjNzZhOGIyMmRmNzljODQ4NjIwNSIsInN1YiI6IjY1YzEyNGRjNDM5OTliMDE2M2M3ZDQzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6CnWIThA-j9grXEBqj-CvCNtBTrZ6R1QWWjNGIumntY";

const headers ={
    Authorization: "bearer "+ TMDB_TOKEN,
};

export const fetchDataFromAPI=  async(url,params)=>{

    try{
        const {data} = await axios?.get(BASE_URL + url,{
            headers,
            params
        });
        return data;


    }catch(error){
        console.log(error);
        return error;
    }


}