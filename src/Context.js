import React, { useContext, useEffect, useState } from "react";

export const API_URL = `http://www.omdbapi.com/?apikey=727bbdc1`;

// create context
const AppContext = React.createContext();

//create Provider
const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState([]); //empty array of search
  const [isError, setIsError] = useState({ show: "false", msg: "" });
  const [query, setQuery] = useState("avengers");
  const getMovies = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      if (data.Response === "True") {
        setIsLoading(false);
        setIsError({
          show: false,
          msg: "",
        });
        setMovie(data.Search);
      } else {
        setIsError({
          show: true,
          msg: data.Error,
        });
        setIsLoading(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // timeOut,setTimeout for debouncing
    let timeOut = setTimeout(() => {
      getMovies(`${API_URL}&s=${query}`);
    }, 500);
    return () => clearTimeout(timeOut); // cleanUp function in useEffect={}
  }, [query]);

  return (
    <AppContext.Provider value={{ isLoading, isError, movie, query, setQuery }}>
      {children}
    </AppContext.Provider>
  );
};
//We are creating global custom hook for easily get data

const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider, useGlobalContext };
