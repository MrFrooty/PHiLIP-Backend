import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const InfoSection: React.FC = () => {
  return (
    <div className="flex justify-center p-4">
      <Card className="border w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">About PHiLIP</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-md mb-6 text-muted-foreground">
            PHiLIP: Personalized Human in Loop Image Production aims to address
            the inefficiencies of high-quality image generation from
            text-to-image AI. By employing an iterative approach, PHiLIP first
            generates low-resolution images based on user text prompts, allowing
            users to select their preferred options and provide feedback. This
            feedback guides the AI in refining the images through multiple
            rounds, gradually enhancing the resolution and quality to align
            closely with user expectations. This process optimizes computational
            resources by focusing on user preferences, offering a more precise
            and efficient image creation experience. The system utilizes AMD
            Instinct MI210 or AMD Radeon Pro W7900 hardware, with software tools
            including PyTorch 2.0, Stable Diffusion, and AMD ROCm. The frontend
            is built with React, backend with Python and deployed through Vercel
            and Flask.
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default InfoSection;
