import React from "react";
import css from "./searchBar.module.css";
import PropTypes from "prop-types";

export default function SearchBar({ getQueryImages }) {
  return (
    <header className={css.Searchbar}>
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          getQueryImages(evt);
        }}
        className={css.SearchForm}
      >
        <button type="submit" className={css["SearchForm-button"]}>
          <span className="button-label">Search</span>
        </button>

        <input
          id="query"
          className={css["SearchForm-input"]}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

SearchBar.propTypes = {
  getQueryImages: PropTypes.func,
};
