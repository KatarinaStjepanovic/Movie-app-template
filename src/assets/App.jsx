import React, { useEffect, useState } from "react";

import MainPage from "./MainPage";
import Recommended from "./Recommended";
import Header from "./Header";
import Details from "./Details";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("./public/movies.json")
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element =  {
          <>
          <Header />
          <MainPage />
          <Recommended movies={movies} /></> }>
        </Route>
        <Route path="/:id" element ={<Details all ={movies}/>}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
