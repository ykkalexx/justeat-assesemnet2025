"use client";

import { useState, useEffect } from "react";
import { Person } from "@phosphor-icons/react";

const AccesibilityPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const savedFontSize = localStorage.getItem("fontSize");
    if (savedFontSize) {
      setFontSize(parseInt(savedFontSize));
    }

    const savedContrast = localStorage.getItem("highContrast");
    if (savedContrast === "true") {
      setHighContrast(true);
      document.documentElement.classList.add("high-contrast");
    }

    document.documentElement.style.fontSize = `${fontSize}%`;
  }, []);

  // font sizew
  useEffect(() => {
    if (isMounted) {
      document.documentElement.style.fontSize = `${fontSize}%`;
      localStorage.setItem("fontSize", fontSize.toString());
    }
  }, [fontSize, isMounted]);

  // contrast
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("highContrast", highContrast.toString());
    }
  }, [highContrast, isMounted]);

  const increaseFontSize = () =>
    setFontSize((prev) => Math.min(prev + 10, 130));

  const decreaseFontSize = () => setFontSize((prev) => Math.max(prev - 10, 80));

  const toggleHighContrast = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);

    if (newValue) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
  };

  // Don't render anything until component is mounted
  if (!isMounted) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Accessibility settings"
        className="bg-[#ff8000] text-white p-3 rounded-full shadow-lg hover:bg-[#e67300] transition-colors"
      >
        <Person size={24} />
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white p-4 rounded-xl shadow-lg w-64">
          <h2 className="font-bold text-lg mb-4">Accessibility Options</h2>

          <div className="space-y-4">
            <div>
              <label className="font-medium text-sm block mb-2">
                Text Size
              </label>
              <div className="flex items-center justify-between">
                <button
                  onClick={decreaseFontSize}
                  className="bg-gray-200 hover:bg-gray-300 p-2 rounded-l"
                  disabled={fontSize <= 80}
                >
                  A-
                </button>
                <div className="px-3 font-medium">{fontSize}%</div>
                <button
                  onClick={increaseFontSize}
                  className="bg-gray-200 hover:bg-gray-300 p-2 rounded-r"
                  disabled={fontSize >= 130}
                >
                  A+
                </button>
              </div>
            </div>

            <div>
              <label className="font-medium text-sm block mb-2">
                <input
                  type="checkbox"
                  checked={highContrast}
                  onChange={toggleHighContrast}
                  className="mr-2"
                />
                High Contrast Mode
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccesibilityPanel;
