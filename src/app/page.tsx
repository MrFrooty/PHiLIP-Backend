'use client';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import TeamSection from '@/components/ui/team';
import InfoSection from '@/components/ui/info';
import { Input } from '@/components/ui/input';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import BlurFade from '@/components/ui/blur-fade';
import OptionsBar from '@/components/ui/options-bar';
import StyleSelector from '@/components/ui/style-selector'
import ImageCarousel from '@/components/ui/image-carousel'
import {
  generateImages,
  applyPixart,
  applyFreestyle,
  applyUpscaler,
  applyControlNet,
} from '@/app/api.js';

import { artStyles } from '@/lib/art-styles'
import FeatureSection from '@/components/ui/features';
import StorySection from '@/components/ui/story';
import TechSection from '@/components/ui/tech';
import ArtStylesButtons from '@/components/ui/options';
import WorkSection from '@/components/ui/work';

export default function Home() {
  const [prompt, setPrompt] = useState({ text: '', charCount: 0 });
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [alertInfo, setAlertInfo] = useState<{ show: boolean; message: string }>({ show: false, message: '' });
  const abortControllerRef = useRef<AbortController | null>(null);

  const [numImages, setNumImages] = useState(9);
  const [resolution, setResolution] = useState(512);
  const [temperature, setTemperature] = useState(1.0);
  const [inferenceSteps, setInferenceSteps] = useState(4);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prevProgress + 1;
        });
      }, 100);

      return () => clearInterval(interval);
    } else {
      setProgress(0);
    }
  }, [isLoading]);

  useEffect(() => {
    if (alertInfo.show) {
      const timer = setTimeout(() => {
        setAlertInfo({ show: false, message: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alertInfo.show]);
    
  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value.slice(0, 300);
    setPrompt({ text: inputText, charCount: inputText.length });
  };

  const handleStyleSelection = (style: string) => {
    setSelectedStyle((prev) => (prev === style ? null : style));
  };

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImages(prev => {
      if (prev.includes(imageUrl)) {
        return prev.filter(url => url !== imageUrl); 
      } else {
        return [...prev, imageUrl]; 
      }
    });
  };

  const handleOptionClick = async (option: string) => {
    if (option === 'Stop') {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        setIsGenerating(false);
        setIsLoading(false);
      }
      return;
    }

    if (selectedImages.length === 0) {
      toast.error(`Cannot ${option} without a selected image`);
      return;
    }

    if (option === 'Freestyle' && !selectedStyle) {
      toast.error('Please select a single Freestyle option before applying the effect.');
      return;
    }
  
    setIsLoading(true);
    setError(null);
    setIsProcessing(true);
  
    setGeneratedImages([]);
    setSelectedImages([]);
    setEnhancedImage(null);
  
    try {
      let result;
      const selectedImage = selectedImages[0];
      
      if (typeof selectedImage !== 'string') {
        throw new Error('Selected image is not in the correct format');
      }

      switch (option) {
        case 'Pixart':
          result = await applyPixart(selectedImage, prompt.text, temperature);
          break;
        case 'Regenerate':
          await handleGenerate();
          setIsProcessing(false);
          return;
        case 'ControlNet':
          result = await applyControlNet(selectedImage, prompt.text, temperature);
          break;
        case 'Upscale':
          result = await applyUpscaler(selectedImage, prompt.text, temperature, [1024, 1024]);
          break;
        case 'Freestyle':
          if (!selectedStyle) {
            throw new Error('No style selected for Freestyle');
          }
          result = await applyFreestyle(selectedImage, prompt.text, 5, selectedStyle);
          break;
        default:
          throw new Error(`Unknown option: ${option}`);
      }

      if (result && result.images && Array.isArray(result.images) && result.images.length > 0) {
        setGeneratedImages(result.images);
        toast.success(`${option} applied successfully!`);
      } else {
        throw new Error('No images returned from the server');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Failed to apply ${option}: ${error.message}`);
      } else {
        toast.error(`Failed to apply ${option}. Please try again.`);
      }
    } finally {
      setIsLoading(false);
      setIsProcessing(false);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.text.trim()) {
      toast.error("Please enter a prompt before generating images.");
      return;
    }
  
    setIsLoading(true);
    setIsGenerating(true);
    setEnhancedImage(null);
    setSelectedImages([]);
  
    abortControllerRef.current = new AbortController();
    
    try {
      console.log('Sending request to generate images...');
      console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
      console.log('Full request data:', {
        prompt,
        numImages,
        resolution,
        temperature,
        inferenceSteps
      });
  
      const fullPrompt = selectedStyle
        ? `${prompt.text} in ${selectedStyle} style`
        : prompt.text;
      const response = await generateImages(
        fullPrompt,
        numImages,
        resolution,
        temperature,
        inferenceSteps,
        abortControllerRef.current.signal
      );
  
      console.log('API Response:', response);
  
      if (response && Array.isArray(response.images)) {
        setGeneratedImages(response.images);
        toast.success("Images generated successfully!");
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error: unknown) {
      if (axios.isCancel(error)) {
        toast.info('Image generation stopped');
      } else {
        toast.error(error instanceof Error ? error.message : 'An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
      setIsGenerating(false);
      abortControllerRef.current = null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <BlurFade>
        <div className="flex flex-col items-center py-10">
          <div className="lg:w-2/3 bg-gradient-to-r  from-violet-500 to-slate-800 bg-clip-text text-transparent   lg:my-16">
            <h1 className="text-6xl mb-4 ">PHiLIP</h1>
            <h2 className="text-xl mb-4 ">
              {' '}
              Empowering Creativity Through AI-Generated Imagery
            </h2>
          </div>
          <div>
            <InfoSection />
          </div>
          <div>
            <FeatureSection />
          </div>
          <div>
            <StorySection />
          </div>
          <div>
            <TechSection />
          </div>

          <div className="mt-20 text-3xl font-semibold">
            <h1>Try PHiLIP</h1>
          </div>
          <div>
            <ArtStylesButtons />
          </div>
        </div>
      </BlurFade>

      <main className="flex-grow flex">
        {/* Left side: Controls and Styles */}
        <div className="w-1/2 p-6 overflow-y-auto" style={{ height: 'calc(100vh - 200px)' }}>
          <BlurFade className="mb-6">
            <Input
              value={prompt.text}
              onChange={handlePromptChange}
              placeholder="Enter your image prompt (max 300 characters)"
              className="w-full mb-4"
              maxLength={300}
            />
            <p className="text-sm text-gray-500 text-right">
                {prompt.charCount}/300
            </p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">
                  Number of Images
                </label>
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
                <label className="mb-1 text-sm font-semibold">
                  Temperature
                </label>
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
                <label className="mb-1 text-sm font-semibold">
                  Inference Steps
                </label>
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
            <Button 
              onClick={handleGenerate} 
              className="w-full mb-6" 
              disabled={isLoading || prompt.text.trim().length === 0}
            >
              {isLoading ? 'Generating...' : 'Generate Images'}
            </Button>
            {error && <p className="text-red-500 mb-4">{error}</p>}
          </BlurFade>

          <div className="overflow-y-auto">
            <StyleSelector
              artStyles={artStyles}
              selectedStyle={selectedStyle}
              onStyleSelection={handleStyleSelection}
            />
          </div>
        </div>

        {/* Right side: Generated Image Carousel */}
        <ImageCarousel
          generatedImages={generatedImages}
          selectedImages={selectedImages}
          onImageSelect={handleImageSelect}
          resolution={resolution}
        />
      </main>
      
      {/* Options Bar */}
      <BlurFade>
        <div className="relative">
          <OptionsBar
            isEnabled={selectedImages.length > 0 && !isLoading}
            onOptionClick={handleOptionClick}
          />
        </div>
      </BlurFade>
      
      <BlurFade>
        <div>
          <WorkSection />
        </div>
        <div className="py-10">
          <TeamSection />
        </div>
      </BlurFade>
      
      {alertInfo.show && (
        <BlurFade>
          <Alert 
            variant="destructive" 
            className="fixed bottom-24 left-1/2 transform -translate-x-1/2 w-auto z-50"
          >
            <AlertTitle>Action Required</AlertTitle>
            <AlertDescription>{alertInfo.message}</AlertDescription>
          </Alert>
        </BlurFade>
      )}
      
      <footer className="py-4 text-center text-sm text-muted-foreground">
        © 2024 PHiLIP. All rights reserved.
      </footer>
    </div>
  );
}
