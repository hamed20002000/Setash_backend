import { Injectable } from '@nestjs/common';


@Injectable()
export class PlacesService {
  /**
   * Filters locations that are within the specified radius from any given location in the array.
   * Uses the Haversine formula to calculate distance.
   */
  getLocationsWithinRadius({ locations, radius }: { locations: {id:number, latitude: number, longitude: number }[], radius: number }) {
    if (!locations.length) return [];

    return locations.filter((loc1) =>
      locations.some((loc2) => {
        if (loc1 === loc2) return false; // Skip the same location
        const distance = this.haversineDistance(loc1, loc2);
        return distance <= radius;
      })
    );
  }

  /**
   * Calculates the Haversine distance between two latitude/longitude points in kilometers.
   */
  private haversineDistance(loc1: { latitude: number, longitude: number }, loc2: { latitude: number, longitude: number }): number {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371; // Earth's radius in km
    const dLat = toRad(loc2.latitude - loc1.latitude);
    const dLon = toRad(loc2.longitude - loc1.longitude);
    const lat1 = toRad(loc1.latitude);
    const lat2 = toRad(loc2.latitude);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}
