import React, { useRef, useState } from 'react';
import { UploadCloud, File, X, CheckCircle, AlertCircle } from 'lucide-react';
import Button from '../ui/Button';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  allowedExtensions?: string[];
  maxSizeMB?: number;
  label?: string;
  error?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  allowedExtensions = ['pdf', 'doc', 'docx', 'jpg', 'png'],
  maxSizeMB = 5,
  label,
  error,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = (selectedFile: File): boolean => {
    const ext = selectedFile.name.split('.').pop()?.toLowerCase();
    if (ext && !allowedExtensions.includes(ext)) {
      setFileError(`Invalid format. Allowed formats: ${allowedExtensions.join(', ')}`);
      return false;
    }

    const sizeMB = selectedFile.size / (1024 * 1024);
    if (sizeMB > maxSizeMB) {
      setFileError(`File too large. Max allowed size: ${maxSizeMB}MB`);
      return false;
    }

    setFileError(null);
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      if (validateFile(selected)) {
        setFile(selected);
        onFileSelect(selected);
      } else {
        setFile(null);
        onFileSelect(null);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const selected = e.dataTransfer.files?.[0];
    if (selected) {
      if (validateFile(selected)) {
        setFile(selected);
        onFileSelect(selected);
      } else {
        setFile(null);
        onFileSelect(null);
      }
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    setFileError(null);
    onFileSelect(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-semibold text-slate-700 dark:text-zinc-305">
          {label}
        </label>
      )}

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center
          ${
            isDragOver
              ? 'border-brand-500 bg-brand-50/10 dark:bg-brand-500/5'
              : file
              ? 'border-emerald-300 dark:border-emerald-900/30 bg-emerald-50/10 dark:bg-emerald-500/5'
              : error || fileError
              ? 'border-red-300 dark:border-red-950/20 bg-red-50/5 dark:bg-red-950/5'
              : 'border-slate-300 dark:border-zinc-700 hover:border-brand-500 dark:hover:border-zinc-650 bg-white dark:bg-zinc-900'
          }
        `}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept={allowedExtensions.map((e) => `.${e}`).join(',')}
        />

        {file ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <File className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-750 dark:text-zinc-200">
              {file.name}
            </p>
            <p className="text-[10px] text-slate-400 dark:text-zinc-500">
              {(file.size / 1024).toFixed(1)} KB
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2 text-red-500 border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-950/10 cursor-pointer"
              onClick={removeFile}
            >
              Remove file
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <UploadCloud className="w-8 h-8 text-slate-400 dark:text-zinc-500" />
            <p className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
              Click to upload or drag & drop
            </p>
            <p className="text-[10px] text-slate-400 dark:text-zinc-500">
              Supported formats: {allowedExtensions.join(', ').toUpperCase()} (Max: {maxSizeMB}MB)
            </p>
          </div>
        )}
      </div>

      {(error || fileError) && (
        <p className="text-[11px] text-red-500 font-medium flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5" />
          {error || fileError}
        </p>
      )}
    </div>
  );
};

export default FileUpload;
