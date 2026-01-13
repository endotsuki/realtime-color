'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { IconCheck } from '@tabler/icons-react';

interface ModernCheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
}

export const ModernCheckbox = ({ checked = false, onChange, label }: ModernCheckboxProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  const toggle = () => {
    setIsChecked(!isChecked);
    onChange?.(!isChecked);
  };

  return (
    <button type='button' onClick={toggle} className='flex items-center gap-2 focus:outline-none'>
      {/* Checkbox */}
      <div
        className={`relative flex h-5 w-5 items-center justify-center rounded border-2 transition-all duration-200 ${isChecked ? 'border-primary bg-primary' : 'border-border bg-background'} `}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: isChecked ? 1 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className='absolute text-background'
        >
          <IconCheck size={16} stroke={3} />
        </motion.div>
      </div>

      {/* Label */}
      {label && <span className='select-none text-sm text-foreground'>{label}</span>}
    </button>
  );
};
