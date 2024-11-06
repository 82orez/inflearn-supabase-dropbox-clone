"use client";

import { Input } from "@material-tailwind/react";
import SearchIcon from "@mui/icons-material/Search";

// @ts-ignore
export default function SearchComponent({ searchInput, setSearchInput }) {
  return (
    <div>
      {/*@ts-ignore*/}
      <Input label="Search Images" icon={<SearchIcon />} value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
    </div>
  );
}
