import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

export const PreviewHero = () => {
  const { state } = useTheme();
  const { heroTitle, heroDescription, getStartedBtn, learnMoreBtn } =
    state.textContent;

  return (
    <motion.section
      className="py-20 lg:py-32  duration-300"
      style={{
        backgroundColor: `hsl(var(--color-bg))`,
        fontFamily: `var(--font-family)`,
        fontWeight: `var(--font-weight)`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight  duration-300"
              style={{ color: `hsl(var(--color-text))` }}
            >
              <span
                className="bg-clip-text text-transparent  duration-300"
                style={{
                  backgroundImage: `linear-gradient(135deg, hsl(var(--color-primary)), hsl(var(--color-secondary)))`,
                }}
              >
                {heroTitle}
              </span>
            </h1>
          </motion.div>

          <motion.p
            className="text-lg sm:text-xl max-w-2xl mx-auto  duration-300"
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
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-lg font-semibold  duration-300"
              style={{
                backgroundColor: `hsl(var(--color-primary))`,
                color: `hsl(var(--color-bg))`,
              }}
            >
              {getStartedBtn}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-lg font-semibold  duration-300 border-2"
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
