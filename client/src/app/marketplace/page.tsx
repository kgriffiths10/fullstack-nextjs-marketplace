"use client";

import { useGetListingsQuery } from '@/state/api';
import React, { useState } from 'react';
import Header from '../(components)/Header';
import { Search } from 'lucide-react';


const Marketplace = () => {

    const [searchTerm, setSearchTerm] = useState('');

    const { data: listings, isError, isLoading } = useGetListingsQuery(searchTerm);

    if (isLoading) {
        return <div className='py-4'>Loading...</div>;
    }

    if (isError || !listings) {
        return (
            <div className='text-center text-red-500 py-4'>
                Error fetching marketplace listings
            </div>
        );
    }

    return (
        <div className="mx-auto pb-5 w-full">
            {/* HEADER BAR */}
            <div className="flex justify-between items-center mb-6">
                <Header name="Marketplace" />
                
            </div>

            {/* SEARCH BAR */}
            <div className="mb-4">
                <div className="flex items-center rounded-full bg-white">
                    <Search className="w-5 h-5 text-gray-500 m-2 " />
                    <input
                        className= "py-2 px-4 rounded-full w-full"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* LISTINGS */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 justify-between'> 
                {isLoading ? (<div>Loading...</div>) : (
                    listings.marketplaceListings.map((listing) => (
                        <div className='bg-white rounded-2xl p-4' key={listing.listing_id}>
                            {listing.image_paths && listing.image_paths.length > 0 ? (
                                <img 
                                    src={listing.image_paths[0]} // Use the first image in the array
                                    alt={listing.title} 
                                    className='w-full h-48 object-cover rounded-lg' 
                                />
                            ) : (
                                <div className='mb-4 w-full h-48 bg-gray-300 rounded-lg flex items-center justify-center'>
                                    <span className='text-gray-500'>No Image Available</span>
                                </div>
                            )}
                            <div className='flex justify-between mb-2'>
                                <div className='mr-1 font-semibold text-lg'>{listing.title}</div>
                                <div className='font-semibold text-lg'>${listing.price}</div>
                            </div>
                            <div className='mb-4 px-3 py-1 bg-blue-100 text-xs text-blue-500 w-max rounded-lg'>{listing.category_name}</div>
                            <div className='mb-2'>{listing.description}</div>
                            <div className='text-gray-500'>{listing.location}</div>
                        </div>
                    ))
                )}
            </div>


        </div>
    );
};

export default Marketplace