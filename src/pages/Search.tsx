import React from "react";
import { useParams } from "react-router-dom";
import DoubleSearchBar from "../components/DoubleSearchBar";

const Search = () => {
  const { city, uniqueName } = useParams<{ city: string, uniqueName: string }>();
  return (
    <div>
      <DoubleSearchBar city={city} uniqueName={uniqueName} />
    </div>
  );
};

export default Search;
