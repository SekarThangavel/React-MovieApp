import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavorite from "./components/AddFavorite";
import RemoveFavorite from "./components/RemoveFavorite";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [searchMovies, setSearchMovies] = useState("");

  const getMovieRequest = async (searchMovies) => {
    const url = `http://www.omdbapi.com/?s=${searchMovies}&apikey=fc7b60c4`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchMovies);
  }, [searchMovies]);

  useEffect(() => {
    const movieFavorites = JSON.parse(
      localStorage.getItem("react-movie-app-favorites")
    );

    setFavorite(movieFavorites);
  }, []);

  const SaveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favorites", JSON.stringify(items));
  };
  const addFavoriteMovie = (movie) => {
    const newFavoriteList = [...favorite, movie];
    if (!(favorite.filter((e) => e.imdbID === movie.imdbID).length > 0)) {
      setFavorite(newFavoriteList);
      SaveToLocalStorage(newFavoriteList);
      // your code
    }

    // const filterList = favorite.filter((fav) => fav.imdbID != movie.imdbID );
  };

  const removeFavoriteMovie = (movie) => {
    const newFavoriteList = favorite.filter(
      (favorite) => favorite.imdbID !== movie.imdbID
    );
    setFavorite(newFavoriteList);
    SaveToLocalStorage(newFavoriteList);
  };

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movies" />
        <SearchBox
          searchMovies={setMovies}
          setSearchMovies={setSearchMovies}
        ></SearchBox>
      </div>
      <div className="row">
        <MovieList
          movies={movies}
          handleFavoriteClick={addFavoriteMovie}
          favoriteComponent={AddFavorite}
        ></MovieList>
      </div>

      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favorites" />
      </div>
      <div className="row">
        <MovieList
          movies={favorite}
          handleFavoriteClick={removeFavoriteMovie}
          favoriteComponent={RemoveFavorite}
        />
      </div>
    </div>
  );
};

export default App;
