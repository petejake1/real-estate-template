// src/data/properties.js
const SPARK_ENDPOINT = 'https://replication.sparkapi.com';
const API_KEY = 'YOUR_SPARK_API_KEY_HERE';   // ← Put your replication key here

export async function getProperties(limit = 12) {
  try {
    const response = await fetch(
      `${SPARK_ENDPOINT}/v1/listings?_limit=${limit}&_orderby=ModificationTimestamp desc`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,   // Most IDX keys use Bearer
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 }   // Cache 1 hour (good for homepage)
      }
    );

    if (!response.ok) throw new Error('Spark fetch failed');

    const data = await response.json();
    
    // Map Spark data to your template's expected format
    return data.map(listing => ({
      id: listing.ListingKey,
      title: listing.UnparsedAddress || 'No Address',
      price: listing.ListPrice ? `$${listing.ListPrice.toLocaleString()}` : 'Call for Price',
      image: listing.Media?.[0]?.MediaURL || '/Image/default-property.jpg',  // Use first photo
      bedrooms: listing.BedroomsTotal || 0,
      bathrooms: listing.BathroomsTotal || 0,
      sqft: listing.LivingArea || 0,
      location: listing.City || 'Minnesota',
      type: listing.PropertyType || 'Residential',
      // Add more fields your cards use
    }));

  } catch (error) {
    console.error('Spark API error:', error);
    return [];   // Fallback to empty
  }
}

// For static export or build-time (if needed)
export const staticProperties = [];   // Keep empty or old data
