"use client";

import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function DropboxImage() {
  return (
    <div className={"relative"}>
      <div className={"w-72 h-64 border-2 bg-gray-200 flex items-center"}>
        <Image src={"/cutedog.jpeg"} width={500} height={500} alt={"cutedog.jpeg"} className={"rounded-xl"} />
      </div>

      <div>파일 이름</div>

      <button className={"absolute bg-red-300 right-3 top-10 w-8 h-8 rounded-md flex justify-center items-center"}>
        <RiDeleteBin6Line className={"text-xl text-white"} />
      </button>
    </div>
  );
}
