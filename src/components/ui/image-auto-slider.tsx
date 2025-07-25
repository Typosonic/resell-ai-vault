
import React, { memo } from 'react';

const ImageAutoSlider = memo(() => {
  // Images for the infinite scroll - using the uploaded dashboard screenshots
  const images = [
    "/lovable-uploads/438e96b7-068f-4f0d-ad3a-30a745df783f.png",
    "/lovable-uploads/e13e16bd-8985-4f88-b176-09af5e053edb.png",
    "/lovable-uploads/1fd44daa-dffd-44f3-8ee3-af143e104b37.png",
    "/lovable-uploads/00211678-21f9-4b33-863a-758ddd26b723.png",
    "/lovable-uploads/6132de0f-071e-4782-a886-b395240bfe7d.png",
    "/lovable-uploads/bc9194d8-2845-4aa9-bf1f-9bb8da0ef62f.png"
  ];

  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images];

  return (
    <>
      <style>{`
        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .infinite-scroll {
          animation: scroll-right 20s linear infinite;
        }

        .scroll-container {
          mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }

        .image-item {
          transition: transform 0.3s ease, filter 0.3s ease;
        }

        .image-item:hover {
          transform: scale(1.05);
          filter: brightness(1.1);
        }
      `}</style>
      
      <div className="w-full h-96 bg-background relative overflow-hidden flex items-center justify-center">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background z-0" />
        
        {/* Scrolling images container */}
        <div className="relative z-10 w-full flex items-center justify-center py-8">
          <div className="scroll-container w-full max-w-6xl">
            <div className="infinite-scroll flex gap-6 w-max">
              {duplicatedImages.map((image, index) => (
                <div
                  key={index}
                  className="image-item flex-shrink-0 w-72 h-48 md:w-80 md:h-52 lg:w-96 lg:h-60 rounded-xl overflow-hidden shadow-2xl"
                >
                  <img
                    src={image}
                    alt={`Dashboard screenshot ${(index % images.length) + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-20" />
      </div>
    </>
  );
});

ImageAutoSlider.displayName = 'ImageAutoSlider';

export { ImageAutoSlider as Component };
