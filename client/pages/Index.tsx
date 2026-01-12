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
import { Check, Copy, RotateCcw } from "lucide-react";

const ControlPanel = () => {
  const {
    state,
    updateColor,
    toggleDarkMode,
    toggleRounded,
    setFontSize,
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
          <h2 className="font-semibold text-foreground text-xl">Colors</h2>
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
          <h2 className="font-semibold text-foreground text-xs uppercase tracking-widest text-center">
            🌓 Display
          </h2>

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

        {/* Font Size */}
        <motion.div
          className="space-y-2 bg-muted/40 rounded-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="font-semibold text-foreground text-xs uppercase tracking-widest text-center">
            📝 Font Size
          </h2>
          <div className="flex gap-2">
            {(["sm", "md", "lg"] as const).map((size) => (
              <motion.button
                key={size}
                onClick={() => setFontSize(size)}
                className={`flex-1 py-2 rounded-md text-xs font-bold  ${
                  state.fontSize === size
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-background text-muted-foreground hover:bg-muted border border-border/50"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {size.toUpperCase()}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Typography */}
        <motion.div
          className="space-y-3 bg-muted/40 rounded-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <h2 className="font-semibold text-foreground text-xs uppercase tracking-widest text-center">
            🔤 Typography
          </h2>

          {/* Font Family */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground block pl-1">
              Family
            </label>
            <select
              value={state.fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              disabled={!!state.customFontName}
              className="w-full px-2 py-1.5 rounded text-xs border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-colors disabled:opacity-50"
            >
              {Object.keys(FONT_FAMILIES).map((family) => (
                <option key={family} value={family}>
                  {family}
                </option>
              ))}
            </select>
          </div>

          {/* Font Weight */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground block pl-1">
              Weight
            </label>
            <select
              value={state.fontWeight}
              onChange={(e) => setFontWeight(e.target.value as any)}
              className="w-full px-2 py-1.5 rounded text-xs border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
            >
              <option value="400">Light (400)</option>
              <option value="500">Regular (500)</option>
              <option value="600">Semi Bold (600)</option>
              <option value="700">Bold (700)</option>
              <option value="800">Extra Bold (800)</option>
            </select>
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
          className="bg-muted/40 rounded-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
        >
          <button
            onClick={() => setShowContent(!showContent)}
            className="w-full font-semibold text-foreground text-xs uppercase tracking-widest flex items-center justify-between px-2 py-2"
          >
            <span>📄 Content & Text</span>
            <span className="text-lg">{showContent ? "▼" : "▶"}</span>
          </button>

          <AnimatePresence>
            {showContent && (
              <motion.div
                className="space-y-3 pt-3 mt-2 border-t border-border/50"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TextEditor
                  label="Navbar Brand"
                  value={state.textContent.navbarBrand}
                  onChange={(value) => updateTextContent("navbarBrand", value)}
                  maxLength={50}
                />

                <TextEditor
                  label="Hero Title"
                  value={state.textContent.heroTitle}
                  onChange={(value) => updateTextContent("heroTitle", value)}
                  maxLength={100}
                />

                <TextEditor
                  label="Hero Description"
                  value={state.textContent.heroDescription}
                  onChange={(value) =>
                    updateTextContent("heroDescription", value)
                  }
                  maxLength={200}
                  multiline
                  rows={3}
                />

                <TextEditor
                  label="Section Title"
                  value={state.textContent.cardTitle}
                  onChange={(value) => updateTextContent("cardTitle", value)}
                  maxLength={50}
                />

                <TextEditor
                  label="Get Started Button"
                  value={state.textContent.getStartedBtn}
                  onChange={(value) =>
                    updateTextContent("getStartedBtn", value)
                  }
                  maxLength={30}
                />

                <TextEditor
                  label="Learn More Button"
                  value={state.textContent.learnMoreBtn}
                  onChange={(value) => updateTextContent("learnMoreBtn", value)}
                  maxLength={30}
                />

                <motion.button
                  onClick={resetTextContent}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2 px-4 bg-muted text-muted-foreground rounded-lg font-medium  hover:opacity-90 text-sm flex items-center justify-center gap-2"
                >
                  <RotateCcw size={14} />
                  Reset Text
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Presets */}
        <motion.div
          className="bg-muted/40 rounded-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.68 }}
        >
          <button
            onClick={() => setShowPresets(!showPresets)}
            className="w-full font-semibold text-foreground text-xs uppercase tracking-widest flex items-center justify-between px-2 py-2"
          >
            <span>✨ Color Presets</span>
            <span className="text-lg">{showPresets ? "▼" : "▶"}</span>
          </button>

          <AnimatePresence>
            {showPresets && (
              <motion.div
                className="space-y-2 pt-3 mt-2 border-t border-border/50 grid grid-cols-2 gap-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {COLOR_PRESETS.map((preset) => (
                  <motion.button
                    key={preset.name}
                    onClick={() => applyPreset(preset)}
                    className="p-3 rounded-lg border border-border/50 bg-background hover:bg-muted  text-left"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <p className="text-xs font-semibold text-foreground mb-1">
                      {preset.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {preset.description}
                    </p>
                    <div className="flex gap-1 mt-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: `hsl(${preset.colors.primary})`,
                        }}
                      />
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: `hsl(${preset.colors.secondary})`,
                        }}
                      />
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: `hsl(${preset.colors.accent})`,
                        }}
                      />
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
          <motion.button
            onClick={generateRandomPalette}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2 px-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg font-bold text-sm  shadow-sm hover:shadow-md"
          >
            🎲 Random
          </motion.button>

          <motion.button
            onClick={resetPalette}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2 px-4 bg-muted text-muted-foreground rounded-lg font-bold text-sm  flex items-center justify-center gap-2 border border-border/50 hover:bg-muted/80"
          >
            <RotateCcw size={14} />
            Reset
          </motion.button>

          <motion.button
            onClick={() => setShowExport(!showExport)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2 px-4 bg-accent text-accent-foreground rounded-lg font-bold text-sm  shadow-sm hover:shadow-md"
          >
            📥 Export
          </motion.button>

          <motion.button
            onClick={resetAllToDefaults}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2 px-4 bg-destructive/10 text-destructive rounded-lg font-bold text-sm  border border-destructive/30 hover:bg-destructive/20"
          >
            🔄 Reset All
          </motion.button>
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
                      <Check size={16} />
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
                      <Check size={16} />
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
