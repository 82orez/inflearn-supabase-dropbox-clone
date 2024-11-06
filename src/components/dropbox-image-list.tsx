"use client";

import DropboxImage from "@/components/dropbox-image";

export default function DropboxImageList() {
  return (
    <section className={"flex flex-wrap justify-between "}>
      <DropboxImage />
      <DropboxImage />
      <DropboxImage />
      <DropboxImage />
    </section>
  );
}
