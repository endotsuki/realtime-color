import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

export const PreviewFooter = () => {
  const { state } = useTheme();
  const { footerCategories, footerCopyright } = state.textContent;

  return (
    <motion.footer
      className="border-t  duration-300"
      style={{
        backgroundColor: `hsl(var(--color-bg))`,
        borderColor: `hsl(var(--color-primary) / 0.2)`,
        fontFamily: `var(--font-family)`,
        fontWeight: `var(--font-weight)`,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {footerCategories.map((category) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h4
                className="font-semibold mb-4  duration-300"
                style={{ color: `hsl(var(--color-text))` }}
              >
                {category.name}
              </h4>
              <ul className="space-y-2">
                {category.links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      className=" duration-300"
                      style={{
                        color: `hsl(var(--color-text) / 0.75)`,
                      }}
                      whileHover={{
                        color: `hsl(var(--color-primary))`,
                      }}
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div
          className="border-t pt-8 text-center  duration-300"
          style={{
            borderColor: `hsl(var(--color-primary) / 0.2)`,
            color: `hsl(var(--color-text) / 0.6)`,
          }}
        >
          <p>{footerCopyright}</p>
        </div>
      </div>
    </motion.footer>
  );
};
