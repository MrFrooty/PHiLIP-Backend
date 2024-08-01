import React from 'react';
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';
import { cn } from "@/lib/utils";
import Image from 'next/image';

interface ImageSelectionControlsProps {
  images: string[];
  selectedImages: string[];
  onImageSelect: (imageUrl: string) => void;
  onDownload: () => void;
  onClearSelection: () => void;
  isProcessing: boolean;
}

const ImageSelectionControls: React.FC<ImageSelectionControlsProps> = ({
  images,
  selectedImages,
  onImageSelect,
  onDownload,
  onClearSelection,
  isProcessing,
}) => {
  return (
    <div className="flex flex-col items-center mt-4 mb-8">
      <div className="grid grid-cols-3 gap-4 mb-4">
        {images.map((imageUrl, index) => (
          <div key={index} className="relative">
            <Image
              src={imageUrl}
              alt={`Generated Image ${index + 1}`}
              className={cn(
                "w-full h-auto object-cover rounded-lg transition-opacity",
                selectedImages.includes(imageUrl) ? "opacity-70" : "opacity-100"
              )}
              onClick={() => !isProcessing && onImageSelect(imageUrl)}
            />
            {selectedImages.includes(imageUrl) && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Check className="text-primary w-8 h-8" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex space-x-4">
        <Button
          onClick={onDownload}
          disabled={selectedImages.length === 0 || isProcessing}
          variant="secondary"
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Download Selected
        </Button>
        <Button
          onClick={onClearSelection}
          disabled={selectedImages.length === 0 || isProcessing}
          variant="outline"
          className="border-blue-500 text-blue-500 hover:bg-blue-50"
        >
          Clear Selection
        </Button>
      </div>
    </div>
  );
};

export default ImageSelectionControls;