import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconRainbow, IconChevronDown } from '@tabler/icons-react';

interface PresetsSectionProps {
  showPresets: boolean;
  setShowPresets: (show: boolean) => void;
  filteredPresets: any[];
  applyPreset: (preset: any) => void;
}

export const PresetsSection: React.FC<PresetsSectionProps> = ({ showPresets, setShowPresets, filteredPresets, applyPreset }) => {
  return (
    <motion.div
      className='rounded-xl bg-gray-50 p-5 shadow-sm dark:bg-gray-900'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.68 }}
    >
      <button onClick={() => setShowPresets(!showPresets)} className='flex w-full items-center justify-between focus:outline-none'>
        <div className='flex items-center gap-3'>
          <IconRainbow className='text-primary-500 h-6 w-6' />
          <h2 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>Color Presets</h2>
        </div>
        <span className={`transform text-lg transition-transform duration-300 ${showPresets ? 'rotate-0' : '-rotate-90'}`}>
          <IconChevronDown />
        </span>
      </button>
      <AnimatePresence>
        {showPresets && (
          <motion.div
            className='mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2'
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredPresets.map((preset) => (
              <motion.button
                key={preset.name}
                onClick={() => applyPreset(preset)}
                className='flex flex-col rounded-xl border border-gray-200 bg-white p-4 text-left shadow-sm transition-all duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800'
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <p className='mb-1 text-sm font-semibold text-gray-900 dark:text-gray-100'>{preset.name}</p>
                <p className='text-xs text-gray-500 dark:text-gray-400'>{preset.description}</p>
                <div className='mt-3 flex gap-2'>
                  {['primary', 'secondary', 'accent'].map((key) => (
                    <span
                      key={key}
                      className='h-4 w-4 rounded-full border border-gray-300 dark:border-gray-600'
                      style={{
                        backgroundColor: `hsl(${preset.colors[key as keyof typeof preset.colors]})`,
                      }}
                    />
                  ))}
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
