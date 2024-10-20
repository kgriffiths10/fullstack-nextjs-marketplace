"use client"

import React from 'react'
import CardRecentListings from './CardRecentListings';
import CardStatActiveListing from './CardStatActiveListing';
import CardStatListingViews from './CardStatListingViews';
import CardStatSavedListings from './CardStatSavedListings';
import CardStatSoldListingsAmount from './CardStatSoldListingsAmount';

const Dashboard = () => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-8 xl:grid-cols-8 xl:overflow-auto gap-8 custom-grid-rows'>
      <CardStatActiveListing />
      <CardStatListingViews />
      <CardStatSavedListings />
      <CardStatSoldListingsAmount />
      
      <CardRecentListings />
      <div className='row-span-8 md:row-span-3 md:col-span-3 xl:row-span-3 xl:col-span-3 p-4 rounded-xl bg-gray-500'>Trending Categories</div>
      <div className='row-span-8 md:row-span-3 md:col-span-3 xl:row-span-3 xl:col-span-3 p-4 rounded-xl bg-gray-500'>Extra Card Space</div>
    </div>
  )
}

export default Dashboard;