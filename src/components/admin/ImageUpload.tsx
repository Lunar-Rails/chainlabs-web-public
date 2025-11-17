import { useState, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  currentImageUrl?: string | null;
  onImageUploaded: (url: string) => void;
  onImageRemoved: () => void;
}

export default function ImageUpload({ currentImageUrl, onImageUploaded, onImageRemoved }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `covers/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('content-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('content-images')
        .getPublicUrl(filePath);

      setPreviewUrl(publicUrl);
      onImageUploaded(publicUrl);
    } catch (error: any) {
      alert('Error uploading image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    onImageRemoved();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-[#001641] mb-2">
        Cover Image
      </label>

      {previewUrl ? (
        <div className="relative group">
          <img
            src={previewUrl}
            alt="Cover preview"
            className="w-full h-64 object-cover rounded-lg border border-gray-300"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-3 right-3 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors opacity-0 group-hover:opacity-100"
          >
            <X size={20} />
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#FF8A00] hover:bg-orange-50 transition-colors"
        >
          {uploading ? (
            <div className="text-center">
              <Upload className="mx-auto mb-2 text-gray-400 animate-pulse" size={48} />
              <p className="text-gray-600 font-semibold">Uploading...</p>
            </div>
          ) : (
            <div className="text-center">
              <ImageIcon className="mx-auto mb-2 text-gray-400" size={48} />
              <p className="text-gray-600 font-semibold mb-1">Click to upload cover image</p>
              <p className="text-sm text-gray-500">PNG, JPG, WEBP up to 5MB</p>
            </div>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={uploading}
      />
    </div>
  );
}
