import React, { useState, useEffect } from "react";
import Header from "./Header";

import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Details({ all }) {
  const { id } = useParams();
  const [current, setCur] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    console.log(all[id - 1]);
    setCur(all[id - 1]);
  }, [id]);

  return (
    <>
    <Header />
    <div className="back" onClick={ () => {
        navigate(-1);
    }}>
        < FontAwesomeIcon icon={faChevronLeft}/>
    </div>
    <div className="nay">
        <div className="name">{current?.name}</div>
      <div className="year">({current?.year})</div>
    </div>
    <div className="genre">
        {
            current.genre?.map(g => {
                return <div className="genreDiv">
                {g}
            </div>
            })
        }
    </div>
    <div className="descText">
        Description:
        <div className="desc">
         {current?.long_description}
        </div>
        </div>     
        <div className="categoryDiv">
            Category: 
            <div className="category">
                {current?.type}</div></div> 
                <div className="longetivity">
                    longetivity: {current?.longevity}h
                </div>
                <div className="rating">
                    <FontAwesomeIcon icon={faStar} className="star"/>
                    {current?.stars}
                </div>
                <div className="hr"></div>
                <img src={current?.poster} className="image" alt="Poster"/>
    </>
  );
}

export default Details;
