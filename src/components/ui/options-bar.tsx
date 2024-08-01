import React from "react";
import PulsatingButton from "@/components/ui/pulsating-button";

interface OptionsBarProps {
  isEnabled: boolean;
  onOptionClick: (option: string) => void;
}

const OptionsBar: React.FC<OptionsBarProps> = ({ isEnabled, onOptionClick }) => {
  const options = ['Regenerate', 'Stop', 'Pixart', 'ControlNet', 'Upscale', "Freestyle"];

  return (
    <div className="fixed right-0 bottom-8 w-[50%] flex justify-center items-center p-4">
      <div className="flex flex-wrap justify-center gap-4">
        {options.map((option) => (
          <PulsatingButton
            key={option}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors
              ${option === 'Stop' || (isEnabled && option !== 'Stop')
                ? "bg-primary/70 text-primary-foreground hover:bg-primary/90"
                : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            onClick={() => (option === 'Stop' || isEnabled) && onOptionClick(option)}
            disabled={option !== 'Stop' && !isEnabled}
            pulseColor={option === 'Stop' || isEnabled ? "hsl(var(--primary))" : "hsl(var(--muted))"}
            duration="2s"
          >
            {option}
          </PulsatingButton>
        ))}
      </div>
    </div>
  );
};

export default OptionsBar;