import React from 'react'
import { useGetDashbaordMetricsQuery } from '@/state/api';

const CardStatSoldListingsAmount = () => {
    const { data: dashboardMetrics, isLoading } = useGetDashbaordMetricsQuery();

    return (
        <div className='row-span-6 md:row-span-1 md:col-span-2 xl:row-span-2 xl:col-span-2 p-8 rounded-xl bg-white'>
            {isLoading ? (
                <div className='m-5'>Loading...</div>
            ) : (
                <>
                    <h3 className='text-2xl font-semibold'>Saved Listings</h3>
                    <h4 className='text-gray-500 mb-4'>Total currently saved lisitngs</h4>
                    <h5 className='text-5xl font-semibold text-blue-500'>${dashboardMetrics?.soldListingsAmount?._sum.price}</h5>
                </>
            )}
        </div>
    )
}

export default CardStatSoldListingsAmount