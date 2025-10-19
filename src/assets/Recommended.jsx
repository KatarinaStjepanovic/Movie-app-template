import React from "react";
import { useState, useEffect } from "react";
import Movie from "./Movie";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

function Recommended({ movies }) {
  const [currentPage, setPage] = useState(1);
  const [numberOf, setNumber] = useState(0);
  const [showed, setShowed] = useState([]);
  const [input, setInput] = useState({
    search: "",
    year: "",
  });

  useEffect(() => {
    setShowed(movies);
    setNumber(Math.ceil(movies?.length / 10));
  }, [movies]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInput((prev) => {
      const newObj = JSON.parse(JSON.stringify(prev));
      newObj[name] = value;
      return newObj;
    });
    if (name === "search") {
      /*change search */
      setShowed((prev) => {
        const newArr = movies.filter((m) =>
          m.name.toLowerCase().includes(value.toLowerCase())
        );
        setNumber(Math.ceil(newArr?.length / 10));
        return newArr;
      });
    } else if (name === "year") {
      const filtered = movies.filter((m) => m.year == value);
      setShowed((prev) => {
          const newArr = filtered;
          setNumber(Math.ceil(newArr?.length / 10));
          return newArr;
        });
     if(value.length >= 4 && !filtered.length){
          setNumber(0);
      }
      else {
      setShowed(movies);
       setNumber(Math.ceil(movies?.length / 10));
    }
    } 
  };

  const nextPage = () => {
    setPage((prev) => {
      return prev + 1;
    });
  };

  const prevPage = () => {
    setPage((prev) => {
      return prev - 1 >= 1 ? prev - 1 : prev;
    });
  };

  return (
    <div className="recDiv">
      <div className="recommendedTitle">Recommended</div>
      <div className="searchTitle">Search</div>
      <FontAwesomeIcon icon={faMagnifyingGlass} className="glass" />
      <input
        className="search"
        value={input.search}
        name="search"
        onChange={handleChange}
      />
      <div className="noMovies" style={{ opacity: numberOf ? 0 : 1 }}>
        No Recommended Movies / Series
      </div>
      <div className="recAll">
        {showed.map((movie, id) => {
          if (id >= (currentPage - 1) * 10 && id < currentPage * 10) {
            return <Movie movie={movie} key={id} />;
          }
        })}
      </div>
      <div className="yrDiv">
        <div className="yrTitle">Year:</div>
        <input
          type="number"
          className="yrInput"
          placeholder="eg. 2025"
          name="year"
          onChange={handleChange}
          value={input.year}
        />
      </div>
      <div className="buttons" style={{ display: !numberOf && "none" }}>
        <div className="buttonLeft" onClick={prevPage}>
          {" "}
          <FontAwesomeIcon
            style={{ opacity: currentPage == 1 && 0 }}
            icon={faChevronLeft}
            className="backPage"
          />
          <div
            className="currPage"
            style={{ color: currentPage == 1 && "#2B2C3E" }}
          >
            {currentPage}
          </div>
        </div>
        <div
          className="buttonRight"
          onClick={nextPage}
          style={{ display: currentPage === numberOf && "none" }}
        >
          {currentPage + 1}
        </div>
        <div className="dots">
          {" "}
          . . . <div className="numberOf">{numberOf}</div>
        </div>
      </div>
    </div>
  );
}

export default Recommended;
