import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { IconCheck, IconCircleCheckFilled } from '@tabler/icons-react';

const PRICING_PLANS = [
  {
    name: 'Open Source',
    price: 'Free',
    description: 'For everyone, forever',
    features: [
      'Unlimited Projects',
      'All Color Features',
      'Live Preview',
      'Accessibility Checker',
      'Full Export Options',
      'Open Source Code',
    ],
    highlighted: true,
  },
  {
    name: 'Self-Hosted',
    price: '$49',
    description: 'Run on your own infrastructure',
    features: ['Docker Support', 'Full Control', 'No Data Sharing', 'Custom Branding', 'Team Collaboration', 'API Access'],
    highlighted: false,
  },
  {
    name: 'Community',
    price: '$99',
    description: 'Built by and for designers',
    features: ['Community Support', 'Regular Updates', 'Contribute Features', 'Vote on Roadmap', 'Use Any License', 'Zero Restrictions'],
    highlighted: false,
  },
];

export const PreviewPricing = () => {
  const { state } = useTheme();
  const [selectedPlan, setSelectedPlan] = useState<string>('Open Source');

  return (
    <motion.section
      className='py-24 duration-300'
      style={{
        backgroundColor: `hsl(var(--color-bg))`,
        fontFamily: `var(--font-family)`,
        fontWeight: `var(--font-weight)`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <motion.div
          className='mb-16 text-center'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          <h2 className='mb-4 text-3xl font-bold duration-300 sm:text-4xl' style={{ color: `hsl(var(--color-text))` }}>
            Pricing Plans
          </h2>
          <p
            className='text-xl duration-300'
            style={{
              color: `hsl(var(--color-text) / 0.65)`,
            }}
          >
            Everything you need, completely free and open source
          </p>
        </motion.div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          {PRICING_PLANS.map((plan, index) => (
            <motion.div
              key={plan.name}
              layoutId={selectedPlan === plan.name ? 'selectedCard' : undefined}
              className='group relative cursor-pointer overflow-hidden rounded-2xl'
              onClick={() => setSelectedPlan(plan.name)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                backgroundColor: selectedPlan === plan.name ? `hsl(var(--color-primary) / 0.08)` : `hsl(var(--color-bg))`,
                border: selectedPlan === plan.name ? `2px solid hsl(var(--color-primary)/0.5)` : `1px solid hsl(var(--color-text) / 0.12)`,
              }}
            >
              {/* Background gradient overlay */}
              <div
                className='absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100'
                style={{
                  background: `radial-gradient(circle at top right, hsl(var(--color-primary) / 0.1), transparent)`,
                }}
              />

              {/* Selected indicator bar */}
              {selectedPlan === plan.name && (
                <div
                  className='px-8 py-3 text-center font-semibold duration-300'
                  style={{
                    backgroundColor: `hsl(var(--color-primary)/0.5)`,
                    color: `hsl(var(--color-text))`,
                  }}
                >
                  <IconCheck size={16} strokeWidth={2} className='mr-2 inline-block' />
                  Your Choice
                </div>
              )}

              <div className='relative z-10 flex h-full flex-col p-8'>
                {/* Header */}
                <div className='mb-8'>
                  <h3 className='mb-3 text-2xl font-bold duration-300' style={{ color: `hsl(var(--color-text))` }}>
                    {plan.name}
                  </h3>
                  <p
                    className='text-sm duration-300'
                    style={{
                      color: `hsl(var(--color-text) / 0.6)`,
                    }}
                  >
                    {plan.description}
                  </p>
                </div>

                {/* Pricing */}
                <div className='mb-8'>
                  <motion.div
                    className='text-5xl font-bold duration-300'
                    style={{
                      color: `hsl(var(--color-primary))`,
                    }}
                  >
                    {plan.price}
                  </motion.div>
                  <p
                    className='mt-2 text-sm duration-300'
                    style={{
                      color: `hsl(var(--color-text) / 0.6)`,
                    }}
                  >
                    {plan.price !== 'Custom' ? 'Forever free' : 'Contact us'}
                  </p>
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className='mb-8 w-full rounded-lg py-3 font-semibold transition-all duration-300'
                  style={{
                    backgroundColor: selectedPlan === plan.name ? `hsl(var(--color-primary))` : `hsl(var(--color-primary) / 0.08)`,
                    color: selectedPlan === plan.name ? `hsl(var(--color-text))` : `hsl(var(--color-primary))`,
                  }}
                >
                  {selectedPlan === plan.name ? 'Selected' : 'Choose Plan'}
                </motion.button>

                {/* Features */}
                <ul className='flex-1 space-y-3'>
                  {plan.features.map((feature, idx) => (
                    <motion.li
                      key={feature}
                      className='flex items-end gap-3 text-sm duration-300'
                      style={{
                        color: `hsl(var(--color-text) / 0.8)`,
                      }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: idx * 0.05 }}
                    >
                      <motion.div
                        className='mt-0.5 flex-shrink-0'
                        style={{
                          color: `hsl(var(--color-primary))`,
                        }}
                      >
                        <IconCircleCheckFilled size={20} strokeWidth={2.5} />
                      </motion.div>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Bottom accent */}
              <div
                className='absolute bottom-0 left-0 right-0 h-px'
                style={{
                  background: `linear-gradient(90deg, transparent, hsl(var(--color-primary) / 0.3), transparent)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
