// utils/uploadImageToSupabase.ts

import { supabase } from './supabaseClient';
import { decode } from 'base64-arraybuffer';

export const uploadImage = async (uri: string, storagePath: string) => {
  try {
    // Lấy tên file từ uri
    const filename = `${Date.now()}.jpg`;

    // Fetch ảnh và convert thành blob
    const res = await fetch(uri);
    const blob = await res.blob();

    const { data, error } = await supabase.storage
      .from(storagePath)
      .upload(filename, blob, {
        cacheControl: '3600',
        upsert: false,
        contentType: 'image/jpeg',
      });

    if (error) throw error;

    const { data: publicUrl } = supabase.storage
      .from(storagePath)
      .getPublicUrl(filename);

    return publicUrl?.publicUrl;
  } catch (e) {
    console.error('Upload error:', e);
    return null;
  }
};
