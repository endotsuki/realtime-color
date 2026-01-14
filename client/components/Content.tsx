import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconFileDescription, IconChevronDown, IconRotateClockwise } from '@tabler/icons-react';
import { TextEditor } from '@/components/TextEditor';

const TEXT_FIELDS = [
  { label: 'Navbar Brand', key: 'navbarBrand' as const, maxLength: 50 },
  { label: 'Hero Title', key: 'heroTitle' as const, maxLength: 100 },
  {
    label: 'Hero Description',
    key: 'heroDescription' as const,
    maxLength: 200,
    multiline: true,
    rows: 3,
  },
  { label: 'Section Title', key: 'cardTitle' as const, maxLength: 50 },
  { label: 'Get Started Button', key: 'getStartedBtn' as const, maxLength: 30 },
  { label: 'Learn More Button', key: 'learnMoreBtn' as const, maxLength: 30 },
];

interface ContentSectionProps {
  showContent: boolean;
  setShowContent: (show: boolean) => void;
  textContent: any;
  updateTextContent: (key: string, value: string) => void;
  resetTextContent: () => void;
}

export const ContentSection: React.FC<ContentSectionProps> = ({
  showContent,
  setShowContent,
  textContent,
  updateTextContent,
  resetTextContent,
}) => {
  return (
    <motion.div
      className='rounded-xl bg-gray-50 p-5 shadow-sm dark:bg-gray-900'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.65 }}
    >
      <button onClick={() => setShowContent(!showContent)} className='flex w-full items-center justify-between focus:outline-none'>
        <div className='flex items-center gap-3'>
          <IconFileDescription className='text-primary-500 h-6 w-6' />
          <h2 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>Content</h2>
        </div>
        <span className={`transform text-lg transition-transform duration-300 ${showContent ? 'rotate-0' : '-rotate-90'}`}>
          <IconChevronDown />
        </span>
      </button>
      <AnimatePresence>
        {showContent && (
          <motion.div
            className='mt-4 space-y-3 border-t border-gray-200 pt-4 dark:border-gray-700'
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {TEXT_FIELDS.map((item) => (
              <TextEditor
                key={item.key}
                label={item.label}
                value={textContent[item.key]}
                onChange={(value) => updateTextContent(item.key, value)}
                maxLength={item.maxLength}
                multiline={item.multiline}
                rows={item.rows}
              />
            ))}
            <motion.button
              onClick={resetTextContent}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='flex w-full items-center justify-center gap-2 rounded-xl bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:opacity-90 dark:bg-gray-800 dark:text-gray-200'
            >
              <IconRotateClockwise size={16} />
              Reset Text
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
