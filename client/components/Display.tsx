import React from 'react';
import { motion } from 'framer-motion';
import { IconColorFilter } from '@tabler/icons-react';
import { ModernCheckbox } from '@/components/ui/checkbox';

interface DisplaySectionProps {
  isDark: boolean;
  isRounded: boolean;
  toggleDarkMode: () => void;
  toggleRounded: () => void;
}

export const DisplaySection: React.FC<DisplaySectionProps> = ({ isDark, isRounded, toggleDarkMode, toggleRounded }) => {
  return (
    <motion.div
      className='space-y-2 rounded-lg bg-muted/40 p-4'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className='mb-2 flex items-center gap-2'>
        <IconColorFilter />
        <h2 className='text-xl font-semibold text-foreground'>Display</h2>
      </div>
      <div className='space-y-2'>
        <ModernCheckbox label='Dark Mode' checked={isDark} onChange={toggleDarkMode} />
        <ModernCheckbox label='Rounded Corners' checked={isRounded} onChange={toggleRounded} />
      </div>
    </motion.div>
  );
};
