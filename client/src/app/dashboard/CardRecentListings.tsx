import React from 'react'
import { useGetDashbaordMetricsQuery } from '@/state/api';

const CardRecentListings = () => {

    const { data: dashboardMetrics, isLoading } = useGetDashbaordMetricsQuery();
    
    return (
        <div className='row-span-12 col-span-2 md:row-span-6 md:col-span-8 xl:row-span-6 xl:col-span-5 p-8 rounded-xl bg-white  '>
            {isLoading ? (
                <div className='m-5'>Loading...</div>
            ) : (
                <>
                    <h3 className='text-2xl font-semibold'>Recent Listings</h3>
                    <h4 className='text-gray-500 mb-4'>Latest items posted for sale</h4>

                    <div className='overflow-auto h-full'>
                        {dashboardMetrics?.recentListings.map((listing) => (
                            <div key={listing.listing_id} className='py-4 flex items-start gap-8'>
                                <div className='h-32 w-48 min-h-32 min-w-24 rounded-xl bg-gray-300'></div>
                                <div className='w-full pr-4'>
                                    <div className='mb-4'>
                                        <h5 className='text-lg font-semibold'>{listing.title}</h5>
                                        <h6 className='text-lg text-blue-500 font-semibold'>${listing.price}</h6>
                                    </div>
                                    <p className='mb-4 px-3 py-1 bg-blue-100 text-xs text-blue-500 w-max rounded-lg'>{listing.category_name}</p>
                                    <p className='mb-4 text-gray-500'>{listing.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default CardRecentListings