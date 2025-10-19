import React, { useEffect, useState } from "react";

import MainPage from "./MainPage";
import Recommended from "./Recommended";
import Header from "./Header";

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
    <>
      <Header />
      <MainPage />
      <Recommended movies = {movies} />
    </>
  );
}

export default App;
