import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { getColorPresets } from '@/constants/colorPresets';
import { ColorsSection } from '@/components/ColorControl';
import { DisplaySection } from './Display';
import { TypographySection } from './Typography';
import { ContentSection } from './Content';
import { PresetsSection } from './ColorPreset';
import { ActionsSection } from './Action';
import { useColorHistory } from '../hooks/useColorHistory';
import { ContrastChecker } from './ContrastChecker';

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

  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [showExport, setShowExport] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showPresets, setShowPresets] = useState(false);
  const [diceIcon, setDiceIcon] = useState(4);

  // Get filtered presets based on current dark mode
  const filteredPresets = useMemo(() => {
    return getColorPresets(state.isDark ? 'dark' : 'light');
  }, [state.isDark]);

  // Undo/Redo functionality
  const { handleUndo, handleRedo, canUndo, canRedo, saveToHistory } = useColorHistory(state.colors, updateColor);

  const handleGenerateRandom = () => {
    generateRandomPalette();
    setDiceIcon(Math.floor(Math.random() * 6));
    saveToHistory(state.colors);
  };

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
        <ColorsSection colors={state.colors} onColorChange={updateColor} />

        <DisplaySection isDark={state.isDark} isRounded={state.isRounded} toggleDarkMode={toggleDarkMode} toggleRounded={toggleRounded} />

        <PresetsSection
          showPresets={showPresets}
          setShowPresets={setShowPresets}
          filteredPresets={filteredPresets}
          applyPreset={applyPreset}
        />

        <TypographySection
          fontFamily={state.fontFamily}
          fontWeight={state.fontWeight}
          customFontName={state.customFontName}
          setFontFamily={setFontFamily}
          setFontWeight={setFontWeight}
          setCustomFont={setCustomFont}
        />

        <ContentSection
          showContent={showContent}
          setShowContent={setShowContent}
          textContent={state.textContent}
          updateTextContent={updateTextContent}
          resetTextContent={resetTextContent}
        />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <ContrastChecker />
        </motion.div>
      </div>

      <ActionsSection
        handleUndo={handleUndo}
        handleRedo={handleRedo}
        canUndo={canUndo}
        canRedo={canRedo}
        handleGenerateRandom={handleGenerateRandom}
        diceIcon={diceIcon}
        resetPalette={resetPalette}
        showExport={showExport}
        setShowExport={setShowExport}
        resetAllToDefaults={resetAllToDefaults}
        colors={state.colors}
        copiedItem={copiedItem}
        setCopiedItem={setCopiedItem}
      />
      {/* Footer */}
      <div className='border-t border-border/30 bg-muted/20 px-4 py-3 text-center text-xs text-muted-foreground'>
        <p className='font-medium'>Color Studio v1.0</p>
      </div>
    </motion.div>
  );
};
