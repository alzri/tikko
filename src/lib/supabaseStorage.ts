import { supabase } from './supabase';

export const uploadAvatar = async (file: File) => {
  const fileName = `${Date.now()}_${file.name}`;

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('user-images') // your bucket name
    .upload(fileName, file);

  if (uploadError) throw uploadError;

  const { data: urlData } = supabase.storage.from('user-images').getPublicUrl(fileName);

  return urlData.publicUrl;
};
