import React from 'react';
import { Image } from 'cloudinary-react';

interface CloudinaryImageProps {
  cloudinaryId: string;
  alt?: string;
  width?: number;
  height?: number;
  crop?: string;
  quality?: string;
  className?: string;
  onClick?: () => void;
}

export const CloudinaryImage: React.FC<CloudinaryImageProps> = ({
  cloudinaryId,
  alt = 'Vehicle image',
  width = 400,
  height = 300,
  crop = 'fill',
  quality = 'auto',
  className = '',
  onClick
}) => {
  return (
    <Image
      cloudName="dhuezbie6"
      publicId={cloudinaryId}
      width={width}
      height={height}
      crop={crop}
      quality={quality}
      alt={alt}
      className={className}
      onClick={onClick}
    />
  );
};

// Componente para thumbnail
export const CloudinaryThumbnail: React.FC<Omit<CloudinaryImageProps, 'width' | 'height'>> = (props) => {
  return (
    <CloudinaryImage
      {...props}
      width={200}
      height={150}
      crop="fill"
    />
  );
};

// Componente para imagem grande
export const CloudinaryLarge: React.FC<Omit<CloudinaryImageProps, 'width' | 'height'>> = (props) => {
  return (
    <CloudinaryImage
      {...props}
      width={800}
      height={600}
      crop="fill"
    />
  );
}; 