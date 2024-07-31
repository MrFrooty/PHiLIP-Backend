import React from 'react';
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface ProgressButtonProps {
  onClick: () => void;
  isGenerating: boolean;
  progress: number;
}

const ProgressButton: React.FC<ProgressButtonProps> = ({ onClick, isGenerating, progress }) => {
  return (
    <div className="w-full">
      {isGenerating ? (
        <Progress value={progress} className="w-full h-10" />
      ) : (
        <Button onClick={onClick} className="w-full h-10">
          Generate Images
        </Button>
      )}
    </div>
  );
};

export default ProgressButton;