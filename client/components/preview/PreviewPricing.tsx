import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

const PRICING_PLANS = [
  {
    name: "Open Source",
    price: "Free",
    description: "For everyone, forever",
    features: [
      "Unlimited Projects",
      "All Color Features",
      "Live Preview",
      "Accessibility Checker",
      "Full Export Options",
      "Open Source Code",
    ],
    highlighted: true,
  },
  {
    name: "Self-Hosted",
    price: "Free",
    description: "Run on your own infrastructure",
    features: [
      "Docker Support",
      "Full Control",
      "No Data Sharing",
      "Custom Branding",
      "Team Collaboration",
      "API Access",
    ],
    highlighted: false,
  },
  {
    name: "Community",
    price: "Free",
    description: "Built by and for designers",
    features: [
      "Community Support",
      "Regular Updates",
      "Contribute Features",
      "Vote on Roadmap",
      "Use Any License",
      "Zero Restrictions",
    ],
    highlighted: false,
  },
];

export const PreviewPricing = () => {
  const { state } = useTheme();

  return (
    <motion.section
      className="py-20  duration-300"
      style={{
        backgroundColor: `hsl(var(--color-primary) / 0.05)`,
        fontFamily: `var(--font-family)`,
        fontWeight: `var(--font-weight)`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4  duration-300"
            style={{ color: `hsl(var(--color-text))` }}
          >
            Free & Open Source
          </h2>
          <p
            className="text-lg  duration-300"
            style={{
              color: `hsl(var(--color-text) / 0.7)`,
            }}
          >
            All features available to everyone, forever
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRICING_PLANS.map((plan, index) => (
            <motion.div
              key={plan.name}
              className="rounded-lg overflow-hidden cursor-pointer"
              style={{
                backgroundColor: plan.highlighted
                  ? `hsl(var(--color-primary) / 0.1)`
                  : `hsl(var(--color-bg))`,
                border: plan.highlighted
                  ? `2px solid hsl(var(--color-primary))`
                  : `1px solid hsl(var(--color-text) / 0.2)`,
              }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -8,
                boxShadow: `0 20px 40px hsl(var(--color-primary) / 0.15)`,
              }}
            >
              {plan.highlighted && (
                <div
                  className="px-4 py-2 text-center text-sm font-bold  duration-300"
                  style={{
                    backgroundColor: `hsl(var(--color-primary))`,
                    color: `hsl(var(--color-bg))`,
                  }}
                >
                  POPULAR
                </div>
              )}

              <div className="p-8">
                <h3
                  className="text-2xl font-bold mb-2  duration-300"
                  style={{ color: `hsl(var(--color-text))` }}
                >
                  {plan.name}
                </h3>
                <p
                  className="text-sm mb-4  duration-300"
                  style={{
                    color: `hsl(var(--color-text) / 0.6)`,
                  }}
                >
                  {plan.description}
                </p>

                <div
                  className="text-4xl font-bold mb-6  duration-300"
                  style={{
                    color: `hsl(var(--color-primary))`,
                  }}
                >
                  {plan.price}
                  {plan.price !== "Custom" && (
                    <span
                      className="text-sm font-normal  duration-300"
                      style={{
                        color: `hsl(var(--color-text) / 0.6)`,
                      }}
                    >
                      /month
                    </span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 rounded-lg font-semibold  duration-300 mb-8"
                  style={{
                    backgroundColor: plan.highlighted
                      ? `hsl(var(--color-primary))`
                      : `hsl(var(--color-primary) / 0.1)`,
                    color: plan.highlighted
                      ? `hsl(var(--color-bg))`
                      : `hsl(var(--color-primary))`,
                  }}
                >
                  {plan.name === "Open Source" ? "Start Now" : "Learn More"}
                </motion.button>

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-sm  duration-300"
                      style={{
                        color: `hsl(var(--color-text) / 0.8)`,
                      }}
                    >
                      <span className="text-lg">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
