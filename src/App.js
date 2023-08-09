import {useState,useEffect} from "react"
import * as Loader from 'react-loader-spinner'
import Header from './components/movies'
import TopSection from './components/TopSection'
import { AiOutlineSearch } from "react-icons/ai";
import NoMoviesFound from "./components/NoMoviesFound";
import MovieComponent from './components/movieComponent'
import './App.css';


const presentState={"success":"SUCCESS",
                    "failure":"FAILURE",
                     "loading":"LOADING",
                     "initial":"INITIAL"}

const  App=()=> {

  const [movies,movieChange]= useState([]);
  const [inputString,enterValue]=useState('');
  const [currentPageNo, changePageNo]=useState(1)
  const [currentStatus,changeStatus]=useState(presentState.initial)
  const [constant,changeContst]=useState(1)
  
      useEffect(()=>{
        getMovies()
      },[currentPageNo])

      const nextPage=()=>{ changePageNo((prevNumber)=>prevNumber+1)}

      const previousPage=()=>{
        if(currentPageNo>1){
        changePageNo((numberPrev)=>numberPrev-1)
                }
                }

      const constFunction=()=>{ changeContst((prev)=>prev+1)}

    const getMovies=async ()=>{
      
      changeStatus(presentState.loading)
      const url=`https://api.themoviedb.org/3/search/movie?api_key=f53bf26c3a9a12934ed27b62e005f7b3&query=${inputString}&page=${currentPageNo}`
      const details=await fetch(url)
      const reponses=await details.json()
   
      if(details.ok){
  
        const movieArray=reponses.results.map(eachItem=>({
          id :eachItem.id ,
          releaseDate : eachItem.release_date,
          movieTitle:eachItem.original_title,
          rating:eachItem.vote_average,
          description:eachItem.overview,
          poster:eachItem.poster_path
        }))

        if(movieArray.length!==0){
        changeStatus(presentState.success)
        movieChange(movieArray)
           }
         }
      else{
        changeStatus(presentState.failure)
        }

    }   



    const ratingFilter=()=>{
      
      let newList=movies.sort((a,b)=>a.rating < b.rating?1:-1)
      console.log(newList)
      movieChange(newList)
      constFunction()
    }

    const dateFilter=()=>{

      let finalDates=movies.sort((a,b)=> new Date(b.releaseDate)- new Date(a.releaseDate))
      console.log(finalDates)
      movieChange(finalDates)
      constFunction()
    }

  
  const Loading=()=>(
    <div className="loader-container" data-testid="loader">
    <Loader.RotatingTriangles type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
      )

  const SearchBox=()=>(
    <div className="searchBox">
        <h1 className="heading">WHAT MOVIE ARE YOU LOOKING FOR?</h1>
        <div className="inputBox">
            <input type="text" 
            className="inputBoxes"
             placeholder="Type a search" 
             onChange={(e)=>{enterValue(e.target.value)}} 
             value={inputString} 
             autoFocus="autoFocus"/>
            <button className="button" onClick={getMovies} >
            <AiOutlineSearch className="searchIcon"/>
            </button>
        </div>
    </div>
    )

  const bottomSection=()=>(
    <>
      <div className="filterSection">
        <h1 className="sort">Sort with respect to :</h1>
        <div className="sortingDetails">
          <button className="buttonsNavigation" onClick={ratingFilter}>Rating</button>
          <button className="Navigation" onClick={dateFilter}>Latest Date</button>
        </div>
      </div>
      
          {movies.map(eachMovie=>(
            <MovieComponent eachMovieDetails={eachMovie} key={eachMovie.id}/>)
          )}
          
          <div className="navigationBox">
            <button className="buttonsNavigation" onClick={previousPage}>prev</button>
              <p className="currentPage">{currentPageNo}</p>
            <button className="buttonsNavigation" onClick={nextPage}>Next</button>
          </div>
    </>
    )


const switchFunction=()=>{
          switch(currentStatus){
            case presentState.success:
              return(bottomSection())
            case presentState.failure:
              return(<NoMoviesFound/>)
            case presentState.loading:
              return(Loading())
            case presentState.initial:
              return null
            default:
              return null
          }
        }
  

  return (
    <div className="wallpaper">
      <Header/>
      <TopSection/>
      <div className="bottomSection">
        <SearchBox />
      {switchFunction()}
      </div>
      
    </div>
  );
}

export default App;
