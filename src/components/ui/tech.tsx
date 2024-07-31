import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

const TechSection: React.FC = () => {
  const techItems = [
    { title: 'AMD Instinct MI210' },
    { title: 'AMD Radeon Pro W7900' },
    { title: 'PyTorch 2.0' },
    { title: 'Stable Diffusion' },
    { title: 'AMD ROCm' },
    { title: 'React' },
    { title: 'Python' },
    { title: 'Vercel' },
    { title: 'Flask' },
  ];

  return (
    <div>
      <Card className="border-0 max-w-6xl">
        <CardHeader>
          <CardTitle className="text-3xl">Technology and Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center p-4">
            <div className="w-full max-w-6xl flex flex-wrap gap-4 justify-center">
              {techItems.map((item, index) => (
                <Card
                  key={index}
                  className="bg-secondary border-0 flex items-center justify-center w-[calc(20%-1rem)] max-w-[300px] min-w-[200px]"
                >
                  <CardHeader className="flex items-center justify-center w-full h-full">
                    <CardTitle className=" bg-gradient-to-r from-purple-300 to-red-100 bg-clip-text text-transparent text-md text-center">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TechSection;
