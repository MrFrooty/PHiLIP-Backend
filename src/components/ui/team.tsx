import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Linkedin, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface Engineer {
  name: string;
  role: string;
  image: string;
  linkedIn: string;
  blurb: string;
}

const engineers: Engineer[] = [
  {
    name: 'Michael Chen',
    role: 'Model Engineer, Backend Dev',
    image: '/michael-chen.jpg',
    linkedIn: 'https://www.linkedin.com/in/michael-luo-chen/',
    blurb: 'UCR 2nd Year.\nPersonal Interests: AI/ML, gaming, reading novels',
  },
  {
    name: 'Freddy Song',
    role: 'Model Engineer, Backend Dev',
    image: '/freddy-song.jpg',
    linkedIn: 'https://www.linkedin.com/in/freddy-song-428677212/',
    blurb: 'UCR 2nd Year.\nPersonal Interests: AI/ML, cafe hopping, DJing',
  },
  {
    name: 'Peter Lu',
    role: 'Support Engineer, Full-stack Dev',
    image: '/peter-lu.jpg',
    linkedIn: 'https://www.linkedin.com/in/peter-lu1/',
    blurb: 'UCR 3rd Year.\nPersonal Interests:AI/ML, K-Pop, travel',
  },
  {
    name: 'Xianghao Kong',
    role: 'AI Model Advisor',
    image: '/xianghao-kong.jpg',
    linkedIn: 'https://www.linkedin.com/in/xianghao-theo-k-5ba559172/',
    blurb: 'UCR PhD.\nPersonal Interests: GenAI, sketching, museum goer',
  },
  {
    name: 'Ratnodeep Bandyopadhyay',
    role: 'General Advisor',
    image: '/ratnodeep-bandyopadhyay.jpg',
    linkedIn: 'https://www.linkedin.com/',
    blurb: 'UCR PhD.\nPersonal Interests: hiking, camping, tea',
  },
];

const AboutMeSection: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const renderEngineerCard = (engineer: Engineer, index: number) => (
    <motion.div
      key={index}
      layout
      className="flex-1 bg-secondary rounded-lg overflow-hidden min-w-[240px]"
    >
      <div className="flex items-center space-x-4 p-4">
        <Link
          href={engineer.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative"
        >
          <Avatar className="h-12 w-12 transition-transform group-hover:scale-105">
            <AvatarImage src={engineer.image} alt={engineer.name} />
            <AvatarFallback>
              {engineer.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <Linkedin className="h-6 w-6 text-white" />
          </div>
        </Link>
        <div className="flex-grow">
          <p className="text-lg font-bold leading-none">{engineer.name}</p>
          <p className="text-md text-muted-foreground">{engineer.role}</p>
        </div>
        <button
          onClick={() => toggleExpand(index)}
          className="text-primary hover:text-primary-dark transition-colors"
        >
          {expandedCard === index ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
      </div>
      <AnimatePresence>
        {expandedCard === index && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-4 pb-4"
          >
            <p className="text-sm text-muted-foreground whitespace-pre-wrap break-words">
              {engineer.blurb}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <div className="flex justify-center p-4">
      <Card className="border w-full max-w-6xl">
        <CardHeader>
          <CardTitle className="text-3xl">Meet the Team</CardTitle>
          <CardDescription className="text-md">
            Engineered with ❤️ from the University of California Riverside.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {engineers
              .slice(0, 3)
              .map((engineer, index) => renderEngineerCard(engineer, index))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-4">
            {engineers
              .slice(3)
              .map((engineer, index) =>
                renderEngineerCard(engineer, index + 3)
              )}
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-muted-foreground">
            Powered by cutting-edge AI technology and human creativity.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AboutMeSection;
