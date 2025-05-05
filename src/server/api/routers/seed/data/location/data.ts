import { LocationType, Prisma } from "@/generated/prisma";

export const TEST_LOCATIONS: Omit<
  Prisma.LocationCreateInput,
  "createdBy" | "updatedBy"
>[] = [
  {
    name: "San Francisco",
    city: "San Francisco",
    country: "United States",
    latitude: 37.774929,
    longitude: -122.419416,
    addressLine1: "1 Market St",
    stateProvince: "CA",
    postalCode: "94105",
    type: LocationType.OFFICE,
  },
];
