import React from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { cn } from "@/lib/utils";
import BlurFade from '@/components/ui/blur-fade';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';

interface ImageCarouselProps {
  generatedImages: string[];
  selectedImages: string[];
  onImageSelect: (imageUrl: string) => void;
  resolution: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  generatedImages,
  selectedImages,
  onImageSelect,
  resolution,
}) => {
  const handleDownload = () => {
    selectedImages.forEach((imageUrl, index) => {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `generated-image-${index + 1}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const handleClearSelection = () => {
    selectedImages.forEach(imageUrl => onImageSelect(imageUrl));
  };

  return (
    <div className="w-1/2 p-6 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <BlurFade>
        {generatedImages.length > 0 ? (
          <div className="flex flex-col items-center w-full max-w-xs">
            <Carousel className="w-full mb-4">
              <CarouselContent>
                {generatedImages.map((imageUrl, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1 relative">
                      <Image
                        src={imageUrl}
                        alt={`Generated Image ${index + 1}`}
                        width={resolution}
                        height={resolution}
                        className={cn(
                          "w-full h-auto object-contain shadow-lg rounded-lg transition-opacity cursor-pointer",
                          selectedImages.includes(imageUrl) ? "opacity-70" : "opacity-100"
                        )}
                        onClick={() => onImageSelect(imageUrl)}
                      />
                      {selectedImages.includes(imageUrl) && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Check className="text-primary w-8 h-8" />
                        </div>
                      )}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>

            <div className="flex justify-center space-x-4 mt-4">
              <Button
                onClick={handleDownload}
                disabled={selectedImages.length === 0}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Download Images({selectedImages.length})
              </Button>
              <Button
                onClick={handleClearSelection}
                disabled={selectedImages.length === 0}
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                Clear Selection
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400">
            <p className="text-xl mb-2">No images generated yet</p>
            <p>
              Enter a prompt and click <span>Generate Images</span> to
              create images
            </p>
          </div>
        )}
      </BlurFade>
    </div>
  );
};

export default ImageCarousel;