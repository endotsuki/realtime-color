import React, { useMemo } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { getContrastRatio, hasGoodContrast, hslToHex } from '@/utils/colorUtils';
import { Check, AlertCircle } from 'lucide-react';

export const ContrastChecker: React.FC = () => {
  const { state } = useTheme();

  const contrastResults = useMemo(() => {
    const results = [
      {
        name: 'Text on Background',
        color1: state.colors.text,
        color2: state.colors.bg,
      },
      {
        name: 'Primary Button Text',
        color1: 'hsl(0 0% 100%)', // White text
        color2: state.colors.primary,
      },
      {
        name: 'Primary on Background',
        color1: state.colors.primary,
        color2: state.colors.bg,
      },
      {
        name: 'Accent on Background',
        color1: state.colors.accent,
        color2: state.colors.bg,
      },
    ];

    return results.map((item) => {
      const contrast = getContrastRatio(item.color1, item.color2);
      const passes = hasGoodContrast(item.color1, item.color2);
      const level = contrast >= 7 ? 'AAA' : contrast >= 4.5 ? 'AA' : 'Fail';

      return {
        ...item,
        contrast: contrast.toFixed(2),
        passes,
        level,
      };
    });
  }, [state.colors]);

  return (
    <div className="bg-muted/40 rounded-lg p-4 space-y-3">
      <div>
        <h2 className="font-semibold text-foreground text-xs uppercase tracking-widest mb-2">
          ♿ Accessibility
        </h2>
        <p className="text-xs text-muted-foreground mb-3">
          WCAG contrast ratios for your color scheme
        </p>
      </div>

      <div className="space-y-2">
        {contrastResults.map((result, idx) => (
          <div
            key={idx}
            className="p-2 bg-background rounded border border-border/50 space-y-1"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs font-medium text-foreground">{result.name}</p>
                <p className="text-xs text-muted-foreground">
                  Ratio: {result.contrast}:1
                </p>
              </div>
              <div
                className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${
                  result.passes
                    ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300'
                    : 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                }`}
              >
                {result.passes ? (
                  <>
                    <Check size={12} />
                    {result.level}
                  </>
                ) : (
                  <>
                    <AlertCircle size={12} />
                    FAIL
                  </>
                )}
              </div>
            </div>

            <div className="flex gap-2 h-6">
              <div
                className="flex-1 rounded"
                style={{
                  backgroundColor: `hsl(${result.color2})`,
                  border: `1px solid hsl(${result.color1})`,
                }}
              >
                <div
                  className="w-full h-full flex items-center justify-center text-xs font-bold text-center px-1"
                  style={{
                    color: `hsl(${result.color1})`,
                  }}
                >
                  Sample
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-xs text-muted-foreground p-2 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-900">
        <p className="font-semibold mb-1">💡 WCAG Standards:</p>
        <ul className="space-y-1 text-xs">
          <li>• <strong>AA:</strong> 4.5:1 ratio (standard)</li>
          <li>• <strong>AAA:</strong> 7:1 ratio (enhanced)</li>
        </ul>
      </div>
    </div>
  );
};
