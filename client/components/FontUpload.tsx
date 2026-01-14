import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { IconUpload, IconX } from '@tabler/icons-react';

interface FontUploadProps {
  onFontUpload: (url: string, name: string) => void;
  currentFontName?: string;
  onClear?: () => void;
}

export const FontUpload = ({ onFontUpload, currentFontName, onClear }: FontUploadProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = [
      'font/ttf',
      'font/woff',
      'font/woff2',
      'application/x-font-ttf',
      'application/x-font-woff',
      'application/x-font-woff2',
    ];

    if (!validTypes.some((type) => file.type.includes(type)) && !file.name.match(/\.(ttf|woff|woff2)$/i)) {
      setError('Please upload a valid font file (TTF, WOFF, or WOFF2)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit
      setError('Font file must be smaller than 10MB');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        const fontName = file.name.split('.')[0] || 'CustomFont';
        onFontUpload(dataUrl, fontName);
        setIsLoading(false);
      };
      reader.onerror = () => {
        setError('Failed to read font file');
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    } catch {
      setError('Failed to upload font');
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className='space-y-2'>
      <label className='text-xs font-medium text-muted-foreground'>Custom Font Upload</label>

      <input
        ref={fileInputRef}
        type='file'
        accept='.ttf,.woff,.woff2'
        onChange={handleFileChange}
        className='hidden'
        disabled={isLoading}
      />

      {currentFontName ? (
        <motion.div
          className='flex items-center justify-between rounded-lg bg-muted p-3'
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className='truncate text-sm font-medium text-foreground'>{currentFontName}</span>
          <motion.button
            onClick={() => onClear?.()}
            className='rounded p-1 transition-colors hover:bg-muted-foreground/20'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <IconX size={16} className='text-muted-foreground' />
          </motion.button>
        </motion.div>
      ) : (
        <motion.button onClick={handleClick} disabled={isLoading} className='w-full rounded-lg border-2 border-dashed border-border p-3'>
          <motion.div className='flex items-center justify-center gap-2' whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <IconUpload size={18} className='text-muted-foreground' />
            <span className='text-sm'>{isLoading ? 'Loading...' : 'Upload Font (TTF, WOFF)'}</span>
          </motion.div>
        </motion.button>
      )}

      {error && (
        <motion.p className='text-xs text-red-500' initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          {error}
        </motion.p>
      )}
    </div>
  );
};
