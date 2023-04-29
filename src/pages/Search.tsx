import React from "react";
import { useParams } from "react-router-dom";
import DoubleSearchBar from "../components/DoubleSearchBar";

const Search = () => {
  const { city } = useParams<{ city: string }>();
  return (
    <div>
      <DoubleSearchBar city={city} />
    </div>
  );
};

export default Search;
