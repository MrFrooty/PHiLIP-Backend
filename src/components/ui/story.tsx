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
  return (
    <div className="flex justify-center p-4">
      <Card className="max-w-6xl">
        <CardHeader>
          <CardTitle className="text-3xl">Our Story</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-xl">
            <p>
              We are a team of PhD students, undergraduates, and AI enthusiasts
              united to bridge the gap between advanced AI capabilities and
              accessible tools for creatives.
            </p>
            <h2 className="text-2xl font-bold mt-4">Our Mission:</h2>
            <ol className="list-decimal list-inside mt-4 space-y-2">
              <li>
                Bridge the divide between complex AI models and user-friendly
                applications.
              </li>
              <li>
                Empower artists, designers, and content creators with
                AI-assisted tools.
              </li>
              <li>
                Explore the potential of AMD&apos;s cloud infrastructure and
                Instinct MI210 GPUs in AI applications.
              </li>
              <li>
                Create a platform for collaborative learning and innovation in
                AI.
              </li>
            </ol>
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
