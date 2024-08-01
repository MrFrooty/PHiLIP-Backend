import React, { useState } from 'react';
import BlurFade from '@/components/ui/blur-fade';
import { BentoGrid, BentoCard } from '@/components/ui/bento-grid';
import { Button } from '@/components/ui/button';
import { ArtStyles } from '@/lib/art-styles';
import { PaletteIcon } from 'lucide-react';

interface StyleSelectorProps {
  artStyles: ArtStyles;
  selectedStyle: string | null;
  onStyleSelection: (style: string) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ artStyles, selectedStyle, onStyleSelection }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [highlightedStyle, setHighlightedStyle] = useState<string | null>(null);

  const renderStyleOptions = (options: (string | { label: string; options: string[] })[]) => (
    <div className="grid grid-cols-2 gap-2">
      {options.map((option, index) => {
        if (typeof option === 'string') {
          return (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className={`text-xs ${highlightedStyle === option ? 'bg-primary/10 text-primary' : ''} ${selectedStyle === option ? 'bg-primary text-primary-foreground' : ''}`}
              onClick={() => setHighlightedStyle(option)}
            >
              {option}
            </Button>
          );
        } else {
          return (
            <div key={index} className="col-span-2">
              <h4 className="font-semibold text-xs mb-1">{option.label}</h4>
              <div className="grid grid-cols-2 gap-1">
                {option.options.map((subOption, subIndex) => (
                  <Button
                    key={subIndex}
                    variant="outline"
                    size="sm"
                    className={`text-xs ${highlightedStyle === subOption ? 'bg-primary/10 text-primary' : ''} ${selectedStyle === subOption ? 'bg-primary text-primary-foreground' : ''}`}
                    onClick={() => setHighlightedStyle(subOption)}
                  >
                    {subOption}
                  </Button>
                ))}
              </div>
            </div>
          );
        }
      })}
    </div>
  );

  const handleCategoryExpand = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
    setHighlightedStyle(null);
  };

  const handleStyleSelect = () => {
    if (highlightedStyle) {
      onStyleSelection(highlightedStyle);
      setHighlightedStyle(null);
      setExpandedCategory(null);
    } else if (expandedCategory) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(null); 
    }
  };

  return (
    <BlurFade>
      <BentoGrid className="grid-cols-2 gap-4">
        {Object.entries(artStyles).map(([category, options], index) => (
          <BlurFade key={category} delay={index * 0.1}>
            <BentoCard
              name={category.charAt(0).toUpperCase() + category.slice(1)}
              className="col-span-1"
              background={
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900" />
              }
              Icon={PaletteIcon}
              description={`Explore ${category} art styles`}
              href="#"
              cta="Select"
              isSelected={expandedCategory === category}
              onSelect={handleStyleSelect}
              content={renderStyleOptions(options as any)}
            />
          </BlurFade>
        ))}
      </BentoGrid>
    </BlurFade>
  );
};

export default StyleSelector;