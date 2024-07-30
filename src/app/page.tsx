'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [numImages, setNumImages] = useState(1)
  const [resolution, setResolution] = useState(512)
  const [temperature, setTemperature] = useState(1.0)
  const [inferenceSteps, setInferenceSteps] = useState(50)

  const handleGenerate = async () => {
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, numImages, resolution, temperature, inferenceSteps }),
      });
      const data = await response.json();
      setGeneratedImages(data.images);
    } catch (error) {
      console.error('Failed to generate images:', error);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex">
        <div className="w-1/3 p-6 border-r">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Image Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2">Prompt</label>
                  <Input
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your image prompt"
                  />
                </div>
                <div>
                  <label className="block mb-2">Number of Images</label>
                  <Select onValueChange={(value) => setNumImages(Number(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select number of images" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4].map(num => (
                        <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block mb-2">Resolution</label>
                  <Select onValueChange={(value) => setResolution(Number(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select resolution" />
                    </SelectTrigger>
                    <SelectContent>
                      {[256, 512, 768, 1024].map(res => (
                        <SelectItem key={res} value={res.toString()}>{res}x{res}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block mb-2">Temperature: {temperature}</label>
                  <Slider
                    value={[temperature]}
                    onValueChange={(value) => setTemperature(value[0])}
                    max={2}
                    step={0.1}
                  />
                </div>
                <div>
                  <label className="block mb-2">Inference Steps: {inferenceSteps}</label>
                  <Slider
                    value={[inferenceSteps]}
                    onValueChange={(value) => setInferenceSteps(value[0])}
                    max={100}
                    step={1}
                  />
                </div>
                <Button onClick={handleGenerate} className="w-full">
                  Generate Images
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-2/3 p-6 flex flex-col">
          <div className="flex-grow grid grid-cols-2 gap-4">
            {generatedImages.map((image, index) => (
              <img key={index} src={image} alt={`Generated ${index + 1}`} className="max-w-full max-h-full object-contain" />
            ))}
            {generatedImages.length === 0 && (
              <div className="col-span-2 h-full flex items-center justify-center text-muted-foreground">
                Generated images will appear here
              </div>
            )}
          </div>
          <div className="mt-4 flex justify-center space-x-4">
            <Button variant="outline">Continue</Button>
            <Button variant="outline">Regenerate</Button>
          </div>
        </div>
      </main>

      <footer className="py-4 text-center text-sm text-muted-foreground">
        © 2024 PHiLIP Image Generator. All rights reserved.
      </footer>
    </div>
  )
}