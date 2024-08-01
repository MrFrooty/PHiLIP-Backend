import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface WorkCard {
  title: string;
  description: string;
  image: string;
  width: number;
  height: number;
}

const workCards: WorkCard[] = [
  {
    title: 'Data Flow',
    description:
      'The Data Flow Diagram illustrates how information moves through Project Phillip. It shows the path from user input (text prompts or uploaded images) through various processing modules to the final output. This diagram is particularly useful for understanding the system overall workflow and identifying potential bottlenecks or areas for optimization.',
    image: '/media/data_flow.png',
    width: 800,
    height: 600,
  },
  {
    title: 'Architecture',
    description:
      'The Architecture Diagram offers a high-level view of Project Phillips entire system. It shows how different modules interact, including the API server, various AI models, and the underlying infrastructure. This diagram is crucial for understanding the systems overall structure and how it leverages AMDs cloud infrastructure and GPUs.',
    image: '/media/architecture.png',
    width: 800,
    height: 600,
  },
  {
    title: 'Sequencing',
    description:
      'The Sequence Diagram details the step-by-step process of generating an image in Project Phillip. It illustrates the interactions between different system components over time, including the optional refinement step. This diagram is particularly useful for understanding the temporal aspects of the systems operation and the flow of control between different modules.',
    image: '/media/image_gen_sequence.png',
    width: 800,
    height: 600,
  },
  {
    title: 'UML',
    description:
      'The UML Class Diagram provides a structural view of Project Phillips main components. It shows the key classes in the system, their relationships, and some of their main methods. This diagram is valuable for developers to understand the systems architecture and how different parts of the code interact with each other.',
    image: '/media/uml.png',
    width: 800,
    height: 600,
  },
];

const WorkSection: React.FC = () => {
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  const handleToggle = (index: number) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index); 
      } else {
        newSet.add(index); 
      }
      return newSet;
    });
  };

  return (
    <div className="flex justify-center p-4 mt-4">
      <Card className="border w-full max-w-6xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">About Our Work</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="pb-6 text-muted-foreground">
            We started as a diverse group with varying levels of AI experience,
            united by our fascination with the potential of AI in creative
            fields. The journey from concept to a working prototype was filled
            with challenges: Initially struggling with cloud configurations and
            GPU optimizations. Overcoming the steep learning curve of advanced
            AI models. Iterating countless times to improve image quality and
            generation speed. Our breakthrough moment came when we successfully
            generated our first coherent image from a text prompt. From there,
            we rapidly iterated, adding features and refining our models Today,
            Project Phillip stands as a testament to collaborative learning and
            innovation. It represents not just a tool, but a stepping stone
            towards more accessible and powerful AI-assisted creativity.
          </div>
          <div className="text-3xl py-4 font-bold">Project Schematics</div>
          <div className="grid grid-cols-2 gap-4">
            {workCards.map((card, index) => (
              <motion.div
                key={index}
                layout
                className="relative shadow-md border-0 flex-1 p-3 bg-white rounded-lg overflow-hidden"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                      {card.title}
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
                        <Image
                          src={card.image}
                          alt={card.title}
                          width={card.width}
                          height={card.height}
                          className="w-full h-full object-contain" // Changed to object-contain
                        />
                        <CardDescription className="pt-4">
                          {card.description}
                        </CardDescription>
                      </CardContent>
                      <CardFooter>{/* Optional footer content */}</CardFooter>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkSection;
