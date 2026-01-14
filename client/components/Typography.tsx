import React from 'react';
import { motion } from 'framer-motion';
import { IconTextResize } from '@tabler/icons-react';
import { FONT_FAMILIES } from '@/contexts/ThemeContext';
import { FontUpload } from '@/components/FontUpload';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TypographySectionProps {
  fontFamily: string;
  fontWeight: string;
  customFontName: string | null;
  setFontFamily: (family: string) => void;
  setFontWeight: (weight: string) => void;
  setCustomFont: (name: string, url: string) => void;
}

export const TypographySection: React.FC<TypographySectionProps> = ({
  fontFamily,
  fontWeight,
  customFontName,
  setFontFamily,
  setFontWeight,
  setCustomFont,
}) => {
  return (
    <motion.div
      className='space-y-3 rounded-lg bg-muted/40 p-4'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55 }}
    >
      <div className='mb-2 flex items-center gap-2'>
        <IconTextResize />
        <h2 className='text-xl font-semibold text-foreground'>Prototype</h2>
      </div>
      <div className='space-y-1.5'>
        <label className='block pl-1 text-xs font-medium text-muted-foreground'>Family</label>
        <Select value={fontFamily} onValueChange={setFontFamily} disabled={!!customFontName}>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Select family...' />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(FONT_FAMILIES).map((family) => (
              <SelectItem key={family} value={family}>
                {family}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className='space-y-1.5'>
        <label className='block pl-1 text-xs font-medium text-muted-foreground'>Weight</label>
        <Select value={fontWeight} onValueChange={(v) => setFontWeight(v as any)}>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Select weight...' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='400'>Light (400)</SelectItem>
            <SelectItem value='500'>Regular (500)</SelectItem>
            <SelectItem value='600'>Semi Bold (600)</SelectItem>
            <SelectItem value='700'>Bold (700)</SelectItem>
            <SelectItem value='800'>Extra Bold (800)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <FontUpload onFontUpload={setCustomFont} currentFontName={customFontName} onClear={() => setFontFamily('Plus Jakarta Sans')} />
    </motion.div>
  );
};
