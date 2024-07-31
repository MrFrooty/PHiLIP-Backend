import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const StorySection: React.FC = () => {
  const missionPoints = [
    'Bridge the divide between complex AI models and user-friendly applications.',
    'Empower artists, designers, and content creators with AI-assisted tools.',
    "Explore the potential of AMD's cloud infrastructure and Instinct MI210 GPUs in AI applications.",
    'Create a platform for collaborative learning and innovation in AI.',
  ];

  return (
    <div className="flex justify-center p-4">
      <Card className="max-w-6xl">
        <CardHeader>
          <CardTitle className="text-3xl">Our Mission</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            <p className="text-lg">
              We are a team of PhD machine learning researchers, computer and
              data science undergraduates, and AI enthusiasts united with a
              common purpose to bridge the gap between advanced AI capabilities
              and accessible tools for creatives.
            </p>

            <div className="mt-4 flex flex-wrap gap-4 text-lg">
              {missionPoints.map((point, index) => (
                <div key={index} className=" p-4 flex-1 min-w-[200px]">
                  <span className=" text-primary font-bold mr-2">{`0${index + 1}.`}</span>
                  {point}
                </div>
              ))}
            </div>
          </CardDescription>
        </CardContent>
        <CardFooter>
          {/* You can add any footer content here if needed */}
        </CardFooter>
      </Card>
    </div>
  );
};

export default StorySection;
