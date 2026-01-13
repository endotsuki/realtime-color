import { motion } from 'framer-motion';
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { IconBrightness, IconCloudDownload, IconDeviceLaptop, IconRocket, IconTestPipe, IconTextResize } from '@tabler/icons-react';

const CARD_ICONS = [IconDeviceLaptop, IconTestPipe, IconRocket, IconCloudDownload, IconTextResize, IconBrightness];

export const PreviewCard = () => {
  const { state } = useTheme();
  const { cardTitle, features } = state.textContent;

  return (
    <motion.section
      className='py-20 duration-300'
      style={{
        backgroundColor: `hsl(var(--color-bg))`,
        fontFamily: `var(--font-family)`,
        fontWeight: `var(--font-weight)`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <motion.div
          className='mb-12 text-center'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className='text-3xl font-bold duration-300 sm:text-4xl' style={{ color: `hsl(var(--color-text))` }}>
            {cardTitle}
          </h2>
        </motion.div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className='cursor-default rounded-3xl border p-6'
              style={{
                backgroundColor: `hsl(var(--color-secondary) / 0.05)`,
                borderColor: `hsl(var(--color-secondary) / 0.3)`,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              whileHover={{
                y: -4,
                boxShadow: `0 1px 90px hsl(var(--color-secondary) / 0.1)`,
              }}
            >
              <div
                className='mb-6 flex h-14 w-14 items-center justify-center rounded-2xl'
                style={{
                  backgroundColor: `hsl(var(--color-primary) / 0.15)`,
                }}
              >
                {React.createElement(CARD_ICONS[index % CARD_ICONS.length], {
                  size: 30,
                  stroke: 1.5,
                  color: `hsl(var(--color-primary))`,
                })}
              </div>
              <h3 className='mb-2 text-xl font-semibold duration-300' style={{ color: `hsl(var(--color-text))` }}>
                {feature.title}
              </h3>
              <p
                className='duration-300'
                style={{
                  color: `hsl(var(--color-text) / 0.75)`,
                }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
