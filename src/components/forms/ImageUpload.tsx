import React, { useRef, useState } from 'react';
import { Camera, X, AlertCircle } from 'lucide-react';
import Button from '../ui/Button';

interface ImageUploadProps {
  onImageSelect: (file: File | null, previewUrl: string | null) => void;
  aspect?: 'square' | 'video';
  label?: string;
  error?: string;
  initialPreview?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelect,
  aspect = 'square',
  label,
  error,
  initialPreview,
}) => {
  const [preview, setPreview] = useState<string | null>(initialPreview || null);
  const [fileError, setFileError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      if (!selected.type.startsWith('image/')) {
        setFileError('Invalid format. Please select an image file (PNG, JPG, WEBP).');
        setPreview(null);
        onImageSelect(null, null);
        return;
      }

      setFileError(null);
      const url = URL.createObjectURL(selected);
      setPreview(url);
      onImageSelect(selected, url);
    }
  };

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    setFileError(null);
    onImageSelect(null, null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
          {label}
        </label>
      )}

      <div
        onClick={() => inputRef.current?.click()}
        className={`relative group overflow-hidden border border-slate-350 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 rounded-xl cursor-pointer hover:border-brand-500 transition-all flex flex-col items-center justify-center
          ${aspect === 'square' ? 'aspect-square w-32' : 'aspect-video w-full'}
        `}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={handleImageChange}
          accept="image/*"
        />

        {preview ? (
          <>
            <img src={preview} alt="Upload Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <button
              onClick={removeImage}
              className="absolute top-2 right-2 p-1 rounded-full bg-slate-900/60 text-white hover:bg-slate-950 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-1 p-4 text-center">
            <Camera className="w-6 h-6 text-slate-450 dark:text-zinc-500 group-hover:text-brand-500 transition-colors" />
            <span className="text-[10px] font-bold text-slate-550 dark:text-zinc-400">
              Upload Image
            </span>
          </div>
        )}
      </div>

      {(error || fileError) && (
        <p className="text-[11px] text-red-500 font-medium flex items-center gap-1 mt-1">
          <AlertCircle className="w-3.5 h-3.5" />
          {error || fileError}
        </p>
      )}
    </div>
  );
};

export default ImageUpload;
