import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

const TESTIMONIALS = [
  {
    text: "This tool transformed how we design our color systems. Absolutely game-changing!",
    author: "Sarah Johnson",
    role: "Design Lead",
    avatar: "👩‍💼",
  },
  {
    text: "Real-time preview is incredible. We saved hours on color iteration.",
    author: "Mike Chen",
    role: "Product Manager",
    avatar: "👨‍💼",
  },
  {
    text: "The export functionality alone is worth it. CSS and Tailwind configs in seconds.",
    author: "Alex Rivera",
    role: "Frontend Developer",
    avatar: "👨‍💻",
  },
];

export const PreviewTestimonials = () => {
  const { state } = useTheme();

  return (
    <motion.section
      className="py-20  duration-300"
      style={{
        backgroundColor: `hsl(var(--color-bg))`,
        fontFamily: `var(--font-family)`,
        fontWeight: `var(--font-weight)`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.45 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2
            className="text-3xl sm:text-4xl font-bold  duration-300"
            style={{ color: `hsl(var(--color-text))` }}
          >
            What Users Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              className="p-6 rounded-lg border  duration-300"
              style={{
                backgroundColor: `hsl(var(--color-bg))`,
                borderColor: `hsl(var(--color-secondary) / 0.5)`,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 + index * 0.1 }}
              whileHover={{
                borderColor: `hsl(var(--color-secondary))`,
                y: -4,
              }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl">{testimonial.avatar}</div>
                <div>
                  <p
                    className="font-semibold  duration-300"
                    style={{ color: `hsl(var(--color-text))` }}
                  >
                    {testimonial.author}
                  </p>
                  <p
                    className="text-sm  duration-300"
                    style={{
                      color: `hsl(var(--color-text) / 0.6)`,
                    }}
                  >
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <p
                className="italic  duration-300"
                style={{
                  color: `hsl(var(--color-text) / 0.8)`,
                }}
              >
                "{testimonial.text}"
              </p>
              <div className="flex gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-lg">
                    ⭐
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
