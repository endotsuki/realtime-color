import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

export const PreviewHero = () => {
  const { state } = useTheme();
  const { heroTitle, heroDescription, getStartedBtn, learnMoreBtn } = state.textContent;

  return (
    <motion.section
      className='py-20 duration-300 lg:py-32'
      style={{
        backgroundColor: `hsl(var(--color-bg))`,
        fontFamily: `var(--font-family)`,
        fontWeight: `var(--font-weight)`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='space-y-8 text-center'>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <h1
              className='text-4xl font-bold leading-tight duration-300 sm:text-5xl lg:text-6xl'
              style={{ color: `hsl(var(--color-text))` }}
            >
              <span
                className='bg-clip-text text-transparent duration-300'
                style={{
                  backgroundImage: `linear-gradient(135deg, hsl(var(--color-primary)), hsl(var(--color-secondary)))`,
                }}
              >
                {heroTitle}
              </span>
            </h1>
          </motion.div>

          <motion.p
            className='mx-auto max-w-2xl text-lg duration-300 sm:text-xl'
            style={{
              color: `hsl(var(--color-text) / 0.8)`,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {heroDescription}
          </motion.p>

          <motion.div
            className='flex flex-col justify-center gap-4 sm:flex-row'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className='rounded-lg px-8 py-3 font-semibold duration-300'
              style={{
                backgroundColor: `hsl(var(--color-primary))`,
                color: `hsl(var(--color-bg))`,
              }}
            >
              {getStartedBtn}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className='rounded-lg border px-8 py-3 font-semibold duration-300'
              style={{
                borderColor: `hsl(var(--color-secondary))`,
                color: `hsl(var(--color-secondary))`,
                backgroundColor: `hsl(var(--color-bg))`,
              }}
            >
              {learnMoreBtn}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
