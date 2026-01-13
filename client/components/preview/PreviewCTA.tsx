import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

export const PreviewCTA = () => {
  const { state } = useTheme();

  return (
    <motion.section
      className='py-20 backdrop-blur-lg duration-300'
      style={{
        background: `linear-gradient(135deg, hsl(var(--color-primary)/0.5), hsl(var(--color-secondary)/0.5))`,
        fontFamily: `var(--font-family)`,
        fontWeight: `var(--font-weight)`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.55 }}
    >
      <div className='mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8'>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
          <h2
            className='mb-6 text-4xl font-bold duration-300 sm:text-5xl'
            style={{
              color: `hsl(var(--color-text))`,
            }}
          >
            Ready to Get Started?
          </h2>

          <p
            className='mb-8 text-lg duration-300'
            style={{
              color: `hsl(var(--color-text) / 0.9)`,
            }}
          >
            Join thousands of designers and developers creating beautiful color systems every day. Start your free trial today—no credit
            card required.
          </p>

          <div className='flex flex-col justify-center gap-4 sm:flex-row'>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className='flex h-14 items-center justify-center rounded-lg px-10 text-lg font-medium leading-none'
              style={{
                backgroundColor: `hsl(var(--color-bg))`,
                color: `hsl(var(--color-text))`,
              }}
            >
              Start Free Trial
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              className='flex h-14 items-center justify-center rounded-lg border px-10 text-lg font-medium leading-none'
              style={{
                borderColor: `hsl(var(--color-bg))`,
                color: `hsl(var(--color-bg))`,
                backgroundColor: 'transparent',
              }}
            >
              Schedule Demo
            </motion.button>
          </div>

          <p
            className='mt-6 text-base duration-300'
            style={{
              color: `hsl(var(--color-text) / 0.7)`,
            }}
          >
            14-day free trial. No credit card. Cancel anytime.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};
