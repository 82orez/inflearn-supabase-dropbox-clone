"use server";

import { createClient } from "@/utils/supabase/server";

function handleError(error) {
  if (error) {
    console.error(error);
    throw error;
  }
}

export async function uploadFile(formatData: FormData) {
  const supabase = await createClient();
  const file = formatData.get("file") as File;

  const { data, error } = await supabase.storage.from(process.env.NEXT_PUBLIC_STORAGE_BUCKET as string).upload(file.name, file, { upsert: true });

  handleError(error);

  return data;
}

export async function uploadDragNDropFile(formatData: FormData) {
  const supabase = await createClient();

  // formData(객체) 의 자료형은 다음과 같은 객체 형태이다.
  // {'file\'s name': File, 'file\'s name': File,...}
  // 따라서 먼저 Array.from 메서드와 entries 메서드를 이용해서 다음과 같이 배열 안에 배열이 담긴 형태로 만들어 준다.
  // [['file\'s name', File], ['file\'s name', File], ...]
  // 이후에 다시 map 메서드를 이용해서 최종적으로 다음과 같은 형태의 배열을 반환한다. 즉, 'file\'s name' 은 제거하고, File 만 남긴다.
  // [File, File, ...]
  const files = Array.from(formatData.entries()).map(([name, file]) => {
    return file as File;
  });

  // Promise.all 메서드의 인자(파라미터) 안에는 Promises 를 요소로 가진 배열이 들어간다.
  // const results = await Promise.all([ /* Array of Promises */ ]);
  const results = await Promise.all(
    files.map((file) => {
      return supabase.storage.from(process.env.NEXT_PUBLIC_STORAGE_BUCKET as string).upload(file.name, file, { upsert: true });
    }),
  ).catch((e) => console.error(e));

  return results;
}

export async function searchFiles(searchInput: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.storage.from(process.env.NEXT_PUBLIC_STORAGE_BUCKET as string).list(undefined, { search: searchInput });

  handleError(error);
  // console.log(data);
  return data;
}

export async function deleteFile(fileName: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.storage.from(process.env.NEXT_PUBLIC_STORAGE_BUCKET as string).remove([fileName]);

  handleError(error);

  return data;
}
