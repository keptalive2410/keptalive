'use client';

import Link from 'next/link';

const editorialCards = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
    title: 'LOOKBOOK',
    description: 'Discover our latest Spring \'26 collection in the heart of Santorini, where timeless elegance meets modern sophistication.',
    link: '/lookbook',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=800&q=80',
    title: 'JOURNAL',
    description: 'Take a look behind the scenes at Isabella. From concept to creation and everything in between.',
    link: '/Journal',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80',
    title: 'WHO WE ARE',
    description: 'Learn more about our journey, our dreams and aspirations.',
    link: '/about',
  },
];

export default function EditorialSection() {
  return (
    <section className="pt-16 pb-2 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {editorialCards.map((card) => (
            <Link
              key={card.id}
              href={card.link}
              className="group cursor-pointer"
            >
              {/* Image */}
              <div className="relative aspect-4/5 mb-6 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('${card.image}')`,
                  }}
                />
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-serif mb-3 text-center text-gray-900">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-sm md:text-base text-gray-700 text-center leading-relaxed px-2">
                {card.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}