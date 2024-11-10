"use client";

import { Button, Spinner } from "@material-tailwind/react";
import { useCallback, useRef } from "react";
import { uploadFile } from "@/server-actions/storageActions";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/app/react-query-provider";
import { useDropzone } from "react-dropzone";

export default function FileDragdropzone() {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const uploadImageMutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
    onError: (error) => console.error(error),
  });

  const onDrop = useCallback(async (acceptedFiles) => {
    // * Do something with the files
    const file = acceptedFiles?.[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      console.log(formData.get("file"));

      uploadImageMutation.mutate(formData);
    }
    // else {
    //   alert("No file selected!");
    // }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <p>파일을 여기에 끌어다 놓거나 클릭하여 업로드하세요.</p>

      <div {...getRootProps()} className={"w-full px-5 py-16 border-4 border-dotted border-indigo-700 cursor-pointer text-xl "}>
        <input {...getInputProps()} />
        {uploadImageMutation.isPending ? (
          // @ts-ignore
          <Spinner />
        ) : (
          <>{isDragActive ? <p>Drop the files here ...</p> : <p>Drag and drop some files here, or click to select files!</p>}</>
        )}
      </div>

      <form
        // @ts-ignore
        onSubmit={async (e: Event) => {
          e.preventDefault();

          const file = fileRef.current?.files?.[0];
          console.log(file);

          if (file) {
            const formData = new FormData();
            formData.append("file", file);

            uploadImageMutation.mutate(formData);
          } else {
            alert("No file selected!");
          }
        }}>
        <input type="file" ref={fileRef} className={"w-full px-5 py-3 border border-indigo-700"} />
        {/*@ts-ignore*/}
        <Button type={"submit"} color={"indigo"} loading={uploadImageMutation.isPending}>
          파일 업로드
        </Button>
      </form>
    </>
  );
}
