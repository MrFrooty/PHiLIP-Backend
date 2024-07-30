'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [style, setStyle] = useState(50)

  const handleGenerate = async () => {
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, style }),
      });
      const data = await response.json();
      setGeneratedImage(data.imageUrl);
    } catch (error) {
      console.error('Failed to generate image:', error);
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
                  <label className="block mb-2">Style Intensity</label>
                  <Slider
                    value={[style]}
                    onValueChange={(value) => setStyle(value[0])}
                    max={100}
                    step={1}
                  />
                </div>
                <Button onClick={handleGenerate} className="w-full">
                  Generate Image
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-2/3 p-6 flex flex-col">
          <div className="flex-grow">
            {generatedImage ? (
              <img src={generatedImage} alt="Generated" className="max-w-full max-h-full object-contain" />
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Generated image will appear here
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