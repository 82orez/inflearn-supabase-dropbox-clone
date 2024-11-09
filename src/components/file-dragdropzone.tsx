"use client";

import { Button } from "@material-tailwind/react";
import { useRef } from "react";
import { uploadFile } from "@/server-actions/storageActions";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/app/react-query-provider";

export default function FileDragdropzone() {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const uploadImageMutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
    onError: (error) => console.error(error),
  });

  return (
    <>
      <p>파일을 여기에 끌어다 놓거나 클릭하여 업로드하세요.</p>
      <form
        // @ts-ignore
        onSubmit={async (e: Event) => {
          e.preventDefault();

          const file = fileRef.current?.files?.[0];
          console.log(file);

          if (file) {
            const formData = new FormData();
            formData.append("file", file);

            const result = uploadImageMutation.mutate(formData);
            console.log(result);
          } else {
            alert("No file selected!");
          }
        }}>
        <input type="file" ref={fileRef} className={"w-full px-5 py-20 border-4 border-dotted border-indigo-700"} />
        {/*@ts-ignore*/}
        <Button type={"submit"} color={"indigo"} loading={uploadImageMutation.isPending}>
          파일 업로드
        </Button>
      </form>
    </>
  );
}
