import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import {
  IconBrightness,
  IconCloudDownload,
  IconDeviceLaptop,
  IconRocket,
  IconTestPipe,
  IconTextResize,
} from "@tabler/icons-react";

const CARD_ICONS = [
  <IconDeviceLaptop size={40} stroke={1.5} />,
  <IconTestPipe size={40} stroke={1.5} />,
  <IconRocket size={40} stroke={1.5} />,
  <IconCloudDownload size={40} stroke={1.5} />,
  <IconTextResize size={40} stroke={1.5} />,
  <IconBrightness size={40} stroke={1.5} />,
];

export const PreviewCard = () => {
  const { state } = useTheme();
  const { cardTitle, features } = state.textContent;

  return (
    <motion.section
      className="py-20 duration-300"
      style={{
        backgroundColor: `hsl(var(--color-bg))`,
        fontFamily: `var(--font-family)`,
        fontWeight: `var(--font-weight)`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2
            className="text-3xl sm:text-4xl font-bold  duration-300"
            style={{ color: `hsl(var(--color-text))` }}
          >
            {cardTitle}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="p-6 rounded-lg border-2  duration-300"
              style={{
                backgroundColor: `hsl(var(--color-primary) / 0.05)`,
                borderColor: `hsl(var(--color-primary) / 0.3)`,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              whileHover={{
                y: -4,
                boxShadow: `0 20px 40px hsl(var(--color-primary) / 0.2)`,
              }}
            >
              {CARD_ICONS[index % CARD_ICONS.length]}
              <h3
                className="text-xl font-semibold mb-2  duration-300"
                style={{ color: `hsl(var(--color-text))` }}
              >
                {feature.title}
              </h3>
              <p
                className=" duration-300"
                style={{
                  color: `hsl(var(--color-text) / 0.75)`,
                }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
