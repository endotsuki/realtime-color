import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { IconStarFilled } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { Marquee } from '@/components/ui/marquee';

const TESTIMONIALS = [
  {
    text: 'This tool transformed how we design our color systems. Absolutely game-changing!',
    author: 'Adriana Sullivan',
    role: 'Design Lead',
    avatar: 'https://www.untitledui.com/images/avatars/adriana-sullivan?',
  },
  {
    text: 'Real-time preview is incredible. We saved hours on color iteration.',
    author: 'Adem Lane',
    role: 'Product Manager',
    avatar: 'https://www.untitledui.com/images/avatars/adem-lane?',
  },
  {
    text: 'The export functionality alone is worth it. CSS and Tailwind configs in seconds.',
    author: 'Ammar Foley',
    role: 'Frontend Developer',
    avatar: 'https://www.untitledui.com/images/avatars/ammar-foley?',
  },
  {
    text: 'Best color design tool I have ever used. Highly recommend!',
    author: 'Amanda Lowery',
    role: 'UX Designer',
    avatar: 'https://www.untitledui.com/images/avatars/amanda-lowery?',
  },
  {
    text: 'Incredible workflow improvements. This tool is a must-have.',
    author: 'Ashwin Santiago',
    role: 'Design Director',
    avatar: 'https://www.untitledui.com/images/avatars/ashwin-santiago?',
  },
  {
    text: 'The accessibility checker is a game-changer for inclusive design.',
    author: 'Brianna Ware',
    role: 'Accessibility Lead',
    avatar: 'https://www.untitledui.com/images/avatars/brianna-ware?',
  },
  {
    text: 'Our team collaboration has improved drastically since we started using this tool.',
    author: 'Eduard Franz',
    role: 'Team Lead',
    avatar: 'https://www.untitledui.com/images/avatars/eduard-franz?',
  },
  {
    text: 'The intuitive interface makes color design enjoyable and efficient.',
    author: 'Fergus Gray',
    role: 'UI Designer',
    avatar: 'https://www.untitledui.com/images/avatars/fergus-gray?',
  },
];

const TestimonialCard = ({ text, author, role, avatar }: (typeof TESTIMONIALS)[0]) => {
  const { state } = useTheme();

  return (
    <figure
      className={cn('relative h-full w-80 cursor-pointer overflow-hidden rounded-2xl border p-6 transition-all duration-300')}
      style={{
        backgroundColor: `hsl(var(--color-bg))`,
        borderColor: `hsl(var(--color-primary) / 0.2)`,
      }}
    >
      <div className='mb-4 flex items-center gap-3'>
        <img src={avatar} alt={author} className='h-12 w-12 rounded-full object-cover' />
        <div>
          <p className='font-semibold duration-300' style={{ color: `hsl(var(--color-text))` }}>
            {author}
          </p>
          <p className='text-sm duration-300' style={{ color: `hsl(var(--color-text) / 0.6)` }}>
            {role}
          </p>
        </div>
      </div>
      <blockquote className='mb-4 text-sm italic duration-300' style={{ color: `hsl(var(--color-text) / 0.8)` }}>
        "{text}"
      </blockquote>
      <div className='flex items-center gap-1'>
        {[...Array(5)].map((_, i) => (
          <IconStarFilled key={i} size={16} className='text-yellow-500' />
        ))}
      </div>
    </figure>
  );
};

export const PreviewTestimonials = () => {
  const { state } = useTheme();
  const secondRow = TESTIMONIALS.slice(TESTIMONIALS.length / 2);

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
      transition={{ duration: 0.6, delay: 0.45 }}
    >
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <motion.div
          className='mb-16 text-center'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2 className='text-3xl font-bold duration-300 sm:text-4xl' style={{ color: `hsl(var(--color-text))` }}>
            What Users Say
          </h2>
          <p className='mt-3 text-lg duration-300' style={{ color: `hsl(var(--color-text) / 0.65)` }}>
            Join thousands of designers who love our tool
          </p>
        </motion.div>

        {/* Marquee Container */}
        <div className='relative flex w-full flex-col items-center justify-center overflow-hidden'>
          <Marquee reverse className='[--duration:30s]'>
            {secondRow.map((testimonial, index) => (
              <TestimonialCard key={`second-${index}`} {...testimonial} />
            ))}
          </Marquee>

          {/* Gradient Overlays */}
          <div
            className='pointer-events-none absolute inset-y-0 left-0 w-1/4'
            style={{
              background: `linear-gradient(90deg, hsl(var(--color-bg)), transparent)`,
            }}
          />
          <div
            className='pointer-events-none absolute inset-y-0 right-0 w-1/4'
            style={{
              background: `linear-gradient(270deg, hsl(var(--color-bg)), transparent)`,
            }}
          />
        </div>
      </div>
    </motion.section>
  );
};
