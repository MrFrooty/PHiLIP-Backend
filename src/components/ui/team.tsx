import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
const teamMembers = [
  {
    name: 'Michael Chen',
    grade: 'B.S. Computer Science',
    role: 'Backend, Model Engineer',
    hobbies: 'gaming and reading novels',
  },
  {
    name: 'Freddy Song',
    grade: 'B.S. Computer Science',
    role: 'Backend, Model Engineer',
    hobbies: 'cafe hopping and DJing',
  },
  {
    name: 'Peter Lu',
    grade: 'B.S. Data Science & Business',
    role: 'Frontend, Support Engineer',
    hobbies: 'k-pop listening and travel',
  },
  {
    name: 'Xianghao Kong',
    grade: 'PhD Computer Science',
    role: 'General Advisor',
    hobbies: 'sketching and museum goer',
  },
  {
    name: 'Ratnodeep Bandyopadhyay',
    grade: 'PhD Computer Science',
    role: 'General Advisor',
    hobbies: 'hiking, camping, tea',
  },
];

const TeamSection: React.FC = () => {
  return (
    <div>
      <h1 className=" text-3xl">Meet the Team</h1>
      <h3 className="pb-10">From the University of California Riverside</h3>
      <div className="flex flex-row flex-wrap justify-left gap-6 w-full">
        {teamMembers.map((member, index) => (
          <div key={index} className="shadow-lg w-80">
            <Card className="bg-gray-50 h-full">
              <CardHeader>
                <CardTitle className="pb-1 bg-gradient-to-r from-purple-500 to-violet-300 bg-clip-text text-transparent">
                  {member.name}
                </CardTitle>
                <CardDescription>{member.grade}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-semibold ">{member.role}</p>
              </CardContent>
              <CardFooter>
                <p>Hobbies: {member.hobbies}</p>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
