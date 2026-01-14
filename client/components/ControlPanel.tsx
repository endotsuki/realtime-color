import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, FONT_FAMILIES } from '@/contexts/ThemeContext';
import { getColorPresets } from '@/constants/colorPresets';
import { useToast } from '@/hooks/use-toast';
import { ColorsSection } from '@/components/ColorControl';
import { FontUpload } from '@/components/FontUpload';
import { TextEditor } from '@/components/TextEditor';
import { ContrastChecker } from '@/components/ContrastChecker';
import { copyToClipboard, generateCSSVariables, generateTailwindConfig } from '@/utils/colorUtils';
import {
  IconDice1Filled,
  IconDice2Filled,
  IconDice3Filled,
  IconDice4Filled,
  IconDice5Filled,
  IconDice6Filled,
  IconCheck,
  IconChevronDown,
  IconColorFilter,
  IconDownload,
  IconFileDescription,
  IconRainbow,
  IconRepeat,
  IconRotateClockwise,
  IconTextResize,
  IconArrowBackUp,
  IconArrowForwardUp,
} from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ModernCheckbox } from './ui/checkbox';

const DICE_ICONS = [IconDice1Filled, IconDice2Filled, IconDice3Filled, IconDice4Filled, IconDice5Filled, IconDice6Filled];

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

export const ControlPanel = () => {
  const {
    state,
    updateColor,
    toggleDarkMode,
    toggleRounded,
    setFontFamily,
    setFontWeight,
    setCustomFont,
    updateTextContent,
    generateRandomPalette,
    resetPalette,
    resetTextContent,
    resetAllToDefaults,
    applyPreset,
  } = useTheme();

  const { toast } = useToast();
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [showExport, setShowExport] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showPresets, setShowPresets] = useState(false);
  const [diceIcon, setDiceIcon] = useState(4);

  // Get filtered presets based on current dark mode
  const filteredPresets = useMemo(() => {
    return getColorPresets(state.isDark ? 'dark' : 'light');
  }, [state.isDark]);

  // Undo/Redo state
  const [history, setHistory] = useState([state.colors]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleGenerateRandom = () => {
    generateRandomPalette();
    setDiceIcon(Math.floor(Math.random() * 6));

    // Save to history
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(state.colors);
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      const prevColors = history[prevIndex];

      Object.entries(prevColors).forEach(([key, value]) => {
        updateColor(key as any, value);
      });

      setCurrentIndex(prevIndex);
    }
  };

  const handleRedo = () => {
    if (currentIndex < history.length - 1) {
      const nextIndex = currentIndex + 1;
      const nextColors = history[nextIndex];

      Object.entries(nextColors).forEach(([key, value]) => {
        updateColor(key as any, value);
      });

      setCurrentIndex(nextIndex);
    }
  };

  const handleCopy = async (text: string, itemId: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedItem(itemId);
      setTimeout(() => setCopiedItem(null), 2000);
    }
  };

  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  return (
    <motion.div
      className='scrollbar-custom flex h-full flex-col overflow-hidden border-r border-border/50 bg-background'
      initial={{ x: -400 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Header */}
      <div className='border-b border-border/30 px-6 pb-4 pt-6'>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h1 className='mb-1 text-xl font-bold text-foreground'>Color Studio</h1>
          <p className='text-xs text-muted-foreground'>Create stunning color systems</p>
        </motion.div>
      </div>

      {/* Scrollable Content */}
      <div className='scrollbar-hide flex-1 space-y-3 overflow-y-auto px-4 py-4'>
        {/* Colors */}
        <ColorsSection colors={state.colors} onColorChange={updateColor} />

        {/* Display */}
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
            <ModernCheckbox label='Dark Mode' checked={state.isDark} onChange={toggleDarkMode} />
            <ModernCheckbox label='Rounded Corners' checked={state.isRounded} onChange={toggleRounded} />
          </div>
        </motion.div>

        {/* Typography */}
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
            <Select value={state.fontFamily} onValueChange={setFontFamily} disabled={!!state.customFontName}>
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
            <Select value={state.fontWeight} onValueChange={(v) => setFontWeight(v as any)}>
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
          <FontUpload
            onFontUpload={setCustomFont}
            currentFontName={state.customFontName}
            onClear={() => setFontFamily('Plus Jakarta Sans')}
          />
        </motion.div>

        {/* Content */}
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
                    value={state.textContent[item.key]}
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

        {/* Presets */}
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

        {/* Accessibility */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <ContrastChecker />
        </motion.div>
      </div>

      {/* Actions - Fixed at Bottom */}
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

        {/* Export Panel - Inline */}
        <AnimatePresence>
          {showExport && (
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
                    onClick={() => handleCopy(generateCSSVariables(state.colors), 'css')}
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
                    onClick={() => handleCopy(generateTailwindConfig(state.colors), 'tailwind')}
                    className='flex-1 truncate rounded border border-border/50 bg-background px-2 py-1 text-left font-mono text-xs text-muted-foreground hover:bg-muted'
                  >
                    Copy
                  </button>
                  {copiedItem === 'tailwind' && <IconCheck size={16} className='text-green-600' />}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className='border-t border-border/30 bg-muted/20 px-4 py-3 text-center text-xs text-muted-foreground'>
        <p className='font-medium'>Color Studio v1.0</p>
      </div>
    </motion.div>
  );
};
