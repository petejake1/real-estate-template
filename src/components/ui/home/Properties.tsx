'use client';

import React, { useRef } from 'react';

export default function Properties({ properties = [] }) {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  // ← Put ALL your existing code from the original Properties.tsx here
  // (the carousel, cards, mapping, etc.)
  // Just make sure the map uses the passed 'properties' instead of any static array

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Featured Properties</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.length > 0 ? (
            properties.map((property) => (
              <div key={property.id} className="bg-white rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-2">{property.title}</h3>
                  <p className="text-2xl font-bold text-green-600 mb-4">{property.price}</p>
                  
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{property.bedrooms} Beds</span>
                    <span>{property.bathrooms} Baths</span>
                    <span>{property.sqft} Sqft</span>
                  </div>
                  
                  <p className="mt-4 text-sm text-gray-500">{property.location}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3">No properties available right now. Check back soon.</p>
          )}
        </div>
      </div>
    </section>
  );
}
