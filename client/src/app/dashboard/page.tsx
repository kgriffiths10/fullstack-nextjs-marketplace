"use client"

import React from 'react'
import CardRecentListings from './CardRecentListings';
import CardStatActiveListing from './CardStatActiveListing';
import CardStatListingViews from './CardStatListingViews';
import CardStatSavedListings from './CardStatSavedListings';
import CardStatSoldListingsAmount from './CardStatSoldListingsAmount';
import CardTrendingCategories from './CardTrendingCategories';

const Dashboard = () => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-8 xl:grid-cols-8 xl:overflow-hidden gap-8 custom-grid-rows'>
      <CardStatActiveListing />
      <CardStatListingViews />
      <CardStatSavedListings />
      <CardStatSoldListingsAmount />
      
      <CardRecentListings />
      <CardTrendingCategories />
      <CardTrendingCategories />

    </div>
  )
}

export default Dashboard;