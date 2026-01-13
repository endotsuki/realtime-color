import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { PreviewArea } from '@/components/PreviewArea';
import { ControlPanel } from '@/components/ControlPanel';

function IndexPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ThemeProvider>
      <div className='flex h-screen flex-col bg-background'>
        {/* Mobile Header */}
        {isMobile && (
          <div className='flex items-center justify-between border-b border-border/30 bg-background px-4 py-3'>
            <h1 className='text-lg font-bold text-foreground'>Color Studio</h1>
            <motion.button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className='rounded-lg p-2 transition-colors hover:bg-muted'
              whileTap={{ scale: 0.95 }}
            >
              {sidebarOpen ? '✕' : '≡'}
            </motion.button>
          </div>
        )}

        {/* Main Content */}
        <div style={{ overflow: 'hidden' }} className='flex flex-1 overflow-hidden'>
          {/* Sidebar */}
          <AnimatePresence mode='wait'>
            {(!isMobile || sidebarOpen) && (
              <div className='absolute inset-0 z-40 w-full md:static md:inset-auto md:w-96'>
                <ControlPanel />
              </div>
            )}
          </AnimatePresence>

          {/* Preview */}
          {!isMobile || !sidebarOpen ? <PreviewArea /> : null}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default IndexPage;
