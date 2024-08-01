import React from 'react';
import BlurFade from '@/components/ui/blur-fade';

const Header: React.FC = () => {
  return (
    <BlurFade>
      <div className="flex flex-col items-center py-10">
        <div className="lg:w-2/3 bg-gradient-to-r from-violet-500 to-slate-800 bg-clip-text text-transparent lg:my-16">
          <h1 className="text-6xl font mb-4">PHiLIP</h1>
          <h2 className="text-3xl text-gray-950 mb-4">
            Empowering Creativity Through AI-Generated Imagery
          </h2>
        </div>
      </div>
    </BlurFade>
  );
};

export default Header;