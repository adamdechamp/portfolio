'use client';

import { useState } from 'react';

export default function MouseComponent() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div onMouseMove={handleMouseMove} className='absolute h-lvh w-screen'>
      Mouse Position: {position.x}, {position.y}
    </div>
    
  );
}