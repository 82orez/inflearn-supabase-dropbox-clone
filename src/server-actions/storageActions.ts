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
