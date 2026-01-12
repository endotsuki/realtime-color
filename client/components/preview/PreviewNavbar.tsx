import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

export const PreviewNavbar = () => {
  const { state } = useTheme();
  const { navbarBrand, navbarItems, navbarCta } = state.textContent;

  return (
    <motion.nav
      className="border-b sticky top-0 h-20 duration-300 z-[1000]"
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="w-8 h-8 rounded-lg"
              style={{
                background: `linear-gradient(135deg, hsl(var(--color-primary)), hsl(var(--color-accent)))`,
              }}
            />
            <span
              className="font-bold text-lg"
              style={{ color: `hsl(var(--color-text))` }}
            >
              {navbarBrand}
            </span>
          </motion.div>

          <div className="flex items-center gap-6">
            {navbarItems.map((item) => (
              <motion.a
                key={item}
                href="#"
                className=" duration-300"
                style={{ color: `hsl(var(--color-text))` }}
                whileHover={{
                  color: `hsl(var(--color-primary))`,
                  scale: 1.05,
                }}
              >
                {item}
              </motion.a>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-lg font-medium  duration-300"
            style={{
              backgroundColor: `hsl(var(--color-primary))`,
              color: `hsl(var(--color-bg))`,
            }}
          >
            {navbarCta}
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};
