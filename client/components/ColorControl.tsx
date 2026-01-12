import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  hslToHex,
  hexToHsl,
  validateHexColor,
  formatHex,
} from "@/utils/colorUtils";
import { ColorPicker } from "./ui/color";

interface ColorControlProps {
  label: string;
  value: string; // HSL string
  onChange: (value: string) => void;
}

export const ColorControl = ({ label, value, onChange }: ColorControlProps) => {
  const hex = hslToHex(value);
  const [hexInput, setHexInput] = useState(hex);

  const handleColorPickerChange = useCallback(
    (newHex: string) => {
      setHexInput(newHex);
      onChange(hexToHsl(newHex));
    },
    [onChange],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="rounded-xl bg-background/60 p-3 ring-1 ring-border/50 backdrop-blur"
    >
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>

        <span className="text-xs font-mono text-muted-foreground">{hex}</span>
      </div>

      {/* Picker Row */}
      <div className="flex items-center gap-3">
        <ColorPicker
          color={hex}
          onChange={handleColorPickerChange}
          label=""
          className="shrink-0"
        />

        <div className="flex-1 rounded-md bg-muted px-3 py-2 text-xs font-mono text-muted-foreground">
          {value}
        </div>
      </div>
    </motion.div>
  );
};
