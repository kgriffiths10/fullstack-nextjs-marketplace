import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { List } from "postcss/lib/list";



export interface ActiveListingsCount {
    count: number;
}

export interface ListingViewsCount {
    _sum: {
        listing_views: number;
    }
}

export interface SavedListingsCount {
    count: number;
}

export interface SoldListingsAmount {
    _sum: {
        price: number;
    }
}

export interface RecentListings {
    listing_id: string;
    title: string;
    price: number;
    description: string;
    created_at: string;
    category_name: string;
    image_paths: string;
}

export interface PopularCategories {
    category_name: string;
    count: number;
}

export interface DashboardMetrics {
    activeListingsCount: number; // only need to store a single numeric value
    listingViewsCount: ListingViewsCount; // stores an object with a single property
    savedListingsCount: number;
    soldListingsAmount: SoldListingsAmount;
    recentListings: RecentListings[]; // stores an array of objects
    popularCategories: PopularCategories[];
}

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    reducerPath: "api",
    tagTypes: ["DashboardMetrics"],
    endpoints: (build) => ({
        getDashbaordMetrics: build.query<DashboardMetrics, void>({
            query: () => "/dashboard",
            providesTags: ["DashboardMetrics"],
        }),
    }),
});

export const { useGetDashbaordMetricsQuery, } = api;

/* Learning Notes

    -   The primary purpose of api.ts is to define how to fetch data from your backend.
    -   The createApi function from @reduxjs/toolkit/query is used to create an API slice that can be used with Redux Toolkit.
    -   The baseQuery option is used to define the base URL for the API requests.

    -   Type Safety: By defining interfaces for the expected data structures (like DashboardMetrics, ActiveListingsCount, etc.), you're 
        providing TypeScript with the necessary information to enforce type safety throughout your application. 
        This helps prevent runtime errors due to incorrect data shapes.

    -   You define interfaces like DashboardMetrics, ActiveListingsCount, etc., to describe the shape of the data you expect from your API.

*/