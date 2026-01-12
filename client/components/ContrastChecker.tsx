import React, { useMemo } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { getContrastRatio, hasGoodContrast } from "@/utils/colorUtils";
import {
  IconCheck,
  IconContrast2Filled,
  IconInfoCircleFilled,
} from "@tabler/icons-react";

const contrastItems = (colors: any) => [
  { name: "Text on Background", c1: colors.text, c2: colors.bg },
  { name: "Primary Button Text", c1: "hsl(0 0% 100%)", c2: colors.primary },
  { name: "Primary on Background", c1: colors.primary, c2: colors.bg },
  { name: "Accent on Background", c1: colors.accent, c2: colors.bg },
];

export const ContrastChecker: React.FC = () => {
  const { state } = useTheme();

  const results = useMemo(
    () =>
      contrastItems(state.colors).map(({ name, c1, c2 }) => {
        const contrast = getContrastRatio(c1, c2);
        const passes = hasGoodContrast(c1, c2);
        return {
          name,
          c1,
          c2,
          contrast: contrast.toFixed(2),
          passes,
          level: contrast >= 7 ? "AAA" : contrast >= 4.5 ? "AA" : "Fail",
        };
      }),
    [state.colors],
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5 space-y-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2">
        <IconContrast2Filled className="w-5 h-5 text-primary-500" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Contrast Checker
        </h2>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        WCAG contrast ratios for your color scheme
      </p>

      {/* Results */}
      <div className="space-y-3">
        {results.map(({ name, c1, c2, contrast, passes, level }, idx) => (
          <div
            key={idx}
            className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Ratio: {contrast}:1
                </p>
              </div>
              <div
                className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${
                  passes
                    ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                    : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                }`}
              >
                {passes ? (
                  <>
                    <IconCheck size={12} /> {level}
                  </>
                ) : (
                  <>
                    <IconInfoCircleFilled size={12} /> FAIL
                  </>
                )}
              </div>
            </div>

            {/* Sample */}
            <div
              className="mt-2 h-8 rounded flex items-center justify-center font-bold text-xs"
              style={{
                backgroundColor: `hsl(${c2})`,
                color: `hsl(${c1})`,
                border: `1px solid hsl(${c1})`,
              }}
            >
              Sample
            </div>
          </div>
        ))}
      </div>

      {/* WCAG info */}
      <div className="text-xs text-gray-500 dark:text-gray-400 p-3 rounded border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30">
        <p className="font-semibold mb-1">💡 WCAG Standards:</p>
        <ul className="space-y-1">
          <li>
            • <strong>AA:</strong> 4.5:1 ratio (standard)
          </li>
          <li>
            • <strong>AAA:</strong> 7:1 ratio (enhanced)
          </li>
        </ul>
      </div>
    </div>
  );
};
