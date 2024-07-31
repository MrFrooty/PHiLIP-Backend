import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';

interface Feature {
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    title: 'Text-to-Image Generation',
    description:
      'Seamlessly transform your textual descriptions into vivid, initial low-resolution images that capture your vision.',
  },
  {
    title: 'Adaptive Image Enhancement',
    description:
      'Apply a variety of styles and progressively improve image quality through targeted refinement, ensuring each detail aligns with your preferences.',
  },
  {
    title: 'User-Guided Creation',
    description:
      'Engage in an iterative refinement process where your feedback directly influences the AI, resulting in images that precisely match your expectations.',
  },
  {
    title: 'Dynamic Model Management',
    description:
      'Efficiently manage and switch between AI models, leveraging the best-suited algorithms for each stage of image creation to optimize performance and outcomes.',
  },
];

const FeaturesSection: React.FC = () => {
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // Simulate a delay for the fade-in effect
    const timer = setTimeout(() => {
      setHasLoaded(true);
    }, 100); // Adjust delay as needed
    return () => clearTimeout(timer);
  }, []);

  const renderFeatureCard = (feature: Feature, index: number) => (
    <Card
      key={index}
      className={`shadow-md border-0 flex-1 p-3 transition-all duration-500 ${
        hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <CardHeader>
        <CardTitle className="text-2xl bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent font-bold">
          {feature.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm">
          {feature.description}
        </CardDescription>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-6xl flex gap-x-4">
        {features.map((feature, index) => renderFeatureCard(feature, index))}
      </div>
    </div>
  );
};

export default FeaturesSection;
