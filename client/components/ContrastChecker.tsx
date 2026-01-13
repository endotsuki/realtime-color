import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { getContrastRatio, hasGoodContrast } from '@/utils/colorUtils';
import { IconCheck, IconContrast2Filled, IconInfoCircleFilled, IconChevronDown } from '@tabler/icons-react';

const contrastItems = (colors: any) => [
  { name: 'Text on Background', c1: colors.text, c2: colors.bg },
  { name: 'Primary Button Text', c1: 'hsl(0 0% 100%)', c2: colors.primary },
  { name: 'Primary on Background', c1: colors.primary, c2: colors.bg },
  { name: 'Accent on Background', c1: colors.accent, c2: colors.bg },
];

export const ContrastChecker: React.FC = () => {
  const { state } = useTheme();
  const [showContrast, setShowContrast] = useState(false);

  const results = useMemo(
    () =>
      contrastItems(state.colors).map(({ name, c1, c2 }) => {
        const contrast = getContrastRatio(c1, c2);
        const passes = hasGoodContrast(c1, c2);
        return {
          name,
          c1,
          c2,
          contrast: contrast.toFixed(2),
          passes,
          level: contrast >= 7 ? 'AAA' : contrast >= 4.5 ? 'AA' : 'Fail',
        };
      }),
    [state.colors]
  );

  return (
    <div className='rounded-xl bg-gray-50 p-5 shadow-sm dark:bg-gray-900'>
      {/* Header with Dropdown */}
      <button onClick={() => setShowContrast(!showContrast)} className='flex w-full items-center justify-between focus:outline-none'>
        <div className='flex items-center gap-3'>
          <IconContrast2Filled className='text-primary-500 h-6 w-6' />
          <h2 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>Contrast Checker</h2>
        </div>
        <span className={`transform text-lg transition-transform duration-300 ${showContrast ? 'rotate-0' : '-rotate-90'}`}>
          <IconChevronDown />
        </span>
      </button>

      <AnimatePresence>
        {showContrast && (
          <motion.div
            className='space-y-4'
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className='mt-3 text-xs text-gray-500 dark:text-gray-400'>WCAG contrast ratios for your color scheme</p>

            {/* Results */}
            <div className='space-y-3'>
              {results.map(({ name, c1, c2, contrast, passes, level }, idx) => (
                <div key={idx} className='rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800'>
                  <div className='flex items-start justify-between'>
                    <div>
                      <p className='text-sm font-medium text-gray-900 dark:text-gray-100'>{name}</p>
                      <p className='text-xs text-gray-500 dark:text-gray-400'>Ratio: {contrast}:1</p>
                    </div>
                    <div
                      className={`flex items-center gap-1 rounded px-2 py-1 text-xs font-semibold ${
                        passes
                          ? 'bg-green-100 text-green-500 dark:bg-green-500/20 dark:text-green-500'
                          : 'bg-red-100 text-red-500 dark:bg-red-600/20 dark:text-red-500'
                      }`}
                    >
                      {passes ? (
                        <>
                          <IconCheck size={12} /> {level}
                        </>
                      ) : (
                        <>
                          <IconInfoCircleFilled size={12} /> FAIL
                        </>
                      )}
                    </div>
                  </div>

                  {/* Sample */}
                  <div
                    className='mt-2 flex h-9 items-center justify-center rounded-sm text-xs font-bold'
                    style={{
                      backgroundColor: `hsl(${c2})`,
                      color: `hsl(${c1})`,
                      border: `1px solid hsl(${c1})`,
                    }}
                  >
                    Sample
                  </div>
                </div>
              ))}
            </div>

            {/* WCAG info */}
            <div className='rounded-xl border border-blue-200 bg-blue-50 p-3 text-xs text-gray-500 dark:border-blue-900 dark:bg-blue-950/30 dark:text-gray-400'>
              <p className='mb-1 font-semibold'>💡 WCAG Standards:</p>
              <ul className='space-y-1'>
                <li>
                  • <strong>AA:</strong> 4.5:1 ratio (standard)
                </li>
                <li>
                  • <strong>AAA:</strong> 7:1 ratio (enhanced)
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
