import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface WorkCard {
  title: string;
  description: string;
}

const workCards: WorkCard[] = [
  {
    title: 'Project Alpha',
    description:
      'An innovative project focused on leveraging AI to optimize user experience and engagement.',
  },
  {
    title: 'Project Beta',
    description:
      'A cutting-edge initiative aimed at improving data analytics and visualization tools.',
  },
  {
    title: 'Project Gamma',
    description:
      'A collaborative effort to develop new solutions for real-time data processing and machine learning.',
  },
  {
    title: 'Project Delta',
    description:
      'A groundbreaking project that explores the integration of AI in creative and artistic fields.',
  },
];

const WorkSection: React.FC = () => {
  return (
    <div className="flex justify-center p-4">
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
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">
                      {card.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{card.description}</CardDescription>
                  </CardContent>
                  <CardFooter>{/* Optional footer content */}</CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkSection;
