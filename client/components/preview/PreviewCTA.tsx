import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

export const PreviewCTA = () => {
  const { state } = useTheme();

  return (
    <motion.section
      className="py-20  duration-300"
      style={{
        background: `linear-gradient(135deg, hsl(var(--color-primary)), hsl(var(--color-secondary)))`,
        fontFamily: `var(--font-family)`,
        fontWeight: `var(--font-weight)`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.55 }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2
            className="text-4xl sm:text-5xl font-bold mb-6  duration-300"
            style={{
              color: `hsl(var(--color-bg))`,
            }}
          >
            Ready to Get Started?
          </h2>

          <p
            className="text-lg mb-8  duration-300"
            style={{
              color: `hsl(var(--color-bg) / 0.9)`,
            }}
          >
            Join thousands of designers and developers creating beautiful color
            systems every day. Start your free trial today—no credit card
            required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-lg font-bold text-lg  duration-300"
              style={{
                backgroundColor: `hsl(var(--color-bg))`,
                color: `hsl(var(--color-primary))`,
              }}
            >
              Start Free Trial
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-lg font-bold text-lg  duration-300 border-2"
              style={{
                borderColor: `hsl(var(--color-bg))`,
                color: `hsl(var(--color-bg))`,
                backgroundColor: "transparent",
              }}
            >
              Schedule Demo
            </motion.button>
          </div>

          <p
            className="text-sm mt-6  duration-300"
            style={{
              color: `hsl(var(--color-bg) / 0.7)`,
            }}
          >
            14-day free trial. No credit card. Cancel anytime.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};
