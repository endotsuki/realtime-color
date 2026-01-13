import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useRef, useState, useEffect } from 'react';
import { IconUpload } from '@tabler/icons-react';
import { useToast } from '@/hooks/use-toast';

export const PreviewNavbar = () => {
  const { state } = useTheme();
  const { navbarBrand, navbarItems, navbarCta } = state.textContent;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logo, setLogo] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const savedLogo = localStorage.getItem('navbar-logo');
    if (savedLogo) setLogo(savedLogo);
  }, []);

  useEffect(() => {
    const savedLogo = localStorage.getItem('navbar-logo');
    if (!savedLogo) {
      setLogo('');
    }
  }, []);

  const uploadLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: 'File too large',
        description: `Image size must be less than 5MB. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB.`,
        variant: 'destructive',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const imageData = reader.result as string;
      setLogo(imageData);
      localStorage.setItem('navbar-logo', imageData);
      toast({
        title: 'Logo uploaded',
        description: 'Your logo has been saved successfully.',
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <motion.nav
      className='sticky top-0 z-[1000] h-20 border-b duration-300'
      style={{
        backgroundColor: `hsl(var(--color-bg)/ 0.5)`,
        backdropFilter: `saturate(180%) blur(7px)`,
        borderColor: `hsl(var(--color-primary) / 0.2)`,
        fontFamily: `var(--font-family)`,
        fontWeight: `var(--font-weight)`,
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          <motion.div className='flex items-center gap-2' transition={{ duration: 0.2 }}>
            <input ref={fileInputRef} type='file' accept='image/*' onChange={uploadLogo} className='hidden' />

            <motion.div
              onClick={() => fileInputRef.current?.click()}
              className='flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded'
              style={{
                background: logo ? 'transparent' : `linear-gradient(135deg, hsl(var(--color-primary)), hsl(var(--color-accent)))`,
              }}
              whileHover={{ scale: 1.05 }}
            >
              {logo ? (
                <img src={logo} alt='Logo' className='h-full w-full object-cover' />
              ) : (
                <IconUpload size={16} style={{ color: `hsl(var(--color-text))` }} />
              )}
            </motion.div>

            <span className='text-lg font-bold' style={{ color: `hsl(var(--color-text))` }}>
              {navbarBrand}
            </span>
          </motion.div>

          <div className='flex items-center gap-6'>
            {navbarItems.map((item) => (
              <motion.a
                key={item}
                href='#'
                className='duration-300'
                style={{ color: `hsl(var(--color-text))` }}
                whileHover={{ color: `hsl(var(--color-primary))`, scale: 1.05 }}
              >
                {item}
              </motion.a>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='rounded-lg px-4 py-2 font-medium duration-300'
            style={{
              backgroundColor: `hsl(var(--color-primary))`,
              color: `hsl(var(--color-text))`,
            }}
          >
            {navbarCta}
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};
