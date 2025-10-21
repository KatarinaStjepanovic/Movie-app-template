import React from "react";
import { useState, useEffect } from "react";
import Movie from "./Movie";
import Loader from "./Loader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faChevronLeft,
  faChevronDown,
  faX,
} from "@fortawesome/free-solid-svg-icons";

function Recommended({ movies }) {
  const [currentPage, setPage] = useState(1);
  const [numberOf, setNumber] = useState(0);
  const [showed, setShowed] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    search: "",
    year: "",
    category: "No Filter",
  });

  useEffect(() => {
    setShowed(movies);
    setNumber(Math.ceil(movies?.length / 10));
  }, [movies]);

  useEffect(() => {
    let filtered = 0;
    filtered = movies.filter((m) => {
      return m.name.toLowerCase().includes(input.search.toLowerCase());
    });

    console.log(filtered);
    if (input.category != "No Filter") {
      filtered = filtered.filter((m) => m.type === input.category);
    }
    console.log(filtered);

    if (input.year.length === 4) {
      filtered = filtered.filter((m) => {
        return m.year == input.year;
      });
    }

    setNumber(Math.ceil(filtered.length / 10));
    setShowed(filtered);
    setPage(1);
  }, [input]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInput((prev) => {
      const newObj = JSON.parse(JSON.stringify(prev));
      newObj[name] = value;
      return newObj;
    });
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

  const clickX = (event) => {
      setInput((prev) => {
        const newObj = JSON.parse(JSON.stringify(prev));
        newObj.category = "No Filter";
        return newObj;
      });

      event.stopPropagation();
  };

  const changeCat = (name) => {
    setLoading(true);
    setTimeout(() => {
      setInput((prev) => {
        const newObj = JSON.parse(JSON.stringify(prev));
        newObj.category = name;
        console.log(newObj);
        return newObj;
      });
      setLoading(false);
    }, 1600);
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
        {loading ? (
          <Loader />
        ) : (
          showed.map((movie, id) => {
            if (id >= (currentPage - 1) * 10 && id < currentPage * 10) {
              return <Movie movie={movie} key={id} />;
            }
          })
        )}
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
      <div className="catInput">
        Category <FontAwesomeIcon icon={faChevronDown} className="dropIcon" />
        <div className="dropDown">
          <div
            className="dropCat"
            onClick={() => changeCat("Movies")}
            style={{
              backgroundColor:
                input.category === "Movies" && "var(--dark-gray)",
            }}
          >
            Movies{" "}
            <FontAwesomeIcon
              icon={faX}
              style={{
                display: input.category === "Movies" ? "block" : "none",
              }}
              className="x"
              onClick={clickX}
            />
          </div>
          <div
            className="dropCat"
            onClick={() => changeCat("Series")}
            style={{
              backgroundColor:
                input.category === "Series" && "var(--dark-gray)",
            }}
          >
            Series{" "}
            <FontAwesomeIcon
              icon={faX}
              style={{
                display: input.category === "Series" ? "block" : "none",
              }}
              className="x"
              onClick={clickX}
            />
          </div>
        </div>
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
          . . . <div className="numberOf">{numberOf}</div>
        </div>
      </div>
    </div>
  );
}

export default Recommended;
