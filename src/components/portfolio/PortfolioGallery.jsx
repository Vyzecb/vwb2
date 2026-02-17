import React, { useEffect, useMemo, useState } from 'react';

const PortfolioGallery = ({ title, images, fallbackImage }) => {
  const preparedImages = useMemo(() => {
    if (images.length > 0) {
      return images;
    }

    if (fallbackImage) {
      return [
        {
          id: 'fallback-hero',
          url: fallbackImage,
          alt: title,
          is_cover: true,
          sort_order: 0,
        },
      ];
    }

    return [];
  }, [fallbackImage, images, title]);

  const [activeId, setActiveId] = useState(preparedImages[0]?.id || null);

  useEffect(() => {
    setActiveId(preparedImages[0]?.id || null);
  }, [preparedImages]);

  const activeImage = preparedImages.find((item) => item.id === activeId) || preparedImages[0];

  if (!activeImage) {
    return null;
  }

  return (
    <section className="mb-12 space-y-4">
      <div className="overflow-hidden rounded-xl border border-gray-800 bg-[#111827]">
        <img
          src={activeImage.url}
          alt={activeImage.alt || title}
          className="h-[240px] w-full object-cover sm:h-[360px] lg:h-[520px]"
          loading="eager"
        />
      </div>

      {preparedImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {preparedImages.map((item) => {
            const isActive = item.id === activeImage.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border transition sm:h-24 sm:w-24 ${
                  isActive ? 'border-[#38bdf8]' : 'border-gray-700'
                }`}
                aria-label={`Bekijk afbeelding ${item.alt || title}`}
              >
                <img
                  src={item.url}
                  alt={item.alt || title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default PortfolioGallery;
