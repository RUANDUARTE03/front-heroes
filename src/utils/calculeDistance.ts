/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */

export type LocationProps = {
  id: string
  lat: number;
  lng: number;
}

const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const radius = 6371; // raio médio da Terra em km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = radius * c;
  return distance;
};

const toRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

const findNearestLocation = (locations: LocationProps[], targetLat: number, targetLng: number) => {
  let minDistance = Infinity;
  let nearestLocation: LocationProps | null = null;

  for (let i = 0; i < locations.length; i++) {
    const { lat, lng } = locations[i];
    const distance = calculateDistance(targetLat, targetLng, lat, lng);
    if (distance < minDistance) {
      minDistance = distance;
      nearestLocation = locations[i];
    }
  }

  return nearestLocation;
};

export { findNearestLocation };
