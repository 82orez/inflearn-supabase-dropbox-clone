"use client";

import { Button } from "@material-tailwind/react";
import { useRef } from "react";

export default function FileDragdropzone() {
  const fileRef = useRef<HTMLInputElement | null>(null);

  return (
    <form
      // @ts-ignore
      onSubmit={(e: Event) => {
        e.preventDefault();
        const file = fileRef.current?.files?.[0];
        console.log(file);
      }}>
      <p>파일을 여기에 끌어다 놓거나 클릭하여 업로드하세요.</p>
      <input type="file" ref={fileRef} className={"w-full px-5 py-20 border-4 border-dotted border-indigo-700"} />
      {/*@ts-ignore*/}
      <Button type={"submit"} color={"indigo"}>
        파일 업로드
      </Button>
    </form>
  );
}
