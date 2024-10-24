import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Simulating a logged-in user by hardcoding the user ID
const userId = "88fd2562-e45e-4a02-a50f-66cf9b5b1651";

export const getListings = async (req: Request, res: Response): Promise<void> => {
    try {
        const search = req.query.search?.toString();

        const marketplaceListingsRaw = await prisma.listings.findMany({
            where: {
                title: {
                    contains: search
                }
            },
            include: {
                category: {  // Include the category relation to get category_name
                    select: {
                        category_name: true,
                    }
                },
                user: {  // Include the user relation to get user_name
                    select: {
                        first_name: true,  
                        last_name: true,
                    }
                }
            }
        });

        const marketplaceListings = marketplaceListingsRaw.map(listing => ({
            listing_id: listing.listing_id,
            title: listing.title,
            price: listing.price,
            description: listing.description,
            created_at: listing.created_at.toLocaleDateString(),
            category_name: listing.category?.category_name, // Get the category name
            seller_name: `${listing.user?.first_name} ${listing.user?.last_name}`,  // Combine first_name and last_name
            image_paths: listing.image_paths as string[],
            location: listing.location,
            status: listing.status
        }));

        

        const userListingsRaw = await prisma.listings.findMany({
            where: {
                user_id: userId,
                title: {
                    contains: search
                }
            },
            include: {
                category: {  // Include the category relation to get category_name
                    select: {
                        category_name: true,
                    }
                },
            }
        });

        const userListings = userListingsRaw.map(listing => ({

            listing_id: listing.listing_id,
            title: listing.title,
            price: listing.price,
            description: listing.description,
            created_at: listing.created_at.toLocaleDateString(),
            category_name: listing.category?.category_name, // Get the category name
            image_paths: listing.image_paths as string[],
            location: listing.location,
            status: listing.status
        }));

        const categoryNames = await prisma.categories.findMany({
            select: {
                category_id: true,
                category_name: true
            }
        });

        res.json({
            marketplaceListings, 
            userListings,
            categoryNames});

    } catch (error) {
        res.status(500).json({ message: 'Error retrieving listings' });
    }
};

export const createListing = async (req: Request, res: Response): Promise<void> => {

    try {
        const { title, description, price, category_id, condition, location } = req.body;
        const listing = await prisma.listings.create({
            data: {
                title,
                description,
                price,
                condition,
                location,
                category_id,
                user_id: userId,
                status: 'active', 
                is_trade: false, 
                image_paths: [], 
                listing_views: 0 
            }
        });
        res.status(201).json(listing);

    } catch (error) {
        res.status(500).json({ message: 'Error creating listing' });
    }
}