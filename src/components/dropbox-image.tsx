"use client";

import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getImageUrl } from "@/utils/supabase/storage";
import { useMutation } from "@tanstack/react-query";
import { deleteFile } from "@/server-actions/storageActions";
import { queryClient } from "@/app/react-query-provider";
import { Spinner } from "@material-tailwind/react";

export default function DropboxImage({ image }) {
  const deleteFileMutation = useMutation({
    mutationFn: deleteFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
    onError: (error) => console.error(error),
  });
  return (
    <div className={"relative"}>
      <div className={"w-72 h-64 border-2 bg-gray-200 flex items-center"}>
        <Image src={getImageUrl(image.name)} width={500} height={500} alt={image.name} className={"rounded-xl"} />
      </div>

      <div>{image.name}</div>

      <button
        className={"absolute bg-red-300 right-3 top-10 w-8 h-8 rounded-md flex justify-center items-center"}
        onClick={() => deleteFileMutation.mutate(image.name)}>
        {/*@ts-ignore*/}
        {deleteFileMutation.isPending ? <Spinner /> : <RiDeleteBin6Line className={"text-xl text-white"} />}
      </button>
    </div>
  );
}
