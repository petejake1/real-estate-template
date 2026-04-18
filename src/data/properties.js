// src/data/properties.js
const SPARK_ENDPOINT = 'https://replication.sparkapi.com';
const API_KEY = 'd0nhp3h8ydxzl7nrut61r8j10';   // ← CHANGE THIS to your real replication key

export async function getProperties(limit = 12) {
  try {
    const response = await fetch(
      `${SPARK_ENDPOINT}/v1/listings?_limit=${limit}&_orderby=ModificationTimestamp desc`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 }   // Cache for 1 hour
      }
    );

    if (!response.ok) {
      console.error('Spark API error:', response.status);
      return [];
    }

    const data = await response.json();



return data.map(listing => ({
  id: listing.ListingKey || listing.id || Math.random().toString(36),
  title: listing.UnparsedAddress || listing.StreetNumber + ' ' + (listing.StreetName || '') || 'Property in Minnesota',
  price: listing.ListPrice ? `$${Number(listing.ListPrice).toLocaleString()}` : 'Call for Price',
  image: listing.Media?.[0]?.MediaURL || listing.Photos?.[0]?.MediaURL || '/images/default-property.jpg',
  bedrooms: listing.BedroomsTotal || listing.Bedrooms || 0,
  bathrooms: listing.BathroomsTotal || listing.Bathrooms || 0,
  sqft: listing.LivingArea || listing.SquareFeet || 0,
  location: listing.City || listing.PostalCode || 'Minnesota',
}));






  } catch (error) {
    console.error('Spark API fetch failed:', error);
    return [];
  }
}
