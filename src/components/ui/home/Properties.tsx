'use client';

import React, { useRef } from 'react';

interface Property {
  id: string | number;
  title: string;
  price: string;
  image: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  location: string;
  type?: string;
}

export default function Properties({ properties = [] }: { properties: Property[] }) {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  // Keep your original carousel / slider code here if the template has one.
  // For now, this simple grid works and avoids type errors.

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Featured Properties from Spark API</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.length > 0 ? (
            properties.map((property) => (
              <div key={property.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-64 object-cover"
                  onError={(e) => { e.currentTarget.src = '/images/default-property.jpg'; }}
                />
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-2 line-clamp-2">{property.title}</h3>
                  <p className="text-2xl font-bold text-green-600 mb-4">{property.price}</p>
                  
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span>{property.bedrooms} Beds</span>
                    <span>{property.bathrooms} Baths</span>
                    <span>{property.sqft} Sqft</span>
                  </div>
                  
                  <p className="text-sm text-gray-500">{property.location}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3 py-12 text-gray-500">
              No properties loaded yet. Check your Spark API key and try again.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
