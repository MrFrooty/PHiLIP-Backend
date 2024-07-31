'use client'

import { useState, useEffect, ReactNode } from 'react'
import axios from 'axios';
import Image from 'next/image'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid"
import BlurFade from "@/components/ui/blur-fade"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import ProgressButton from '@/components/ui/progress-button'
import OptionsBar from '@/components/ui/options-bar'
import AboutMeSection from '@/components/ui/about'
import { generateImages, applyPixart, applyFreestyle, applyUpscaler, applyControlNet } from '@/app/api.js'

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
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null)
  const [isEnhanced, setIsEnhanced] = useState(false)

  const [numImages, setNumImages] = useState(9)
  const [resolution, setResolution] = useState(512)
  const [temperature, setTemperature] = useState(1.0)
  const [inferenceSteps, setInferenceSteps] = useState(10)

  const handleStyleSelection = (style: string) => {
    setSelectedStyle((prev) => (prev === style ? null : style));
  };

  const handleOptionClick = async (option: string) => {
    if (!generatedImages.length) {
      console.log(`Cannot ${option} without a generated image`);
      return;
    }

    const lastGeneratedImage = generatedImages[generatedImages.length - 1];
    setIsLoading(true);
    setError(null);

    try {
      let result;
      switch (option) {
        case 'Continue':
          result = await applyPixart(lastGeneratedImage, prompt, temperature);
          break;
        case 'Regenerate':
          console.log('Regenerate option clicked');
          setIsLoading(false);
          return;
        case 'Stop':
          console.log('Stop option clicked');
          setIsLoading(false);
          return;
        case 'ControlNet':
          result = await applyControlNet(lastGeneratedImage, prompt);
          break;
        case 'Upscale':
          result = await applyUpscaler(lastGeneratedImage, prompt, temperature, [1024, 1024]);
          break;
        case 'Freestyle':
          result = await applyFreestyle(lastGeneratedImage, prompt, temperature, selectedStyle);
          break;
        default:
          console.log(`Unknown option: ${option}`);
          setIsLoading(false);
          return;
      }

      if (result && result.enhancedImage) {
        setEnhancedImage(result.enhancedImage);
        setIsEnhanced(true); 
      }
    } catch (error) {
      console.error(`Error applying ${option}:`, error);
      setError(`Failed to apply ${option}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setIsEnhanced(false); 
    setEnhancedImage(null);
  
    try {
      console.log('Sending request to generate images...');
      console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
      console.log('Full request data:', { prompt, numImages, resolution, temperature, inferenceSteps });
  
      const fullPrompt = selectedStyle ? `${prompt} in ${selectedStyle} style` : prompt;
      const response = await generateImages(fullPrompt, numImages, resolution, temperature, inferenceSteps);
      
      console.log('API Response:', response);
      
      if (response && Array.isArray(response.images)) {
        setGeneratedImages(response.images);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error: unknown) {
      console.error('Error generating images:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('Error response:', error.response.data);
          console.error('Error status:', error.response.status);
          console.error('Error headers:', error.response.headers);
          console.error('Full error object:', JSON.stringify(error, null, 2));
          setError(`Failed to generate images. Server responded with status ${error.response.status}`);
        } else if (error.request) {
          console.error('Error request:', error.request);
          setError('Failed to generate images. No response received from the server.');
        } else {
          console.error('Error message:', error.message);
          setError(`Failed to generate images. ${error.message}`);
        }
      } else if (error instanceof Error) {
        setError(`An error occurred: ${error.message}`);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
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
        <div className="w-full md:w-1/2 p-6 overflow-y-auto">
          <BlurFade className="mb-6">
            <h1 className="text-3xl font-bold mb-4">PHiLIP Image Generator</h1>
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your image prompt"
              className="w-full mb-4"
            />
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">Number of Images</label>
                <Input
                  type="number"
                  value={numImages}
                  onChange={(e) => setNumImages(Number(e.target.value))}
                  placeholder="Number of images"
                  min={1}
                  max={9}
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">Resolution</label>
                <Input
                  type="number"
                  value={resolution}
                  onChange={(e) => setResolution(Number(e.target.value))}
                  placeholder="Resolution"
                  step={64}
                  min={256}
                  max={1024}
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">Temperature</label>
                <Input
                  type="number"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  placeholder="Temperature"
                  step={0.1}
                  min={0.1}
                  max={2.0}
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">Inference Steps</label>
                <Input
                  type="number"
                  value={inferenceSteps}
                  onChange={(e) => setInferenceSteps(Number(e.target.value))}
                  placeholder="Inference Steps"
                  min={1}
                  max={50}
                />
              </div>
            </div>
            <Button onClick={handleGenerate} className="w-full mb-6" disabled={isLoading}>
              {isLoading ? 'Generating...' : 'Generate Images'}
            </Button>
            {/* <ProgressButton
              onClick={handleGenerate}
              isGenerating={isLoading}
              progress={progress}
            /> */}
            {error && <p className="text-red-500 mb-4">{error}</p>}
          </BlurFade>

          <BentoGrid className="grid-cols-2 gap-4">
            {Object.entries(artStyles).map(([category, options], index) => (
              <BlurFade key={category} delay={index * 0.1}>
                <BentoCard
                  name={category.charAt(0).toUpperCase() + category.slice(1)}
                  className="col-span-1"
                  background={<div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900" />}
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

        {/* Right side: Generated Image Carousel */}
        <div className="w-1/2 p-6 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
          <BlurFade>
            {generatedImages.length > 0 ? (
              isEnhanced ? (
                <div className="w-full max-w-xs">
                  <Image 
                    src={enhancedImage!} 
                    alt="Enhanced Image" 
                    width={resolution}
                    height={resolution}
                    className="max-w-full object-contain shadow-lg rounded-lg"
                  />
                </div>
              ) : (
                <Carousel className="w-full max-w-xs">
                  <CarouselContent>
                    {generatedImages.map((imageUrl, index) => (
                      <CarouselItem key={index}>
                        <div className="p-1">
                          <Image 
                            src={imageUrl} 
                            alt={`Generated Image ${index + 1}`} 
                            width={resolution}
                            height={resolution}
                            className="max-w-full object-contain shadow-lg rounded-lg"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              )
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400">
                <p className="text-xl mb-2">No images generated yet</p>
                <p>Enter a prompt and click <span>Generate Images</span> to create images</p>
              </div>
            )}
          </BlurFade>
        </div>
      </main>
      <BlurFade>
        <OptionsBar
          isEnabled={generatedImages.length > 0 && !isLoading}
          onOptionClick={handleOptionClick}
        />
      </BlurFade>
      <BlurFade>
        <AboutMeSection/>
      </BlurFade>
      <footer className="py-4 text-center text-sm text-muted-foreground">
        © 2024 PHiLIP. All rights reserved.
      </footer>
    </div>
  )
}
