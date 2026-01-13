import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { PreviewArea } from "@/components/PreviewArea";
import { ControlPanel } from "@/components/ControlPanel";

function IndexPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ThemeProvider>
      <div className="h-screen flex flex-col bg-background">
        {/* Mobile Header */}
        {isMobile && (
          <div className="bg-background border-b border-border/30 px-4 py-3 flex items-center justify-between">
            <h1 className="font-bold text-foreground text-lg">Color Studio</h1>
            <motion.button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              {sidebarOpen ? "✕" : "≡"}
            </motion.button>
          </div>
        )}

        {/* Main Content */}
        <div
          style={{ overflow: "hidden" }}
          className="flex-1 flex overflow-hidden"
        >
          {/* Sidebar */}
          <AnimatePresence mode="wait">
            {(!isMobile || sidebarOpen) && (
              <div className="w-full md:w-96 md:static absolute inset-0 md:inset-auto z-40">
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
