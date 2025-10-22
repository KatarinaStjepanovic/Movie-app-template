import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

/*add trailer and watch now buttons */
function Movie({movie}) {
  return (
    <Link to={`/${movie.id}`}>
     <div className="movieDiv" >
    <img src={movie.poster} className="movieImg"/>
    <div className="movieTitle">{movie.name}</div>
    <div className="movieDesc">{movie.description}</div>
    <div className="movieStars">
    <FontAwesomeIcon icon={faStar} className="movieIcon"/>{movie.stars}
<FontAwesomeIcon icon={faChevronRight} className="movieNext"/>
    </div>
  </div>
  </Link>
 
  );
}

export default Movie;
