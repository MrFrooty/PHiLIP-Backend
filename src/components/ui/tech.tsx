import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';

const TechSection: React.FC = () => {
  const techItems = [
    {
      title: 'AMD Instinct MI210',
      description:
        'Powerful GPU designed for advanced AI workloads, providing the backbone for our project’s computational needs.',
    },
    {
      title: 'AMD Radeon Pro W7900',
      description:
        'High-performance graphics card ensuring smooth and efficient processing for image generation and enhancement tasks.',
    },
    {
      title: 'PyTorch 2.0',
      description:
        'A flexible deep learning framework that allows us to develop and fine-tune our machine learning models with ease.',
    },
    {
      title: 'Stable Diffusion',
      description:
        'An image generation model that produces high-quality visuals from textual descriptions, essential for our text-to-image feature.',
    },
    {
      title: 'AMD ROCm',
      description:
        'A software platform that enables our project to leverage AMD GPUs for machine learning and high-performance computing.',
    },
    {
      title: 'React',
      description:
        'A JavaScript library used to build our project’s dynamic and responsive user interface.',
    },
    {
      title: 'Python',
      description:
        'A versatile programming language that serves as the foundation for our backend and machine learning scripts.',
    },
    {
      title: 'Vercel',
      description:
        'A platform for frontend deployments, ensuring our project’s web application is fast, reliable, and scalable.',
    },
    {
      title: 'Flask',
      description:
        'A lightweight WSGI web application framework used to develop our API and manage backend processes.',
    },
  ];

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

  const renderTechCard = (
    item: { title: string; description: string },
    index: number
  ) => (
    <motion.div
      key={index}
      layout
      className="flex-none w-64 rounded-lg shadow-md border-0 overflow-hidden"
    >
      <Card className="border-0 bg-secondary h-full flex flex-col">
        <CardHeader>
          <div className="flex items-center justify-between w-full px-4">
            <CardTitle className="text-xl bg-gradient-to-r from-purple-300 to-red-100 bg-clip-text text-transparent">
              {item.title}
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
                <CardDescription className="text-sm text-accent">
                  {item.description}
                </CardDescription>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );

  return (
    <div className="flex justify-center p-4">
      <Card className="max-w-6xl w-full">
        <CardHeader>
          <CardTitle className="text-3xl">Technology and Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {techItems.map((item, index) => renderTechCard(item, index))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TechSection;
