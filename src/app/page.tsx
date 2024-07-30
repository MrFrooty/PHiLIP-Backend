'use client'

import { useState, ReactNode } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid"
import BlurFade from "@/components/ui/blur-fade"
import Image from 'next/image'

type ArtStyleOption = string | { label: string; options: string[] };
type ArtStyles = Record<string, ArtStyleOption[]>;

const artStyles: ArtStyles = {
  traditional: [
    { label: "Classical and Renaissance", options: ["Renaissance", "Mannerism", "Baroque", "Rococo"] },
    { label: "19th Century Art Movements", options: ["Neoclassicism", "Romanticism", "Realism", "Impressionism", "Post-Impressionism", "Symbolism", "Tonalism", "Art Nouveau"] },
  ],
  contemporary: ["Anime", "Cartoon", "Digital Pixel Art", "Steampunk", "Cyberpunk", "Fantasy", "Sci-Fi", "Retro", "Vaporwave", "Graffiti", "Pin-Up", "Tattoo", "Chibi", "Comic Book", "Manga", "Retro Futurism", "Kawaii", "Doodle", "Whimsical", "Pop Surrealism", "Memphis"],
  popArt: ["Pop Art", "Pop Surrealism"],
  specialized: ["Fantasy", "Sci-Fi", "Steampunk", "Cyberpunk", "Retro", "Vaporwave", "Graffiti", "Pin-Up", "Tattoo", "Chibi", "Comic Book", "Manga", "Retro Futurism", "Kawaii", "Doodle", "Whimsical", "Pop Surrealism", "Memphis"],
};

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)

  const handleStyleSelection = (style: string) => {
    setSelectedStyle((prev) => (prev === style ? null : style));
  };

  const handleGenerate = async () => {
    console.log('Generating image with prompt:', prompt);
    console.log('Selected style:', selectedStyle);
    // TODO: Implement actual API call here
    // For now, let's just add a placeholder image
    setGeneratedImages(['https://via.placeholder.com/512x512.png?text=Generated+Image']);
  };

  const renderStyleOptions = (options: ArtStyleOption[]): ReactNode => (
    <div className="grid grid-cols-2 gap-2">
      {options.map((option, index) => {
        if (typeof option === 'string') {
          return (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className={`text-xs ${selectedStyle === option ? 'bg-primary text-primary-foreground' : ''}`}
              onClick={() => handleStyleSelection(option)}
            >
              {option}
            </Button>
          );
        } else {
          return (
            <div key={index} className="col-span-2">
              <h4 className="font-semibold text-sm mb-1">{option.label}</h4>
              <div className="grid grid-cols-2 gap-1">
                {option.options.map((subOption, subIndex) => (
                  <Button
                    key={subIndex}
                    variant="outline"
                    size="sm"
                    className={`text-xs ${selectedStyle === subOption ? 'bg-primary text-primary-foreground' : ''}`}
                    onClick={() => handleStyleSelection(subOption)}
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

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex">
        {/* Left side: Controls and Styles */}
        <div className="w-1/2 p-6 overflow-y-auto">
          <BlurFade className="mb-6">
            <h1 className="text-3xl font-bold mb-4">PHiLIP Image Generator</h1>
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your image prompt"
              className="w-full mb-4"
            />
            <Button onClick={handleGenerate} className="w-full mb-6">
              Generate Images
            </Button>
          </BlurFade>

          <BentoGrid className="grid-cols-2 gap-4">
            {Object.entries(artStyles).map(([category, options], index) => (
              <BlurFade key={category} delay={index * 0.1}>
                <BentoCard
                  name={category.charAt(0).toUpperCase() + category.slice(1)}
                  className="col-span-1"
                  background={<div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900" />}
                  Icon={() => <div className="text-3xl">🎨</div>}
                  description={`Explore ${category} art styles`}
                  href="#"
                  cta="Select"
                  isSelected={selectedStyle === category}
                  onSelect={() => handleStyleSelection(category)}
                  content={renderStyleOptions(options)}
                />
              </BlurFade>
            ))}
          </BentoGrid>
        </div>

        {/* Right side: Generated Image */}
        <div className="w-1/2 p-6 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
          <BlurFade>
            {generatedImages.length > 0 ? (
              <Image 
              src={generatedImages[0]} 
              alt="Generated Image" 
              width={512}
              height={512}
              className="max-w-full max-h-full object-contain shadow-lg rounded-lg"
            />
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400">
                <p className="text-xl mb-2">No image generated yet</p>
                <p>Enter a prompt and click <span>Generate Images</span> to create an image</p>
              </div>
            )}
          </BlurFade>
        </div>
      </main>

      <footer className="py-4 text-center text-sm text-muted-foreground">
        © 2024 PHiLIP Image Generator. All rights reserved.
      </footer>
    </div>
  )
}
