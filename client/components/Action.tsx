import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconDownload, IconRotateClockwise, IconRepeat, IconCheck } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { copyToClipboard, generateCSSVariables, generateTailwindConfig } from '@/utils/colorUtils';

interface ActionsSectionProps {
  resetPalette: () => void;
  showExport: boolean;
  setShowExport: (show: boolean) => void;
  resetAllToDefaults: () => void;
  colors: any;
  copiedItem: string | null;
  setCopiedItem: (item: string | null) => void;
}

export const ActionsSection: React.FC<ActionsSectionProps> = ({
  resetPalette,
  showExport,
  setShowExport,
  resetAllToDefaults,
  colors,
  copiedItem,
  setCopiedItem,
}) => {
  return (
    <div className='space-y-2 border-t border-border/30 bg-background px-4 py-3'>
      <div className='flex gap-2'>
        <Button onClick={resetPalette} variant='in-review' className='w-full'>
          <IconRotateClockwise size={16} />
          Reset
        </Button>
      </div>
      <div className='flex gap-2'>
        <Button onClick={() => setShowExport(!showExport)} variant='done' className='w-full'>
          <IconDownload size={16} />
          Export
        </Button>
        <Button variant='blocked' onClick={resetAllToDefaults} className='flex-1'>
          <IconRepeat size={16} />
          Reset All
        </Button>
      </div>

      <AnimatePresence>
        {showExport && <ExportPanel colors={colors} copiedItem={copiedItem} setCopiedItem={setCopiedItem} />}
      </AnimatePresence>
    </div>
  );
};

interface ExportPanelProps {
  colors: any;
  copiedItem: string | null;
  setCopiedItem: (item: string | null) => void;
}

export const ExportPanel: React.FC<ExportPanelProps> = ({ colors, copiedItem, setCopiedItem }) => {
  const handleCopy = async (text: string, itemId: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedItem(itemId);
      setTimeout(() => setCopiedItem(null), 2000);
    }
  };

  const items = [
    { key: 'css-variables', label: 'CSS Variables', getValue: generateCSSVariables },
    { key: 'tailwind-config', label: 'Tailwind Config', getValue: generateTailwindConfig },
  ];

  return (
    <motion.div
      className='space-y-3 rounded-lg bg-muted/30 p-3'
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {items.map(({ key, label, getValue }, index) => (
        <motion.div
          key={key}
          className='space-y-1'
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 * index }}
        >
          <p className='text-[10px] font-semibold uppercase tracking-wider text-muted-foreground'>{label}</p>

          <div className='flex items-center gap-2'>
            <Button variant='on-hold' onClick={() => handleCopy(getValue(colors), key)} className='flex-1 hover:bg-muted'>
              Copy
            </Button>

            <motion.div layout className='flex h-4 w-4 items-center justify-center'>
              {copiedItem === key && <IconCheck size={14} className='text-green-600' />}
            </motion.div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
