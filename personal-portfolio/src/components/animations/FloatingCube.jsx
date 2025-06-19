import React from 'react';

// CSS-based floating shapes component

const FloatingShape = ({ 
  position, 
  shape = 'cube', 
  color = '#00ff00', 
  size = '60px',
  delay = 0,
  duration = 3
}) => {
  const shapeStyles = {
    cube: {
      width: size,
      height: size,
      background: `linear-gradient(45deg, ${color}40, ${color}80)`,
      border: `2px solid ${color}`,
      transform: 'rotateX(45deg) rotateY(45deg)',
      borderRadius: '8px',
    },
    sphere: {
      width: size,
      height: size,
      background: `radial-gradient(circle at 30% 30%, ${color}80, ${color}20)`,
      border: `2px solid ${color}`,
      borderRadius: '50%',
    },
    triangle: {
      width: 0,
      height: 0,
      borderLeft: `${parseInt(size)/2}px solid transparent`,
      borderRight: `${parseInt(size)/2}px solid transparent`,
      borderBottom: `${size} solid ${color}80`,
      filter: `drop-shadow(0 0 10px ${color})`,
    },
    diamond: {
      width: size,
      height: size,
      background: `linear-gradient(45deg, ${color}60, ${color}20)`,
      border: `2px solid ${color}`,
      transform: 'rotate(45deg)',
      borderRadius: '4px',
    }
  };

  return (
    <div
      className="absolute animate-float opacity-70 hover:opacity-100 transition-opacity duration-300"
      style={{
        left: position.x,
        top: position.y,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        filter: `drop-shadow(0 0 20px ${color}50)`,
      }}
    >
      <div
        className="animate-spin-slow hover:animate-spin-fast transition-all duration-500"
        style={{
          ...shapeStyles[shape],
          animationDelay: `${delay * 0.5}s`,
        }}
      />
    </div>
  );
};

const FloatingCube = () => {
  const shapes = [
    { position: { x: '10%', y: '20%' }, shape: 'cube', color: '#00ff00', delay: 0, duration: 4 },
    { position: { x: '80%', y: '60%' }, shape: 'sphere', color: '#00d4ff', delay: 1, duration: 3 },
    { position: { x: '50%', y: '10%' }, shape: 'diamond', color: '#8b5cf6', delay: 2, duration: 5 },
    { position: { x: '20%', y: '70%' }, shape: 'triangle', color: '#ff6b35', delay: 0.5, duration: 3.5 },
    { position: { x: '70%', y: '30%' }, shape: 'cube', color: '#00ff00', delay: 1.5, duration: 4.5 },
    { position: { x: '30%', y: '80%' }, shape: 'sphere', color: '#8b5cf6', delay: 2.5, duration: 3 },
  ];

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {shapes.map((shape, index) => (
        <FloatingShape
          key={index}
          position={shape.position}
          shape={shape.shape}
          color={shape.color}
          delay={shape.delay}
          duration={shape.duration}
          size={index % 2 === 0 ? '50px' : '70px'}
        />
      ))}
    </div>
  );
};

export default FloatingCube;
