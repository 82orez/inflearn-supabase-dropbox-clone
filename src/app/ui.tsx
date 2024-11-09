"use client";

import SearchComponent from "@/components/search-component";
import { useState } from "react";
import FileDragdropzone from "@/components/file-dragdropzone";
import DropboxImageList from "@/components/dropbox-image-list";

export default function Ui() {
  const [searchInput, setSearchInput] = useState("");
  return (
    <div>
      <SearchComponent searchInput={searchInput} setSearchInput={setSearchInput} />
      <FileDragdropzone />
      <DropboxImageList searchInput={searchInput} />
    </div>
  );
}
