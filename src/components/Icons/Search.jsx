import * as React from "react";
const Search = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={26}
    fill="none"
    {...props}
  >
    <circle
      cx={11.917}
      cy={11.917}
      r={7.583}
      stroke="#33363F"
      strokeWidth={2}
    />
    <path
      stroke="#33363F"
      strokeLinecap="round"
      strokeWidth={2}
      d="m21.667 21.667-3.25-3.25"
    />
  </svg>
);
export default Search;