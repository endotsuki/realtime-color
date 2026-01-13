import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const STAT_ITEMS = [
  { label: 'Active Users', value: '50K+' },
  { label: 'Projects Created', value: '120K' },
  { label: 'Team Members', value: '800+' },
  { label: 'Uptime', value: '99.9%' },
];

export const PreviewStats = () => {
  const { state } = useTheme();

  return (
    <motion.section
      className='py-16 duration-300'
      style={{
        backgroundColor: `hsl(var(--color-secondary) / 0.08)`,
        fontFamily: `var(--font-family)`,
        fontWeight: `var(--font-weight)`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-2 gap-8 md:grid-cols-4'>
          {STAT_ITEMS.map((stat, index) => (
            <motion.div
              key={stat.label}
              className='text-center'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
            >
              <motion.div
                className='mb-2 text-3xl font-bold duration-300 sm:text-4xl'
                style={{
                  background: `linear-gradient(135deg, hsl(var(--color-primary)), hsl(var(--color-secondary)))`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
                whileHover={{ scale: 1.1 }}
              >
                {stat.value}
              </motion.div>
              <p
                className='text-sm duration-300'
                style={{
                  color: `hsl(var(--color-text) / 0.7)`,
                }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
