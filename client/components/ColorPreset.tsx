import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IconTemplate,
  IconChevronDown,
  IconSearch,
  IconX,
  IconSparkles,
  IconMoon,
  IconSun,
  IconLayoutGridFilled,
  IconLayoutListFilled,
} from '@tabler/icons-react';
import { getColorPresets } from '@/constants/colorPresets';
import { Button } from './ui/button';
import { Input } from './ui/input';

type ViewMode = 'grid' | 'compact';

interface ViewToggleProps {
  mode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
  count: number;
}

// Extracted Components
const SearchBar = ({ value, onChange, onClear }: any) => (
  <div className='mb-4 mt-4'>
    <div className='relative'>
      <IconSearch className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
      <Input
        type='text'
        placeholder='Search presets...'
        value={value}
        onChange={onChange}
        // autoFocus
        className='w-full py-2 pl-10 pr-10 text-sm placeholder-gray-400'
      />
      {value && (
        <button onClick={onClear} className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'>
          <IconX className='h-4 w-4' />
        </button>
      )}
    </div>
    {value && <p className='mt-2 text-xs text-gray-500 dark:text-gray-400'>Searching for "{value}"</p>}
  </div>
);

const CategoryPills = ({ categories, selected, onSelect, count }: any) => (
  <div className='mb-4 flex flex-wrap gap-2'>
    {categories.map((cat: any) => (
      <Button
        key={cat.id}
        onClick={() => onSelect(cat.id)}
        variant={selected === cat.id ? 'on-hold' : 'outline'}
        size='sm'
        className='flex items-center gap-1 rounded-full px-3 transition-all duration-300'
      >
        <span>{cat.icon}</span>
        <span>{cat.label}</span>
        {selected === cat.id && cat.id !== 'all' && (
          <span className='ml-0.5 text-[10px] opacity-80 transition-all duration-500'>({count})</span>
        )}
      </Button>
    ))}
  </div>
);

const ViewToggle = ({ mode, onModeChange, count }: ViewToggleProps) => {
  const views: ViewMode[] = ['grid', 'compact'];
  const icons = { grid: IconLayoutGridFilled, compact: IconLayoutListFilled };

  return (
    <div className='mb-4 flex items-center justify-between gap-3'>
      <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>
        {count} {count === 1 ? 'preset' : 'presets'} found
      </p>
      <div className='flex rounded-xl bg-gray-100 p-1 dark:bg-gray-800'>
        {views.map((view) => {
          const isActive = mode === view;
          const Icon = icons[view];
          return (
            <Button
              variant='ghost'
              key={view}
              onClick={() => onModeChange(view)}
              className={`relative px-3 text-xs transition-all duration-200 ${
                isActive
                  ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-gray-100'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
              } `}
            >
              <Icon className='h-4 w-4' />
            </Button>
          );
        })}
      </div>
    </div>
  );
};

const PresetCard = ({ preset, isActive, viewMode, index, onClick }: any) => (
  <motion.button
    onClick={onClick}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    className={`group relative flex rounded-xl border-2 bg-white text-left shadow-sm hover:shadow-md dark:bg-gray-800 ${
      viewMode === 'grid' ? 'flex-col p-4' : 'flex-row items-center gap-3 p-3'
    } ${isActive ? 'border-primary/60 shadow-md' : 'border-gray-200 dark:border-gray-700'}`}
    whileHover={{ scale: viewMode === 'grid' ? 1.02 : 1.01 }}
  >
    {isActive && (
      <div className='absolute right-3 top-3'>
        <IconSparkles className='h-4 w-4 text-primary' />
      </div>
    )}

    <div className={`flex gap-2 ${viewMode === 'compact' ? 'flex-shrink-0' : 'mb-3'}`}>
      {['primary', 'secondary', 'accent'].map((key) => (
        <span
          key={key}
          className={`rounded-full border border-gray-300 dark:border-gray-600 ${viewMode === 'grid' ? 'h-5 w-5' : 'h-4 w-4'}`}
          style={{ backgroundColor: `hsl(${preset.colors[key]})` }}
        />
      ))}
    </div>

    <div className='min-w-0 flex-1'>
      <p className={`font-semibold text-gray-900 dark:text-gray-100 ${viewMode === 'grid' ? 'mb-1 text-sm' : 'text-xs'}`}>{preset.name}</p>
      <p className={`text-gray-500 dark:text-gray-400 ${viewMode === 'grid' ? 'text-xs' : 'truncate text-[10px]'}`}>{preset.description}</p>
    </div>
  </motion.button>
);

const EmptyState = ({ onClear }: any) => (
  <div className='py-12 text-center'>
    <p className='text-sm text-gray-500 dark:text-gray-400'>No presets found</p>
    <p className='mt-1 text-xs text-gray-400 dark:text-gray-500'>Try different keywords or clear filters</p>
    <button onClick={onClear} className='mt-3 text-xs text-primary hover:underline'>
      Clear all filters
    </button>
  </div>
);

// Main Component
const CATEGORIES = [
  { id: 'all', label: 'All', icon: '✨' },
  { id: 'light', label: 'Light', icon: <IconSun className='h-3 w-3' /> },
  { id: 'dark', label: 'Dark', icon: <IconMoon className='h-3 w-3' /> },
];

interface PresetsSectionProps {
  showPresets: boolean;
  setShowPresets: (show: boolean) => void;
  applyPreset: (preset: any) => void;
  currentColors: any;
}

export default function PresetsSection({ showPresets, setShowPresets, applyPreset, currentColors }: PresetsSectionProps) {
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');

  const allPresets = useMemo(() => getColorPresets('all'), []);

  const displayedPresets = useMemo(() => {
    let filtered = allPresets;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((preset) => preset.mode === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (preset) => preset.name.toLowerCase().includes(query) || preset.description?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [allPresets, selectedCategory, searchQuery]);

  useEffect(() => {
    const matched = allPresets.find(
      (preset) =>
        preset.colors.primary === currentColors.primary &&
        preset.colors.secondary === currentColors.secondary &&
        preset.colors.accent === currentColors.accent &&
        preset.colors.bg === currentColors.bg &&
        preset.colors.text === currentColors.text
    );
    setActivePreset(matched?.name || null);
  }, [currentColors, allPresets]);

  const handleApplyPreset = (preset: any) => {
    applyPreset(preset);
    setActivePreset(preset.name);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  return (
    <motion.div
      className='rounded-xl bg-gray-50 shadow-sm dark:bg-gray-900'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.68 }}
    >
      <button onClick={() => setShowPresets(!showPresets)} className='flex w-full items-center justify-between p-5 focus:outline-none'>
        <div className='flex items-center gap-3'>
          <IconTemplate className='h-6 w-6 text-primary' />
          <h2 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>Color Presets</h2>
        </div>
        <IconChevronDown className={`transform transition-transform duration-300 ${showPresets ? 'rotate-0' : '-rotate-90'}`} />
      </button>

      <AnimatePresence>
        {showPresets && (
          <motion.div
            className='border-t border-gray-200 px-5 pb-5 dark:border-gray-700'
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SearchBar value={searchQuery} onChange={(e: any) => setSearchQuery(e.target.value)} onClear={() => setSearchQuery('')} />
            <CategoryPills
              categories={CATEGORIES}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
              count={displayedPresets.length}
            />
            <ViewToggle mode={viewMode} onModeChange={setViewMode} count={displayedPresets.length} />

            {displayedPresets.length === 0 ? (
              <EmptyState onClear={clearFilters} />
            ) : (
              <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
                {displayedPresets.map((preset, index) => (
                  <PresetCard
                    key={preset.name + index}
                    preset={preset}
                    isActive={activePreset === preset.name}
                    viewMode={viewMode}
                    index={index}
                    onClick={() => handleApplyPreset(preset)}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
