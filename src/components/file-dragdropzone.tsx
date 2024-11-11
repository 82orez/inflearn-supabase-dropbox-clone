"use client";

import { Button, Spinner } from "@material-tailwind/react";
import { useCallback, useRef } from "react";
import { uploadDragNDropFile, uploadFile } from "@/server-actions/storageActions";
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

  const uploadImageDragNDropMutation = useMutation({
    mutationFn: uploadDragNDropFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
    onError: (error) => console.error(error),
  });

  const onDrop = useCallback((acceptedFiles: any[]) => {
    // * Do something with the files

    if (acceptedFiles.length > 0) {
      const formData = new FormData(); // FormData 의 자료형은 객체.

      // acceptedFiles 의 자료형은 배열이고, file 의 자료형은 File 이므로 File.name 이라는 속성을 가진다.
      // 따라서 forEach 사용하여 formData(객체)를 다음과 같은 형태로 만들어 준다.
      // {'file\'s name': File, 'file\'s name': File,...}
      acceptedFiles.forEach((file) => {
        formData.append(file.name, file);
        return;
      });

      uploadImageDragNDropMutation.mutate(formData);
    }
    // else {
    //   alert("No file selected!");
    // }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: true });

  return (
    <>
      <p>파일을 여기에 끌어다 놓거나 클릭하여 업로드하세요.</p>

      <div {...getRootProps()} className={"w-full px-5 py-16 border-4 border-dotted border-indigo-700 cursor-pointer text-xl "}>
        <input {...getInputProps()} />
        {uploadImageDragNDropMutation.isPending ? (
          // @ts-ignore
          <Spinner />
        ) : (
          <>
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <div>
                <p>Drag and drop some files here, or click to select files!</p>
                {/*@ts-ignore*/}
                <Button color={"cyan"} size={"lg"} className={"mt-4"}>
                  Click here!
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      <form
        // @ts-ignore
        onSubmit={(e: Event) => {
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
