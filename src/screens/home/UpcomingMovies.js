import React from "react";
import {GridList} from '@material-ui/core';


function UpcomingMovies(props) {

    return (
      
      <div className="upComingContainer">
        <div className="heading">Upcoming Movies</div>
         <div className='upcomingMovieList'>
		 <GridList cols={6} rowHeight={230} >
			{props.movies.map((movie) => (
				<div className='image-container'>
					<img src={movie.Poster_url} alt='movie'></img>
				</div>
			))}
			</GridList>
		</div>
      </div>
    );
  }
export default UpcomingMovies
