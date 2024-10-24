"use client";

import { useCreateListingMutation, useGetListingsQuery } from '@/state/api';
import React, { useState } from 'react';
import Header from '@/app/(components)/Header';
import { DataGrid, GridColDef, GridColumnVisibilityModel } from '@mui/x-data-grid';
import { Pencil, PlusIcon } from 'lucide-react';
import { IconButton } from '@mui/material';
import CreateListingModal from './CreateListingModal';

type ListingFormData = {
    title: string;
    description: string;
    price: number;
    category_id: string;
    location: string;
    image_paths: string[],
    condition: string;
}

const columns: GridColDef[] = [
    
    { field: "listing_id", headerName: "ID", width: 100 }, 
    { field: "title", headerName: "Title", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "price", headerName: "Price", width: 150, valueGetter: (value, row) => `$${row.price}` },    
    { field: "created_at", headerName: "Created At", width: 150 },
    { field: "category_name", headerName: "Category", width: 150 },
    { field: "location", headerName: "Location", width: 150 },
    { field: "status", headerName: "Status", width: 150, },
    {
        field: "actions",  // New column for actions
        headerName: "Actions",
        width: 100,
        renderCell: (params) => (
            <IconButton onClick={() => handleEdit(params.row.listing_id)}>
                <Pencil className='text-blue-300' />  {/* Lucide Edit icon */}
            </IconButton>
        ),
        sortable: false,
        filterable: false,
    }
]

const handleEdit = (listingId: string) => {
    console.log(`Edit listing with ID: ${listingId}`);
    // use next/router to navigate to an edit page
    // router.push(`/edit-listing/${listingId}`);
}

const Listings = () => {
    const { data: listings, isError, isLoading } = useGetListingsQuery();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [createListing] = useCreateListingMutation();

    const handleCreateListing = async (listingData: ListingFormData) => {
        await createListing(listingData);
    }


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !listings) {
        return (
            <div className='text-center text-red-500 py-4'>
                Error fetching your listings
            </div>
        );
    }

    const columnVisibilityModel: GridColumnVisibilityModel = {
        listing_id: false,  // Hide the listing_id column
    };

    return (
        <div className='flex flex-col'>
            {/* HEADER BAR */}
            <div className="flex justify-between items-center mb-6">
                <Header name="My Listings" />
                <button
                    className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 py-2 px-4 rounded-full"
                    onClick={() => setIsModalOpen(true)}
                >
                    <PlusIcon className="w-5 h-5 mr-2 !text-gray-200" /> Add Listing
                </button>
            </div>

            {/* DATA GRID */}
            <DataGrid
                rows={listings.userListings}
                columns={columns}
                getRowId={(row) => row.listing_id}
                columnVisibilityModel={columnVisibilityModel}
                className=' bg-white'
                
            />

            {/* MODAL */}
            <CreateListingModal isOpen={isModalOpen} onClose={()=> setIsModalOpen(false)} onCreate={handleCreateListing}/>
        </div>
    );
};

export default Listings;