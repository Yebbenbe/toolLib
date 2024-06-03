// src/components/SearchBar.js

import React from 'react';

const SearchBar = () => {
  return (
    <form>
      <input type="text" placeholder="Search tools..." />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
