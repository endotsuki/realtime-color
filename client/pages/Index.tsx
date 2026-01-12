import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ThemeProvider,
  useTheme,
  FONT_FAMILIES,
  COLOR_PRESETS,
} from "@/contexts/ThemeContext";
import { ColorControl } from "@/components/ColorControl";
import { FontUpload } from "@/components/FontUpload";
import { TextEditor } from "@/components/TextEditor";
import { ContrastChecker } from "@/components/ContrastChecker";
import { PreviewNavbar } from "@/components/preview/PreviewNavbar";
import { PreviewHero } from "@/components/preview/PreviewHero";
import { PreviewCard } from "@/components/preview/PreviewCard";
import { PreviewStats } from "@/components/preview/PreviewStats";
import { PreviewTestimonials } from "@/components/preview/PreviewTestimonials";
import { PreviewPricing } from "@/components/preview/PreviewPricing";
import { PreviewCTA } from "@/components/preview/PreviewCTA";
import { PreviewFooter } from "@/components/preview/PreviewFooter";
import {
  copyToClipboard,
  generateCSSVariables,
  generateTailwindConfig,
} from "@/utils/colorUtils";
import { Combobox } from "@/components/ui/combobox";
import {
  IconArrowsRandom,
  IconCheck,
  IconChevronDown,
  IconColorFilter,
  IconDownload,
  IconFileDescription,
  IconPaletteFilled,
  IconRainbow,
  IconRepeat,
  IconRotateClockwise,
  IconTextResize,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

const ControlPanel = () => {
  const {
    state,
    updateColor,
    toggleDarkMode,
    toggleRounded,
    setFontFamily,
    setFontWeight,
    setCustomFont,
    updateTextContent,
    generateRandomPalette,
    resetPalette,
    resetTextContent,
    resetAllToDefaults,
    applyPreset,
  } = useTheme();
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [showExport, setShowExport] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showPresets, setShowPresets] = useState(false);

  const handleCopy = async (text: string, itemId: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedItem(itemId);
      setTimeout(() => setCopiedItem(null), 2000);
    }
  };

  return (
    <motion.div
      className="h-full flex flex-col bg-background border-r border-border/50 overflow-hidden scrollbar-custom"
      initial={{ x: -400 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-border/30">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-xl font-bold text-foreground mb-1">
            Color Studio
          </h1>
          <p className="text-xs text-muted-foreground">
            Create stunning color systems
          </p>
        </motion.div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-hide">
        {/* Color Controls */}
        <motion.div
          className="space-y-3 bg-muted/40 rounded-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <IconPaletteFilled />
            <h2 className="font-semibold text-foreground text-xl">Colors</h2>
          </div>
          <ColorControl
            label="Primary"
            value={state.colors.primary}
            onChange={(value) => updateColor("primary", value)}
          />
          <ColorControl
            label="Secondary"
            value={state.colors.secondary}
            onChange={(value) => updateColor("secondary", value)}
          />
          <ColorControl
            label="Accent"
            value={state.colors.accent}
            onChange={(value) => updateColor("accent", value)}
          />
          <ColorControl
            label="Background"
            value={state.colors.bg}
            onChange={(value) => updateColor("bg", value)}
          />
          <ColorControl
            label="Text"
            value={state.colors.text}
            onChange={(value) => updateColor("text", value)}
          />
        </motion.div>

        {/* Theme Toggles */}
        <motion.div
          className="space-y-2 bg-muted/40 rounded-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <IconColorFilter />
            <h2 className="font-semibold text-foreground text-xl">Display</h2>
          </div>
          <label className="flex items-center gap-3 cursor-pointer px-2 py-2 rounded hover:bg-background/50 transition-colors">
            <input
              type="checkbox"
              checked={state.isDark}
              onChange={toggleDarkMode}
              className="w-4 h-4 rounded cursor-pointer accent-primary"
            />
            <span className="text-sm text-foreground">Dark Mode</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer px-2 py-2 rounded hover:bg-background/50 transition-colors">
            <input
              type="checkbox"
              checked={state.isRounded}
              onChange={toggleRounded}
              className="w-4 h-4 rounded cursor-pointer accent-primary"
            />
            <span className="text-sm text-foreground">Rounded Corners</span>
          </label>
        </motion.div>

        {/* Typography */}
        <motion.div
          className="space-y-3 bg-muted/40 rounded-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <IconTextResize />
            <h2 className="font-semibold text-foreground text-xl">Prototype</h2>
          </div>

          {/* Font Family */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground block pl-1">
              Family
            </label>
            <Combobox
              options={Object.keys(FONT_FAMILIES).map((family) => ({
                value: family,
                label: family,
              }))}
              value={state.fontFamily}
              onChange={(v) => setFontFamily(v)}
              placeholder="Select family..."
              disabled={!!state.customFontName}
            />
          </div>

          {/* Font Weight */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground block pl-1">
              Weight
            </label>
            <Combobox
              options={[
                { value: "400", label: "Light (400)" },
                { value: "500", label: "Regular (500)" },
                { value: "600", label: "Semi Bold (600)" },
                { value: "700", label: "Bold (700)" },
                { value: "800", label: "Extra Bold (800)" },
              ]}
              value={state.fontWeight}
              onChange={(v) => setFontWeight(v as any)}
              placeholder="Select weight..."
            />
          </div>

          {/* Custom Font Upload */}
          <FontUpload
            onFontUpload={setCustomFont}
            currentFontName={state.customFontName}
            onClear={() => {
              setFontFamily("Plus Jakarta Sans");
            }}
          />
        </motion.div>

        {/* Content Customization */}
        <motion.div
          className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
        >
          {/* Header */}
          <button
            onClick={() => setShowContent(!showContent)}
            className="w-full flex items-center justify-between focus:outline-none"
          >
            <div className="flex items-center gap-3">
              <IconFileDescription className="w-6 h-6 text-primary-500" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Content
              </h2>
            </div>
            <span
              className={`text-lg transform transition-transform duration-300 ${
                showContent ? "rotate-0" : "-rotate-90"
              }`}
            >
              <IconChevronDown />
            </span>
          </button>

          {/* Text Editors */}
          <AnimatePresence>
            {showContent && (
              <motion.div
                className="mt-4 space-y-3 border-t border-gray-200 dark:border-gray-700 pt-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {[
                  {
                    label: "Navbar Brand",
                    key: "navbarBrand" as const,
                    maxLength: 50,
                  },
                  {
                    label: "Hero Title",
                    key: "heroTitle" as const,
                    maxLength: 100,
                  },
                  {
                    label: "Hero Description",
                    key: "heroDescription" as const,
                    maxLength: 200,
                    multiline: true,
                    rows: 3,
                  },
                  {
                    label: "Section Title",
                    key: "cardTitle" as const,
                    maxLength: 50,
                  },
                  {
                    label: "Get Started Button",
                    key: "getStartedBtn" as const,
                    maxLength: 30,
                  },
                  {
                    label: "Learn More Button",
                    key: "learnMoreBtn" as const,
                    maxLength: 30,
                  },
                ].map((item) => (
                  <TextEditor
                    key={item.key}
                    label={item.label}
                    value={state.textContent[item.key]}
                    onChange={(value) => updateTextContent(item.key, value)}
                    maxLength={item.maxLength}
                    multiline={item.multiline}
                    rows={item.rows}
                  />
                ))}

                {/* Reset Button */}
                <motion.button
                  onClick={resetTextContent}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2 px-4 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl font-medium hover:opacity-90 text-sm flex items-center justify-center gap-2 shadow-sm"
                >
                  <IconRotateClockwise size={16} />
                  Reset Text
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Presets */}
        <motion.div
          className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.68 }}
        >
          {/* Header */}
          <button
            onClick={() => setShowPresets(!showPresets)}
            className="w-full flex items-center justify-between focus:outline-none"
          >
            <div className="flex items-center gap-3">
              <IconRainbow className="w-6 h-6 text-primary-500" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Color Presets
              </h2>
            </div>
            <span
              className={`text-lg transform transition-transform duration-300 ${
                showPresets ? "rotate-0" : "-rotate-90"
              }`}
            >
              <IconChevronDown />
            </span>
          </button>

          {/* Presets Grid */}
          <AnimatePresence>
            {showPresets && (
              <motion.div
                className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {COLOR_PRESETS.map((preset) => (
                  <motion.button
                    key={preset.name}
                    onClick={() => applyPreset(preset)}
                    className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md text-left flex flex-col transition-all duration-200"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {/* Preset Info */}
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      {preset.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {preset.description}
                    </p>

                    {/* Color Indicators */}
                    <div className="flex gap-2 mt-3">
                      {["primary", "secondary", "accent"].map((key) => (
                        <span
                          key={key}
                          className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600"
                          style={{
                            backgroundColor: `hsl(${preset.colors[key]})`,
                          }}
                        />
                      ))}
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Accessibility Checker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <ContrastChecker />
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            onClick={generateRandomPalette}
            variant="design-review"
            className="w-full"
          >
            <IconArrowsRandom size={16} />
            Random
          </Button>

          <Button onClick={resetPalette} variant="in-review" className="w-full">
            <IconRotateClockwise size={16} />
            Reset Colors
          </Button>

          <Button
            onClick={() => setShowExport(!showExport)}
            variant="done"
            className="w-full"
          >
            <IconDownload size={16} />
            Export
          </Button>

          <Button
            variant="blocked"
            onClick={resetAllToDefaults}
            className="w-full"
          >
            <IconRepeat size={16} />
            Reset All
          </Button>
        </motion.div>

        {/* Export Panel */}
        <AnimatePresence>
          {showExport && (
            <motion.div
              className="bg-muted/40 rounded-lg p-4 space-y-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* CSS Variables */}
              <motion.div
                className="space-y-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                  CSS Variables
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      handleCopy(generateCSSVariables(state.colors), "css")
                    }
                    className="flex-1 py-1.5 px-2 bg-background rounded text-xs font-mono border border-border/50 text-muted-foreground hover:bg-muted  text-left truncate"
                  >
                    Copy
                  </button>
                  {copiedItem === "css" && (
                    <div className="flex items-center gap-1 text-green-600">
                      <IconCheck size={16} />
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Tailwind Config */}
              <motion.div
                className="space-y-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                  Tailwind Config
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      handleCopy(
                        generateTailwindConfig(state.colors),
                        "tailwind",
                      )
                    }
                    className="flex-1 py-1.5 px-2 bg-background rounded text-xs font-mono border border-border/50 text-muted-foreground hover:bg-muted  text-left truncate"
                  >
                    Copy
                  </button>
                  {copiedItem === "tailwind" && (
                    <div className="flex items-center gap-1 text-green-600">
                      <IconCheck size={16} />
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-border/30 text-xs text-muted-foreground text-center bg-muted/20">
        <p className="font-medium">Color Studio v1.0</p>
      </div>
    </motion.div>
  );
};

const PreviewArea = () => {
  const { state } = useTheme();

  return (
    <motion.div
      className="flex-1 overflow-y-auto bg-background transition-colors duration-300"
      style={{
        backgroundColor: `hsl(var(--color-bg))`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <PreviewNavbar />
      <PreviewHero />
      <PreviewStats />
      <PreviewCard />
      <PreviewPricing />
      <PreviewTestimonials />
      <PreviewCTA />
      <PreviewFooter />
    </motion.div>
  );
};

function IndexPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ThemeProvider>
      <div className="h-screen flex flex-col bg-background">
        {/* Mobile Header */}
        {isMobile && (
          <div className="bg-background border-b border-border/30 px-4 py-3 flex items-center justify-between">
            <h1 className="font-bold text-foreground text-lg">Color Studio</h1>
            <motion.button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              {sidebarOpen ? "✕" : "≡"}
            </motion.button>
          </div>
        )}

        {/* Main Content */}
        <div
          style={{ overflow: "hidden" }}
          className="flex-1 flex overflow-hidden"
        >
          {/* Sidebar */}
          <AnimatePresence mode="wait">
            {(!isMobile || sidebarOpen) && (
              <div className="w-full md:w-96 md:static absolute inset-0 md:inset-auto z-40">
                <ControlPanel />
              </div>
            )}
          </AnimatePresence>

          {/* Preview */}
          {!isMobile || !sidebarOpen ? <PreviewArea /> : null}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default IndexPage;
