import { motion } from 'framer-motion';

interface TextEditorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  multiline?: boolean;
  rows?: number;
}

export const TextEditor = ({
  label,
  value,
  onChange,
  placeholder = '',
  maxLength = 100,
  multiline = false,
  rows = 3,
}: TextEditorProps) => {
  const charCount = value.length;

  return (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <span className="text-xs text-muted-foreground">
          {charCount}/{maxLength}
        </span>
      </div>

      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => {
            const newValue = e.target.value.slice(0, maxLength);
            onChange(newValue);
          }}
          placeholder={placeholder}
          rows={rows}
          className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-colors resize-none"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => {
            const newValue = e.target.value.slice(0, maxLength);
            onChange(newValue);
          }}
          placeholder={placeholder}
          maxLength={maxLength}
          className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
        />
      )}
    </motion.div>
  );
};
