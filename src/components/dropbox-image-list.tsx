"use client";

import DropboxImage from "@/components/dropbox-image";
import { useQuery } from "@tanstack/react-query";
import { searchFiles } from "@/server-actions/storageActions";
import { Spinner } from "@material-tailwind/react";

export default function DropboxImageList({ searchInput }) {
  const { isPending, data, error } = useQuery({
    queryKey: ["images", searchInput],
    queryFn: () => searchFiles(searchInput),
  });

  if (error) return <p>Error loading notes</p>;

  return (
    <section className={"flex flex-wrap justify-between "}>
      {data?.map((image) => <DropboxImage key={image.id} image={image} />)}
      {/*<DropboxImage />*/}
      {/*<DropboxImage />*/}
      {/*<DropboxImage />*/}
      {/*<DropboxImage />*/}
    </section>
  );
}
