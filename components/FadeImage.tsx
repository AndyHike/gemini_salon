import React, { useState } from 'react';

interface FadeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  containerClassName?: string;
}

export const FadeImage: React.FC<FadeImageProps> = ({ 
  src, 
  alt, 
  className = "", 
  containerClassName = "",
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-stone-100 ${containerClassName}`}>
      {/* Skeleton / Placeholder (pulses while loading) */}
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-stone-200 z-0" />
      )}

      {/* Actual Image */}
      <img
        src={src}
        alt={alt}
        className={`transition-all duration-700 ease-in-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
        {...props}
      />
    </div>
  );
};