import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  const handleToggle = (index: number) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index); // Close the card if it's already open
      } else {
        newSet.add(index); // Open the card if it's not open
      }
      return newSet;
    });
  };

  const renderFeatureCard = (feature: Feature, index: number) => (
    <motion.div
      key={index}
      layout
      className="relative shadow-md border-0 flex-1 p-3 bg-white rounded-lg overflow-hidden"
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent font-bold">
            {feature.title}
          </CardTitle>
          <button
            onClick={() => handleToggle(index)}
            className="text-primary hover:text-primary-dark transition-colors"
          >
            {expandedCards.has(index) ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
        </div>
      </CardHeader>
      <AnimatePresence>
        {expandedCards.has(index) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-4 py-2"
          >
            <CardContent>
              <CardDescription className="text-md">
                {feature.description}
              </CardDescription>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
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
