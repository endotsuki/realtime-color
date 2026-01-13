import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { PreviewNavbar } from "@/components/preview/PreviewNavbar";
import { PreviewHero } from "@/components/preview/PreviewHero";
import { PreviewStats } from "@/components/preview/PreviewStats";
import { PreviewCard } from "@/components/preview/PreviewCard";
import { PreviewPricing } from "@/components/preview/PreviewPricing";
import { PreviewTestimonials } from "@/components/preview/PreviewTestimonials";
import { PreviewCTA } from "@/components/preview/PreviewCTA";
import { PreviewFooter } from "@/components/preview/PreviewFooter";

export const PreviewArea = () => {
  const { state } = useTheme();

  return (
    <motion.div
      className="flex-1 overflow-y-auto bg-background transition-colors duration-300 scrollbar-custom"
      style={{ backgroundColor: `hsl(var(--color-bg))` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <PreviewNavbar />
      <PreviewHero />
      <PreviewStats />
      <PreviewCard />
      <PreviewPricing />
      <PreviewTestimonials />
      <PreviewCTA />
      <PreviewFooter />
    </motion.div>
  );
};
