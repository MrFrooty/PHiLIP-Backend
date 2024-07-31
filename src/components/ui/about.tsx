import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Linkedin, ChevronDown, ChevronUp } from "lucide-react";
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
    name: "Michael Chen",
    role: "Model Engineer",
    image: "/michael-chen.jpg",
    linkedIn: "https://www.linkedin.com/in/michael-luo-chen/",
    blurb: "UCR 2nd Year.\nPersonal Interests: AI/ML, gaming, reading novels"
  },
  {
    name: "Freddy Song",
    role: "Model Engineer, Frontend Developer",
    image: "/freddy-song.jpg",
    linkedIn: "https://www.linkedin.com/in/freddy-song-428677212/",
    blurb: "UCR 2nd Year.\nPersonal Interests: AI/ML, cafe hopping, DJing"
  },
  {
    name: "Peter Lu",
    role: "Frontend Developer, Support Engineer",
    image: "/peter-lu.jpg",
    linkedIn: "https://www.linkedin.com/",
    blurb: "UCR 2nd Year.\nPersonal Interests: K-Pop, travel"
  },
  {
    name: "Xianghao Kong",
    role: "AI Model Advisor",
    image: "/xianghao-kong.jpg",
    linkedIn: "https://www.linkedin.com/in/xianghao-theo-k-5ba559172/",
    blurb: "UCR PhD.\nPersonal Interests: GenAI, sketching, museum goer"
  },
  {
    name: "Ratnodeep Bandyopadhyay",
    role: "General Advisor",
    image: "/ratnodeep-bandyopadhyay.jpg",
    linkedIn: "https://www.linkedin.com/",
    blurb: "UCR PhD.\nPersonal Interests: hiking, camping, tea"
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
        <Link href={engineer.linkedIn} target="_blank" rel="noopener noreferrer" className="group relative">
          <Avatar className="h-12 w-12 transition-transform group-hover:scale-105">
            <AvatarImage src={engineer.image} alt={engineer.name} />
            <AvatarFallback>{engineer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <Linkedin className="h-6 w-6 text-white" />
          </div>
        </Link>
        <div className="flex-grow">
          <p className="text-sm font-medium leading-none">{engineer.name}</p>
          <p className="text-sm text-muted-foreground">{engineer.role}</p>
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
            <p className="text-sm text-muted-foreground whitespace-pre-wrap break-words">{engineer.blurb}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <Card className="w-full max-w-7xl mx-auto my-8">
      <CardHeader>
        <CardTitle>About PHiLIP</CardTitle>
        <CardDescription>Empowering creativity through AI-generated imagery</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-6 text-muted-foreground">
          PHiLIP: Personalized Human in Loop Image Production aims to address the inefficiencies of high-quality image generation from text-to-image AI. By employing an iterative approach, PHiLIP first generates low-resolution images based on user text prompts, allowing users to select their preferred options and provide feedback. This feedback guides the AI in refining the images through multiple rounds, gradually enhancing the resolution and quality to align closely with user expectations. This process optimizes computational resources by focusing on user preferences, offering a more precise and efficient image creation experience. The system utilizes AMD Instinct MI210 or AMD Radeon Pro W7900 hardware, with software tools including PyTorch 2.0, Stable Diffusion, and AMD ROCm. The frontend is built with React, backend with Python and deployed through Vercel and Flask.
        </p>
        <h3 className="text-xl font-semibold mb-4">Meet the Team</h3>
        <div className="flex flex-col space-y-4">
          <div className="flex space-x-4">
            {engineers.slice(0, 3).map((engineer, index) => renderEngineerCard(engineer, index))}
          </div>
          <div className="flex space-x-4">
            {engineers.slice(3).map((engineer, index) => renderEngineerCard(engineer, index + 3))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutMeSection;