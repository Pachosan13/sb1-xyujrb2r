import { supabase } from '../lib/supabase';

export class StorageService {
  private static instance: StorageService;
  private bucketName = 'cashai-storage';

  private constructor() {}

  public static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  async uploadFile(file: File): Promise<string> {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('Usuario no autenticado');

    try {
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('El archivo es demasiado grande. Máximo 5MB.');
      }

      const filePath = `${user.id}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from(this.bucketName)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from(this.bucketName)
        .getPublicUrl(filePath);

      await supabase.from('documents').insert({
        user_id: user.id,
        file_name: file.name,
        file_url: publicUrl,
        file_type: file.type,
        file_size: file.size
      });

      return publicUrl;
    } catch (error) {
      console.error('Error al subir archivo:', error);
      throw error;
    }
  }

  async uploadBase64Image(base64Data: string, fileName: string): Promise<string> {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('Usuario no autenticado');

    try {
      const base64String = base64Data.split(',')[1] || base64Data;
      const blob = await fetch(`data:image/jpeg;base64,${base64String}`).then(res => res.blob());
      
      const filePath = `${user.id}/${Date.now()}_${fileName}`;
      const { error: uploadError } = await supabase.storage
        .from(this.bucketName)
        .upload(filePath, blob, {
          contentType: 'image/jpeg'
        });

      if (uploadError) throw uploadError;

      console.log('File uploaded successfully:', filePath);
      const { data: { publicUrl } } = supabase.storage
        .from(this.bucketName)
        .getPublicUrl(filePath);

      await supabase.from('documents').insert({
        user_id: user.id,
        file_name: fileName,
        file_url: publicUrl,
        file_type: 'image/jpeg',
        file_size: blob.size
      });

      return publicUrl;
    } catch (error) {
      console.error('Error al subir imagen:', error);
      throw error;
    }
  }
}