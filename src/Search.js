import React from "react";
import { useGlobalContext } from "./Context";

const Search = () => {
  const { query, setQuery, isError } = useGlobalContext();
  return (
    <>
      <section className="search-section">
        <h2>Search your movie</h2>
        <form action="backend" onSubmit={(event) => event.preventDefault()}>
          <div>
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </form>
        <div className="card-error">
          {/* // if isError.show means error is true */}
          <p> {isError.show && isError.msg} </p>
        </div>
      </section>
    </>
  );
};

export default Search;
