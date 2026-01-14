import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IconDice1Filled,
  IconDice2Filled,
  IconDice3Filled,
  IconDice4Filled,
  IconDice5Filled,
  IconDice6Filled,
  IconDownload,
  IconRotateClockwise,
  IconRepeat,
  IconArrowBackUp,
  IconArrowForwardUp,
  IconCheck,
} from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { copyToClipboard, generateCSSVariables, generateTailwindConfig } from '@/utils/colorUtils';

const DICE_ICONS = [IconDice1Filled, IconDice2Filled, IconDice3Filled, IconDice4Filled, IconDice5Filled, IconDice6Filled];

interface ActionsSectionProps {
  handleUndo: () => void;
  handleRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  handleGenerateRandom: () => void;
  diceIcon: number;
  resetPalette: () => void;
  showExport: boolean;
  setShowExport: (show: boolean) => void;
  resetAllToDefaults: () => void;
  colors: any;
  copiedItem: string | null;
  setCopiedItem: (item: string | null) => void;
}

export const ActionsSection: React.FC<ActionsSectionProps> = ({
  handleUndo,
  handleRedo,
  canUndo,
  canRedo,
  handleGenerateRandom,
  diceIcon,
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
        <Button onClick={handleUndo} variant='design-review' className='flex-1' disabled={!canUndo}>
          <IconArrowBackUp size={16} />
          Undo
        </Button>
        <Button onClick={handleRedo} variant='design-review' className='flex-1' disabled={!canRedo}>
          <IconArrowForwardUp size={16} />
          Redo
        </Button>
      </div>
      <div className='flex gap-2'>
        <Button onClick={handleGenerateRandom} variant='design-review' className='w-full'>
          {React.createElement(DICE_ICONS[diceIcon], { size: 16 })}
          Random
        </Button>
        <Button onClick={resetPalette} variant='in-review' className='flex-1'>
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

  return (
    <motion.div
      className='space-y-2 rounded-lg bg-muted/40 p-3'
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div className='space-y-1' initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <p className='text-xs font-bold uppercase tracking-wide text-muted-foreground'>CSS</p>
        <div className='flex gap-2'>
          <button
            onClick={() => handleCopy(generateCSSVariables(colors), 'css')}
            className='flex-1 truncate rounded border border-border/50 bg-background px-2 py-1 text-left font-mono text-xs text-muted-foreground hover:bg-muted'
          >
            Copy
          </button>
          {copiedItem === 'css' && <IconCheck size={16} className='text-green-600' />}
        </div>
      </motion.div>
      <motion.div className='space-y-1' initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <p className='text-xs font-bold uppercase tracking-wide text-muted-foreground'>Tailwind</p>
        <div className='flex gap-2'>
          <button
            onClick={() => handleCopy(generateTailwindConfig(colors), 'tailwind')}
            className='flex-1 truncate rounded border border-border/50 bg-background px-2 py-1 text-left font-mono text-xs text-muted-foreground hover:bg-muted'
          >
            Copy
          </button>
          {copiedItem === 'tailwind' && <IconCheck size={16} className='text-green-600' />}
        </div>
      </motion.div>
    </motion.div>
  );
};
