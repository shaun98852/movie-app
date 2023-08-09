



import './index.css'


const MovieComponent=(props)=>{
    const {eachMovieDetails}= props 
    const {id,releaseDate,movieTitle,rating,description,poster}= eachMovieDetails



    return(
        <div className="movieContainer" key={id}>
           
            <img src={`https://image.tmdb.org/t/p/w185/${poster}`} alt="images" className="movieImage"/>

            <div className="detailsBox">
                <h1 className="title">{movieTitle}</h1>
                <p className="releaseDate">{`Release Date: ${releaseDate}`}</p>
                <p className="rating">{`Rating: ${rating}`}</p>
                <p className="description">{description}
                </p>
            </div>
        </div>
    )
}


export default MovieComponent